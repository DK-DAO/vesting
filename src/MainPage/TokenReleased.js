import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import { formatNumber } from '../utilities/singleton';

export default function TokenReleased(props) {
  const { locked, transferable } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={4}>
        <Typography variant="h3" align="center" sx={{ color: 'red' }}>
          {formatNumber(locked)} DKT
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h3" align="center" sx={{ color: 'green' }}>
          {formatNumber(transferable)} DKT
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h3" align="center" sx={{ color: 'blue' }}>
          10,000,000 DKT
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4" align="center" sx={{ color: 'red' }}>
          Locked
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4" align="center" sx={{ color: 'green' }}>
          Transferable
        </Typography>
      </Grid>
      <Grid item xs={4}>
        <Typography variant="h4" align="center" sx={{ color: 'blue' }}>
          Maximum
        </Typography>
      </Grid>
    </Grid>
  );
}
