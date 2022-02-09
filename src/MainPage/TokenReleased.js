import * as React from 'react';
import { Grid, Typography } from '@mui/material';
import { formatNumber } from '../utilities/singleton';

export default function TokenReleased(props) {
  const { locked, transferable } = props;
  return (
    <Grid container spacing={6}>
      <Grid item>
        <Typography sx={{ color: '#110C12', fontSize: "0.875rem" }}>
          Maximum
        </Typography>
        <Typography sx={{ color: '#110C12', fontSize: "1.5rem", fontWeight: "bold" }}>
          10,000,000 DKT
        </Typography>
      </Grid>
      <Grid item>
        <Typography sx={{ color: '#110C12', fontSize: "0.875rem" }}>
          Locked
        </Typography>
        <Typography sx={{ color: '#110C12', fontSize: "1.5rem", fontWeight: "bold" }}>
          {formatNumber(locked)} DKT
        </Typography>
      </Grid>
      <Grid item>
        <Typography sx={{ color: '#110C12', fontSize: "0.875rem" }}>
          Transferable
        </Typography>
        <Typography sx={{ color: '#110C12', fontSize: "1.5rem", fontWeight: "bold" }}>
          {formatNumber(transferable)} DKT
        </Typography>
      </Grid>
    </Grid>
  );
}
