import React, { useState, useEffect } from 'react';
import dayjs from 'dayjs';
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
import Link from "@material-ui/core/Link";
import { Link as RouteLink } from 'react-router-dom';
import { fetchGet } from '../component/Fetch';
import { ApiBaseURL } from '../component/Conf';

const GroupView = () => {
  const [groups, setGroups] = useState([]);

  useEffect(() => {
    fetchGet(ApiBaseURL + '/groups')
      .then(
        res => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        }
      )
      .then(d => {
        setGroups(d.data.groups);
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            團隊招募
          </Typography>
          <Link component={RouteLink} to={'/main'}>
            <Button>回首頁</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent={'center'} marginTop={5}>
        <Grid item container direction="column" xs={11}>
          <Grid item container>
              <h2>團隊列表：</h2>
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
                  {groups.map((row) => (
                    <TableRow
                      key={row.gid}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">
                        <Link component={RouteLink} color="primary" to={'/check-group/' + row.gid}>
                          {row.name}
                        </Link>
                      </TableCell>
                      <TableCell>{row.leader_name + ' (' + row.leader_psn_id + ')'}</TableCell>
                      <TableCell align="right">{dayjs(row.start_time).format('YYYY-MM-DD HH:mm:ss UTCZ')}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Grid>
        </Grid>
      </Grid>
      <Link component={RouteLink} to={'/create-group'}>
        <Fab color="secondary" aria-label="add" sx={{ position: 'absolute', bottom: 20, right: 20 }}>
          <AddIcon />
        </Fab>
      </Link>
      
    </div>
  );
};

export default GroupView