import { Grid, Typography } from '@mui/material';
import { formatNumber } from '../utilities/singleton';

export default function TokenReleased(props: { locked: number | string; transferable: number | string }) {
  const { locked, transferable } = props;
  return (
    <Grid container spacing={6}>
      <Grid item sm={4}>
        <Typography sx={{ color: '#110C12', fontSize: "0.875rem" }}>
          Locked
        </Typography>
        <Typography variant="h3" sx={{ color: '#110C12', fontSize: "1.5rem", fontWeight: "bold" }}>
          {formatNumber(locked)} DKT
        </Typography>
      </Grid>
      <Grid item sm={4}>
        <Typography sx={{ color: '#110C12', fontSize: "0.875rem" }}>
          Transferable
        </Typography>
        <Typography variant="h3" sx={{ color: '#110C12', fontSize: "1.5rem", fontWeight: "bold" }}>
          {formatNumber(transferable)} DKT
        </Typography>
      </Grid>
      <Grid item sm={4}>
        <Typography sx={{ color: '#110C12', fontSize: "0.875rem" }}>
          Maximum
        </Typography>
        <Typography variant="h3" sx={{ color: '#110C12', fontSize: "1.5rem", fontWeight: "bold" }}>
          10,000,000 DKT
        </Typography>
      </Grid>
    </Grid>
  );
}
