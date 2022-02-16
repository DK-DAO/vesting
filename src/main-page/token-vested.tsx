import { Grid, Typography, Button } from '@mui/material';
import { formatNumber } from '../utilities/singleton';

export default function TokenVested(props: { remain: number; available: number; withdrew: number; total: number }) {
  const { remain, available, withdrew, total } = props;
  return (
      <Grid container spacing={2} 
        mt="1rem" 
        mb="1.5rem"
        mx="0"
        p="1rem"
        pt="0"
        width="100%"
        sx={{boxSizing: "border-box", backgroundColor: "#D0BC9C50", border: "2px solid #94763B"}}
      >
      <Grid item sm={10}>
        <Grid container>
        <Grid item sm={3}>
          <Typography variant="h5" sx={{ color: '#110C12', fontSize: "0.875rem" }}>
            Remaining
          </Typography>
          <Typography variant="h4" sx={{ color: '#110C12', fontSize: "1.5rem", fontWeight: "bold" }}>
            {formatNumber(remain)} DKT
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography variant="h5" sx={{ color: '#110C12', fontSize: "0.875rem" }}>
            Available To Withdraw
          </Typography>
          <Typography variant="h4" sx={{ color: '#110C12', fontSize: "1.5rem", fontWeight: "bold" }}>
            {formatNumber(available)} DKT
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography variant="h5" sx={{ color: '#110C12', fontSize: "0.875rem" }}>
            Withdrew
          </Typography>
          <Typography variant="h4" sx={{ color: '#110C12', fontSize: "1.5rem", fontWeight: "bold" }}>
            {formatNumber(withdrew)} DKT
          </Typography>
        </Grid>
        <Grid item sm={3}>
          <Typography variant="h5" sx={{ color: '#110C12', fontSize: "0.875rem" }}>
            Total
          </Typography>
          <Typography variant="h4" sx={{ color: '#110C12', fontSize: "1.5rem", fontWeight: "bold" }}>
            {formatNumber(total)} DKT
          </Typography>
        </Grid>
        </Grid>
      </Grid>
      <Grid item sm={2}>
        <Button
          variant="contained"
          fullWidth={true}
          color={"success"}
        >
          Withdraw
        </Button>
      </Grid>
    </Grid>
  );
}
