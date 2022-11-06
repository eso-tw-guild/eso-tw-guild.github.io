import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Fab from '@mui/material/Fab';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import AddIcon from '@mui/icons-material/Add';
import { Link } from 'react-router-dom';

function createData(team_name, team_lead, team_time) {
  return { team_name, team_lead, team_time };
}

const rows = [
  createData('VDSR', '罐頭 (blackcanlin)', '2022-12-01 22:00:00 GMT+8'),
  createData('VSS 衝衝團', '罐頭 (blackcanlin)', '2022-12-02 22:00:00 GMT+8'),
  createData('去死去死團', '罐頭 (blackcanlin)', '2022-12-03 22:00:00 GMT+8'),
];

const GroupView = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            團隊招募
          </Typography>
          <Link to={'/main'}>
            <Button>回首頁</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent={'center'} marginTop={5}>
        <Grid item container direction="column" xs={11}>
          <Grid item container>
              <h2>您的團隊：</h2>
          </Grid>
          <Grid item container>
            <TableContainer component={Paper} elevation={3}>
              <Table stickyHeader aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>團隊名稱</TableCell>
                    <TableCell>隊長</TableCell>
                    <TableCell align='right'>出團時間</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {rows.map((row) => (
                    <TableRow
                      key={row.team_name}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        {row.team_name}
                      </TableCell>
                      <TableCell>{row.team_lead}</TableCell>
                      <TableCell align="right">{row.team_time}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      <Link to={'/create-group'}>
        <Fab color="primary" aria-label="add" sx={{ position: 'absolute', bottom: 20, right: 20 }}>
          <AddIcon />
        </Fab>
      </Link>
      
    </div>
  );
};

export default GroupView