import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

const MyProfileView = () => {
  return (
    <Grid container justifyContent={'center'} marginTop={5}>
      <Paper 
        elevation={3} 
        component={Grid} 
        item container
        justifyContent={'center'}
        xs={10} sm={8} md={6}
      >
        <Grid 
          item container
          direction="column"
          spacing={2}
          xs={11}
          marginBottom={2}
        >
          <Grid item>
            <h2>個人資訊</h2>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              required
              id="psn-id-textfield"
              label="PSN ID"
              defaultValue="blackcanlin"
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              required
              id="nickname-textfield"
              label="暱稱"
              defaultValue="罐頭"
            />
          </Grid>
          <Grid item container justifyContent={'right'}>
            <Button variant="contained" >更新個人資訊</Button>
          </Grid>
        </Grid>
      </Paper>
    </Grid>
  );
};

export default MyProfileView