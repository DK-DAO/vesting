import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, Paper, TableRow, createTheme, ThemeProvider , Box} from '@mui/material';
import jsonData from '../json/vesting-creator.json';
import BigNumber from 'bignumber.js';
import { Link } from '@mui/material';
import { formatNumber } from '../utilities/singleton';
import Lora from '../fonts/Lora-Regular.ttf';
const theme = createTheme({
  typography: {
    fontFamily: 'Lora',
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: `
        @font-face {
          font-family: 'Lora';
          font-style: normal;
          font-display: swap;
          font-weight: 400;
          src: local('Lora'), local('Lora-Regular'), url(${Lora}) format('woff2');
          unicodeRange: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2191, U+2193, U+2212, U+2215, U+FEFF;
        }
      `,
    },
  },
});

const rows = jsonData.map((e) => ({ ...e, amount: formatNumber(new BigNumber(e.amount)).toString() }));

export default function TableVesting() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontWeight: 'bold', color: "#5D3802", }}>
            <ThemeProvider theme={theme}>
              <Box sx={{fontFamily: 'Lora'}}>Vesting Contract</Box>
            </ThemeProvider>
            </TableCell>
            <TableCell sx={{ fontWeight: 'bold', color: "#5D3802" }}>
            <ThemeProvider theme={theme}>
              <Box sx={{fontFamily: 'Lora'}}>Owner</Box>
            </ThemeProvider>
            </TableCell>
            <TableCell align="right" sx={{ fontWeight: 'bold', color: "#5D3802" }}>
            <ThemeProvider theme={theme}>
              <Box sx={{fontFamily: 'Lora'}}>Total Vesting</Box>
            </ThemeProvider>
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
              <TableCell align="right" sx={{ fontFamily: 'monospace', fontWeight:"600" }}>
                {row.amount} DKT
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
