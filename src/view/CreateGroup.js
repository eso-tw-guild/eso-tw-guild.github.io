import React, { useState, useEffect } from 'react';
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
import { RoleChipStack } from '../component/RoleChip';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import FlagIcon from '@mui/icons-material/Flag';
import { fetchGet, fetchPost } from '../component/Fetch';
import { ApiBaseURL, WebsiteURL } from '../component/Conf';
import { BannerSuccess, BannerError } from '../component/Banner';
import { getProfile } from '../component/Session';

const CreateGroupView = () => {
  if (!getProfile()) {
    window.location.href = WebsiteURL;
  }

  const leader = getProfile().mid;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState(dayjs().format());
  const [timeValid, setTimeValid] = useState(true);
  const [formDirty, setFormDirty] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [members, setMembers] = useState([]);
  const [chosenMembers, setChosenMembers] = useState([]);
  const [showForm, setShowForm] = useState('hidden');
  const [lockUI, setLockUI] = useState(false);

  let nameValid = name
  let formValid = timeValid && nameValid

  const resetBanner = () => {
    setShowSuccess(false);
    setShowError(false);
  }
  const showSuccessBanner = () => {
    resetBanner();
    setShowSuccess(true);
  }
  const showErrorBanner = (e) => {
    resetBanner();
    setShowError(true);
    setErrMsg(e);
  }

  const addGroup = () => {
    resetBanner();
    setLockUI(true);
    setFormDirty(false);

    const data = {
      'name': name,
      'desc': desc,
      'start_time': time,
      'members': chosenMembers.map(e => e.mid)
    }

    fetchPost(ApiBaseURL + '/groups', data)
      .then(res => {
        setLockUI(false);
        if (!res.ok) throw new Error(res.status);
        showSuccessBanner();
        return res.json()
      })
      .then(d => {
        window.location.href = WebsiteURL + '/#/group';
      })
      .catch((error) => { showErrorBanner(error); });
  }

  useEffect(() => {
    resetBanner();
    setShowForm('hidden');
    fetchGet(ApiBaseURL + '/members')
      .then(
        res => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        }
      )
      .then(d => {
        setMembers(d.data.members);
        setChosenMembers(d.data.members.filter(e => e.mid === leader));
        setShowForm('visible');
      })
      .catch(e => {
        showErrorBanner(e);
      });
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ????????????
          </Typography>
          <Link to={'/group'}>
            <Button>???????????????</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12}>
          <BannerSuccess displayed={showSuccess}>??????????????????</BannerSuccess>
          <BannerError displayed={showError}>{'????????????: ' + errMsg}</BannerError>
        </Grid>
        <Paper
          elevation={3}
          component={Grid}
          item container
          justifyContent={'center'}
          xs={10} sm={8} md={6}
          marginTop={5}
          visibility={showForm}
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
                id="team-name"
                label="????????????"
                placeholder='VCR+3, ??????????????????, ?????????, ...'
                onChange={e => {setName(e.target.value); setFormDirty(true)}}
                error={(!nameValid && formDirty)}
                helperText={(!nameValid && formDirty) ? '????????????' : ''}
                disabled={lockUI}
              />
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  label="????????????"
                  value={time}
                  onError={(value) => setTimeValid(!value)}
                  onChange={t => { setTime(t.format()); setFormDirty(true) }}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                  inputFormat="YYYY/MM/DD hh:mm A"
                  minDate={dayjs()}
                  maxDate={dayjs().add(1, 'month')}
                  disabled={lockUI}
                />
              </LocalizationProvider>
            </Grid>
            <Grid item container>
              <Autocomplete
                multiple
                disabled={lockUI}
                id="members-select"
                value={chosenMembers}
                onChange={(event, newValue) => {
                  setChosenMembers([
                    ...members.filter(e => e.mid === leader),
                    ...newValue.filter(e => e.mid !== leader),
                  ]);
                  setFormDirty(true);
                }}
                isOptionEqualToValue={(option, value) => option.mid === value.mid}
                options={members}
                getOptionLabel={(option) => option.nickname + '(' + option.psn_id + ')'}
                renderOption={(props, option) => (
                  <Box {...props}>
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                      width={'100%'}
                    >
                      <div>{option.nickname + ' (' + option.psn_id + ') '}</div>
                      <div>
                        <RoleChipStack
                          spacing={0.5}
                          roles={{
                            hasTank: option.has_tank,
                            hasHealer: option.has_healer,
                            hasDD: option.has_dd,
                            hasPvP: option.has_pvp
                          }}
                        />
                      </div>
                    </Stack>
                  </Box> 
                )}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option.nickname + ' (' + option.psn_id + ')'}
                      {...getTagProps({ index })}
                      disabled={option.mid === leader}
                      color={(option.mid === leader) ? 'secondary' : 'default'}
                      icon={(option.mid === leader) ? (<FlagIcon />) : (<div/>)}
                    />
                  ))
                }
                style={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} label="????????????" placeholder="????????????..." />
                )}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                multiline
                id="team-desc"
                label="??????"
                placeholder='CP160, ???????????????, ...'
                minRows={2}
                disabled={lockUI}
                onChange={e => {setDesc(e.target.value); setFormDirty(true)}}
              />
            </Grid>
            <Grid item container justifyContent={'right'} columnSpacing={1}>
              <Grid item>
                <Link to={'/group'}>
                  <Button variant="outlined" disabled={lockUI}>??????</Button>
                </Link>
              </Grid>
              <Grid item>
                <Button 
                  variant="contained" 
                  onClick={e => addGroup()}
                  disabled={!formDirty || !formValid || lockUI}
                >????????????</Button>
              </Grid>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default CreateGroupView