import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow } from '@mui/material';
import jsonData from '../json/vesting-creator.json';
import BigNumber from 'bignumber.js';
import { Link } from '@mui/material';
import { formatNumber } from '../utilities/singleton';

const rows = jsonData.map((e) => ({ ...e, amount: formatNumber(new BigNumber(e.amount)).toString() }));

export default function TableVesting() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold' }}>Vesting Contract</TableCell>
            <TableCell sx={{ fontWeight: 'bold' }}>Owner</TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold' }}>
              Total Vesting
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.contract} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace' }}>
                <Link href={`https://bscscan.com/address/${row.contract}`} target="_blank">
                  {row.contract}
                </Link>
              </TableCell>
              <TableCell component="th" scope="row" sx={{ fontFamily: 'monospace' }}>
                <Link href={`https://bscscan.com/address/${row.beneficiary}`} target="_blank">
                  {row.beneficiary}
                </Link>
              </TableCell>
              <TableCell align="right" sx={{ fontFamily: 'monospace' }}>
                {row.amount} DKT
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
