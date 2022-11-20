import React, { useState, useEffect } from 'react';
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
import { fetchGet } from '../component/Fetch';
import { Link } from 'react-router-dom';
import { ApiBaseURL } from '../component/Conf';
import { RoleChipStack } from '../component/RoleChip';
import { ScoreChip } from '../component/ScoreChip';

const GuildMemberView = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetchGet(ApiBaseURL + '/members')
      .then(
        res => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        }
      )
      .then(d => {
        d.data.members.sort((a, b) => a.score > b.score ? -1 : 0);
        setMembers(d.data.members);
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
                  <TableCell>成就積分</TableCell>
                  <TableCell align='right'>擁有角色</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {members.map((row) => (
                  <TableRow
                    key={row.nickname}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.psn_id}
                    </TableCell>
                    <TableCell>{row.nickname}</TableCell>
                    <TableCell>
                      <ScoreChip value={row.score} sieze="small" />
                    </TableCell>
                    <TableCell align="right">
                      <RoleChipStack 
                        spacing={0.5}
                        justifyContent="flex-end"
                        roles={{
                          hasTank: row.has_tank,
                          hasHealer: row.has_healer,
                          hasDD: row.has_dd,
                          hasPvP: row.has_pvp
                        }}
                      />
                    </TableCell>
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