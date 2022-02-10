import { Grid, Typography } from '@mui/material';
import { formatNumber } from '../utilities/singleton';

export default function TokenReleased(props: { locked: number | string; transferable: number | string }) {
  const { locked, transferable } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <Typography variant="h3" align="center" sx={{ color: 'red' }}>
          {formatNumber(locked)} DKT
        </Typography>
        <Typography align="center" sx={{ color: 'red' }}>
          Locked
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h3" align="center" sx={{ color: 'green' }}>
          {formatNumber(transferable)} DKT
        </Typography>
        <Typography align="center" sx={{ color: 'green' }}>
          Transferable
        </Typography>
      </Grid>
      <Grid item xs={12} md={4}>
        <Typography variant="h3" align="center" sx={{ color: 'blue' }}>
          10,000,000 DKT
        </Typography>
        <Typography align="center" sx={{ color: 'blue' }}>
          Maximum
        </Typography>
      </Grid>
    </Grid>
  );
}
