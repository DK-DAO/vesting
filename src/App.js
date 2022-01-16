import React from 'react';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import {
  Container,
  Grid,
  /* MenuItem,
  Button,
  Select,
  Typography,
  TextField,
  Card,
  CardContent,
  CardActions,*/
  Button,
  Link,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  Paper,
  TableRow,
  CircularProgress,
} from '@mui/material';
import { BigNumber, ethers } from 'ethers';
import abiErc20 from './abi/ERC20.json';
import abiVestingContract from './abi/VestingContract.json';
import { walletConnector } from './WalletConnect/WalletConnect';
import TableVesting from './MainPage/TableMain';
import TokenReleased from './MainPage/TokenReleased';
import { formatNumber, getProvider } from './utilities/singleton';
import vestingData from './json/vesting-creator.json';
import TokenVested from './MainPage/TokenVested';

const oneUint = '1000000000000000000';
const oneDay = 86400;
const oneMonth = 30 * oneDay;
const RELEASE_MONTHLY = 1;

function createRecord(label, value) {
  return { label, value };
}

export class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      connected: false,
      account: '',
      contract: '',
      consumedBlocks: 0,
      releaseType: 0,
      remain: 0,
      startVesting: 0,
      totalBlocks: 0,
      unlockAmountPerBlock: ethers.BigNumber.from(0),
      vestingContract: null,
      token: new ethers.Contract('0x7Ceb519718A80Dd78a8545AD8e7f401dE4f2faA7', abiErc20, getProvider()),
      locked: 0,
      transferable: 0,
      loading: true,
    };
  }

  componentDidMount() {
    const { token } = this.state;

    token.balanceOf('0x0f119c28d2d13800A58BD6112454aB190d740193').then((v) => {
      token.balanceOf('0x365c3F921b2915a480308D0b1C04aEF7B99c2876').then((s) => {
        const locked = s.add(v).div(oneUint);
        this.setState({
          locked: locked.toNumber(),
          transferable: BigNumber.from(10000000).sub(locked).toNumber(),
        });
      });
    });

    // Subscribe to connection events
    walletConnector.on('connect', (error, payload) => {
      if (error) {
        throw error;
      }

      // Get provided accounts and chainId
      const { accounts } = payload.params[0];
      this.firstLoadOfData(accounts[0]);
      this.setState({
        connected: true,
        account: accounts[0],
      });
    });

    // Subscribe to disconnect events
    walletConnector.on('disconnect', (error, payload) => {
      if (error) {
        throw error;
      }

      this.setState({
        connected: false,
        account: '',
      });
    });

    if (walletConnector.connected) {
      this.firstLoadOfData(walletConnector.accounts[0]);
    }

    this.setState({
      connected: walletConnector.connected,
      account: walletConnector.connected ? walletConnector.accounts[0] : null,
    });
  }

  firstLoadOfData(account) {
    const [vestingRecord] = vestingData.filter((e) => e.beneficiary === account);
    if (typeof vestingRecord !== 'undefined') {
      const vestingContract = new ethers.Contract(vestingRecord.contract, abiVestingContract, getProvider());
      this.setState({ contract: vestingRecord.contract });
      vestingContract.getVestingSchedule().then((v) => {
        this.setState({
          vestingContract,
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

  textReceiverHandler(event) {
    this.setState({
      receiver: event.target.value,
    });
  }

  buttonConnectHandler() {
    // Check if connection is already established
    if (!walletConnector.connected) {
      // create new session
      walletConnector.createSession({ chainId: 56 });
    } else {
      this.setState({ availableBlocks: 0 });
      walletConnector.killSession();
    }
  }

  buttonWithdrawMyToken(event) {
    const { vestingContract } = this.state;
    const result = vestingContract.interface.encodeFunctionData('withdraw', []);
    this.sendTx(result);
  }

  sendTx(data) {
    walletConnector
      .sendTransaction({
        from: this.state.account,
        to: this.state.vestingContract.address,
        value: 0,
        data,
      })
      .then((result) => {
        // Returns transaction id (hash)
        console.log(result);
      })
      .catch((error) => {
        // Error returned when rejected
        console.error(error);
      });
  }

  render() {
    const currentTime = Math.floor(Date.now() / 1000);

    const {
      connected,
      account,
      contract,
      consumedBlocks,
      releaseType,
      remain,
      startVesting,
      unlockAmountPerBlock,
      locked,
      transferable,
      totalBlocks,
      loading,
    } = this.state;
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
      createRecord('Connect status', connected ? 'connected' : 'disconnected'),
      createRecord('Connected account', account),
      createRecord('Managing vesting contract', contract),
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
      <Container>
        {connected ? (
          <TokenVested withdrew={withdrewToken} available={availableToken} remain={remain} total={totalToken} />
        ) : (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TokenReleased locked={locked} transferable={transferable} />
            </Grid>
          </Grid>
        )}
        <Grid container spacing={2} padding={5}>
          <Grid item xs={3}></Grid>
          <Grid item xs={3}>
            <Button
              variant="contained"
              fullWidth={true}
              onClick={this.buttonConnectHandler.bind(this)}
              color={connected ? 'error' : 'success'}
            >
              {connected ? 'Disconnect' : 'Connect'}
            </Button>
          </Grid>
          <Grid item xs={3}>
            <Button
              disabled={availableToken <= 0}
              variant="contained"
              fullWidth={true}
              onClick={this.buttonWithdrawMyToken.bind(this)}
              color={'primary'}
            >
              Withdraw my Token
            </Button>
          </Grid>
          <Grid item xs={3}></Grid>
        </Grid>
        {connected ? (
          <TableContainer component={Paper}>
            {loading ? (
              <Grid container spacing={2} justifyItems="center" alignItems="center">
                <Grid item xs="auto">
                  <CircularProgress />
                </Grid>
              </Grid>
            ) : (
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
                      <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace' }}>
                        {row.label}
                      </TableCell>
                      <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace' }}>
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
            )}
          </TableContainer>
        ) : (
          <TableVesting />
        )}
      </Container>
    );
  }
}

export default App;
