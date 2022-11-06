import * as React from 'react';
import dayjs from 'dayjs';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Autocomplete from '@mui/material/Autocomplete';
import Chip from '@mui/material/Chip';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';

const CreateGroupView = () => {
  const [member_value, setMemberValue] = React.useState();

  const [value, setValue] = React.useState(dayjs('2014-08-18T21:11:54'));

  const handleChange = (newValue) => {
    setValue(newValue);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            創立團隊
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
                id="team-name-textfield"
                label="團隊名稱"
                placeholder='VCR+3, 大地根三合一, 戰場團, ...'
              />
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="出團時間"
                  value={value}
                  onChange={handleChange}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item container>
              <Autocomplete
                multiple
                id="members-select"
                value={member_value}
                onChange={(event, newValue) => {
                  setMemberValue([
                    ...newValue,
                  ]);
                }}
                options={guild_members}
                getOptionLabel={(option) => option.nickname + ' (' + option.psn_id + ') ' + option.roles}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option.nickname + ' (' + option.psn_id + ')'}
                      {...getTagProps({ index })}
                    />
                  ))
                }
                style={{ width: 500 }}
                renderInput={(params) => (
                  <TextField {...params} label="出團成員" placeholder="新增成員..." />
                )}
              />
            </Grid>
            <Grid item container justifyContent={'right'} columnSpacing={1}>
              <Grid item>
                <Link to={'/group'}>
                  <Button variant="outlined">取消</Button>
                </Link>
              </Grid>
              <Grid item>
                <Button variant="contained">創立團隊</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default CreateGroupView

const guild_members = [
  {
    nickname: '罐頭',
    psn_id: 'blackcanlin',
    roles: 'T/H/D/PVP'
  },
  {
    nickname: '小豪',
    psn_id: 'hao123',
    roles: 'T/H'
  },
  {
    nickname: '罐頭3',
    psn_id: 'blackcanlin33',
    roles: 'D/PVP'
  },
  {
    nickname: '罐頭4',
    psn_id: 'blackcanlin4',
    roles: 'T/H/D/PVP'
  },
  {
    nickname: '罐頭5',
    psn_id: 'blackcanlin5',
    roles: 'T/H/D/PVP'
  },
];