/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import '@fontsource/roboto';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Link from '@mui/material/Link';
import Paper from '@mui/material/Paper';
import TableRow from '@mui/material/TableRow';
import { Container, Grid, Typography } from '@mui/material';
import { BigNumber, ethers } from 'ethers';
import TableVesting from './main-page/table-vesting';
import TokenReleased from './main-page/token-released';
import { formatNumber, getToken, getVestingContract } from './utilities/singleton';
import { WalletConnector } from './wallet-connector';
import { IWallet } from './wallet-connector/core';
import vestingData from './json/vesting-creator.json';
import './App.css';
import TokenVested from './main-page/token-vested';

const oneUint = '1000000000000000000';
const oneDay = 86400;
const oneMonth = 30 * oneDay;
const RELEASE_MONTHLY = 1;

const createRecord = (label: string, value: string) => ({ label, value });

export default class App extends React.Component {
  constructor(props: any) {
    super(props);
    this.state = {
      wallet: null,
      locked: 0,
      transferable: 0,
      address: '',
      vestingContractAddress: '',
      vestingContract: null,
      consumedBlocks: 0,
      releaseType: 0,
      remain: 0,
      startVesting: 0,
      totalBlocks: 0,
      unlockAmountPerBlock: BigNumber.from(0),
      loading: false,
    };
  }

  buttonWithdrawMyToken() {
    const { vestingContract, wallet, address, vestingContractAddress } = this.state as any;
    const result = vestingContract.interface.encodeFunctionData('withdraw', []);
    (wallet as IWallet).sendTransaction({
      from: address,
      to: vestingContractAddress,
      value: 0,
      data: result,
    });
  }

  firstLoadOfData(address: string) {
    const [vestingRecord] = vestingData.filter((e) => e.beneficiary.toLowerCase() === address.toLowerCase());
    if (typeof vestingRecord !== 'undefined') {
      const vestingContract = getVestingContract(vestingRecord.contract);
      vestingContract.getVestingSchedule().then((v) => {
        this.setState({
          vestingContract,
          vestingContractAddress: vestingRecord.contract,
          address,
          consumedBlocks: v.consumedBlocks.toNumber(),
          releaseType: v.releaseType.toNumber(),
          remain: v.remain.div(oneUint).toNumber(),
          startVesting: v.startVesting.toNumber(),
          totalBlocks: v.totalBlocks.toNumber(),
          unlockAmountPerBlock: v.unlockAmountPerBlock,
          loading: false,
        });
      });
    }
  }

  onConnect = (err: Error | null, wallet: IWallet) => {
    if (err === null) {
      this.setState({ wallet });
      wallet.getAddress().then((v) => this.firstLoadOfData(v));
    } else {
      this.setState({ wallet: null });
    }
  };

  componentDidMount() {
    const token = getToken();
    token.balanceOf('0x0f119c28d2d13800A58BD6112454aB190d740193').then((v) => {
      token.balanceOf('0x365c3F921b2915a480308D0b1C04aEF7B99c2876').then((s) => {
        const locked = s.add(v).div(oneUint);
        this.setState({
          locked: locked.toNumber(),
          transferable: BigNumber.from(10000000).sub(locked).toNumber(),
        });
      });
    });
  }

  render() {
    const currentTime = Math.floor(Date.now() / 1000);

    const {
      wallet,
      locked,
      address,
      vestingContractAddress,
      transferable,
      consumedBlocks,
      releaseType,
      remain,
      startVesting,
      unlockAmountPerBlock,
      totalBlocks,
    } = this.state as any;
    const vestedDay = Math.floor((currentTime - startVesting) / oneDay);
    const blockSize = releaseType === RELEASE_MONTHLY ? oneMonth : oneDay;
    let availableBlocks =
      currentTime > startVesting ? Math.floor((currentTime - startVesting) / blockSize) - consumedBlocks : 0;
    if (availableBlocks >= totalBlocks) {
      availableBlocks = totalBlocks;
    }
    const withdrewToken = unlockAmountPerBlock.mul(consumedBlocks).div(oneUint).toNumber();
    const availableToken = unlockAmountPerBlock.mul(availableBlocks).div(oneUint).toNumber();
    const totalToken = unlockAmountPerBlock.mul(totalBlocks).div(oneUint).toNumber();

    const displayData = [
      createRecord('Connect status', wallet !== null ? 'connected' : 'disconnected'),
      createRecord('Connected account', address),
      createRecord('Managing vesting contract', vestingContractAddress),
      createRecord('Withdrew token', `${formatNumber(withdrewToken)} DKT`),
      createRecord('Remaining token', `${formatNumber(remain)} DKT`),
      createRecord('Release type', releaseType === RELEASE_MONTHLY ? 'monthly' : 'linear'),
      createRecord('Start vesting', new Date(startVesting * 1000).toLocaleString()),
      createRecord('Vesting status', currentTime - startVesting > 0 ? 'vesting' : 'cliff'),
    ];
    if (vestedDay >= 0) {
      displayData.push(createRecord('Vested duration', `${vestedDay} day${vestedDay > 1 ? 's' : ''}`));
    } else {
      displayData.push(
        createRecord('Start vesting in', `${Math.abs(vestedDay)} day${Math.abs(vestedDay) > 1 ? 's' : ''}`),
      );
    }

    return (
      <>
        <Container>
          <WalletConnector onConnect={this.onConnect.bind(this)} />
          {wallet === null ? (
            <>
              <Grid
                container
                mt="1rem"
                mb="1.5rem"
                sx={{ padding: '1.5rem', backgroundColor: '#D0BC9C50', border: '2px solid #94763B' }}
              >
                <TokenReleased locked={locked} transferable={transferable} />
              </Grid>
              <Typography>History</Typography>
              <TableVesting />
            </>
          ) : (
            <>
              <TokenVested
                clickWithdraw={this.buttonWithdrawMyToken.bind(this)}
                withdrew={withdrewToken}
                available={availableToken}
                remain={remain}
                total={totalToken}
              />
              <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                  <TableHead>
                    <TableRow>
                      <TableCell sx={{ fontWeight: 'bold' }}>Term</TableCell>
                      <TableCell sx={{ fontWeight: 'bold' }}>Data</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {displayData.map((row) => (
                      <TableRow
                        key={row.label.replace(/\s/g, '-')}
                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                      >
                        <TableCell component="th" scope="row">
                          {row.label}
                        </TableCell>
                        <TableCell component="th" scope="row">
                          {ethers.utils.isAddress(row.value) ? (
                            <Link href={`https://bscscan.com/address/${row.value}`} target="_blank">
                              {row.value}
                            </Link>
                          ) : (
                            row.value
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </>
          )}
        </Container>
      </>
    );
  }
}
