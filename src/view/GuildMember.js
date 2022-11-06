import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
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
import { Link } from 'react-router-dom';

function createData(psn_id, nickname, role) {
  return { psn_id, nickname, role };
}

const rows = [
  createData('blackcanlin', '罐頭', 'T/H/D/PvP'),
  createData('s9512525', '坦哥', 'T/H/D/PvP'),
  createData('soma123', 'soma', 'D'),
];

const GuildMemberView = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            公會成員
          </Typography>
          <Link to={'/main'}>
            <Button>回首頁</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent={'center'} marginTop={5}>
        <Grid item container xs={11}>
          <TableContainer component={Paper} elevation={3}>
            <Table stickyHeader aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>PSN ID</TableCell>
                  <TableCell>暱稱</TableCell>
                  <TableCell align='right'>擁有角色</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.psn_id}
                    </TableCell>
                    <TableCell>{row.nickname}</TableCell>
                    <TableCell align="right">{row.role}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
    </div>
  );
};

export default GuildMemberView