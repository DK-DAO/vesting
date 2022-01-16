import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import { formatNumber } from '../utilities/singleton';

export default function TokenVested(props) {
  const { remain, available, withdrew, total } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={3}>
        <Typography variant="h4" align="center">
          {formatNumber(remain)} DKT
        </Typography>
        <Typography variant="h5" align="center">
          Remaining
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h4" align="center" sx={{ color: 'green' }}>
          {formatNumber(available)} DKT
        </Typography>
        <Typography variant="h5" align="center" sx={{ color: 'green' }}>
          Available To Withdraw
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h4" align="center" sx={{ color: 'red' }}>
          {formatNumber(withdrew)} DKT
        </Typography>
        <Typography variant="h5" align="center" sx={{ color: 'red' }}>
          Withdrew
        </Typography>
      </Grid>
      <Grid item xs={12} md={3}>
        <Typography variant="h4" align="center">
          {formatNumber(total)} DKT
        </Typography>
        <Typography variant="h5" align="center">
          Total
        </Typography>
      </Grid>
    </Grid>
  );
}
