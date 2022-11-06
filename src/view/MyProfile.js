import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import { Link } from 'react-router-dom';

const MyProfileView = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            個人資訊
          </Typography>
          <Link to={'/main'}>
            <Button>回首頁</Button>
          </Link>
        </Toolbar>
      </AppBar>
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
            marginTop={2}
            marginBottom={2}
          >
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
            <Grid item container>
              <FormGroup>
                擁有角色：
                <FormControlLabel control={<Checkbox />} label="坦克" />
                <FormControlLabel control={<Checkbox />} label="補師" />
                <FormControlLabel control={<Checkbox />} label="輸出" />
                <FormControlLabel control={<Checkbox />} label="PvP" />
              </FormGroup>
            </Grid>
            <Grid item container justifyContent={'right'}>
              <Button variant="contained" >更新個人資訊</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default MyProfileView