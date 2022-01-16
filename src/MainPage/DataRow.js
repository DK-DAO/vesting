import { Grid } from '@mui/material';

export default function DataRow(props) {
  const { label, value } = props;
  return (
    <Grid container spacing={2}>
      <Grid item xs={4} sx={{ fontFamily: 'monospace' }}>
        {label}
      </Grid>
      <Grid item xs={8} sx={{ fontFamily: 'monospace' }}>
        {value}
      </Grid>
    </Grid>
  );
}
