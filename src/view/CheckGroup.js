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
import FlagIcon from '@mui/icons-material/Flag';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { fetchGet, fetchPut } from '../component/Fetch';
import { ApiBaseURL, WebsiteURL } from '../component/Conf';
import { BannerSuccess, BannerError } from '../component/Banner';
import { getProfile } from '../component/Session';
import { useParams } from "react-router-dom";
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';

const CheckGroupView = () => {
  if (!getProfile()) {
    window.location.href = WebsiteURL;
  }

  const { gid } = useParams();
  const mid = getProfile().mid;
  const [name, setName] = useState('');
  const [desc, setDesc] = useState('');
  const [time, setTime] = useState(dayjs().format());
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [members, setMembers] = useState([]);
  const [showForm, setShowForm] = useState('hidden');
  const [lockUI, setLockUI] = useState(false);
  const [myResp, setMyResp] = useState(0);
  const [leader, setLeader] = useState('');


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

  const chipColor = (mid, response) => {
    if (mid === leader) {
      return {
        'color': 'secondary',
        'icon': (<FlagIcon />)
      }
    }
    if (response === 1) {
      return {
        'color': 'success',
        'icon': (<CheckIcon />)
      }
    }
    if (response === 2) {
      return {
        'color': 'error',
        'disabled': true,
        'icon': (<CloseIcon />)
      }
    }
    return {
      'color': 'default',
      'icon': (<QuestionMarkIcon />)
    }
  }

  const updateResponse = (resp) => {
    resetBanner();
    setLockUI(true);

    const data = {
      'response': resp
    }

    fetchPut(ApiBaseURL + '/groups/' + gid + '/members/' + mid + '/response', data)
      .then(res => {
        setLockUI(false);
        if (!res.ok) throw new Error(res.status);
        showSuccessBanner();
        return res.json()
      })
      .then(data => console.log(data))
      .catch((error) => { showErrorBanner(error); });
  }

  useEffect(() => {
    resetBanner();
    setShowForm('hidden');
    if (!gid) {
      return;
    }
    fetchGet(ApiBaseURL + '/groups/' + gid)
      .then(
        res => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        }
      )
      .then(d => {
        setMembers(d.data.members);
        setDesc(d.data.desc);
        setName(d.data.name);
        setLeader(d.data.leader);
        setTime(dayjs(d.data.start_time).format());
        let me = d.data.members.find(x => x.mid === mid);
        if (me) {
          setMyResp(me.response);
        }
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
            團隊資訊
          </Typography>
          <Link to={'/group'}>
            <Button>回團隊列表</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent={'center'}>
        <Grid item xs={12}>
          <BannerSuccess displayed={showSuccess}>已更新參加狀態</BannerSuccess>
          <BannerError displayed={showError}>{'發生錯誤: ' + errMsg}</BannerError>
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
                label="團隊名稱"
                InputProps={{
                  readOnly: true
                }}
                value={name}
              />
            </Grid>
            <Grid item>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateTimePicker
                  readOnly
                  label="出團時間"
                  value={time}
                  renderInput={(params) => <TextField fullWidth {...params} />}
                  inputFormat="YYYY/MM/DD hh:mm A"
                />
              </LocalizationProvider>
            </Grid>
            <Grid item container>
              <Autocomplete
                multiple
                readOnly
                id="members-select"
                value={members}
                renderTags={(tagValue, getTagProps) =>
                  tagValue.map((option, index) => (
                    <Chip
                      label={option.nickname + ' (' + option.psn_id + ')'}
                      {...getTagProps({ index })}
                      {...chipColor(option.mid, option.response)}
                    />
                  ))
                }
                style={{ width: '100%' }}
                renderInput={(params) => (
                  <TextField {...params} label="出團成員" />
                )}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                multiline
                id="team-desc"
                label="備註"
                minRows={2}
                InputProps={{
                  readOnly: true
                }}
                value={desc}
              />
            </Grid>
            <Grid item visibility={(leader !== '' && leader !== mid) ? 'visible' : 'hidden'}>
              <FormControl fullWidth>
                <InputLabel id="response-select">是否參加</InputLabel>
                <Select
                  fullWidth
                  autoFocus
                  labelId="response-select"
                  id="response-select"
                  value={myResp}
                  label="是否參加"
                  disabled={lockUI}
                  onChange={e => { setMyResp(e.target.value); updateResponse(e.target.value) }}
                >
                  <MenuItem value={0}>尚未決定</MenuItem>
                  <MenuItem value={1}>同意參加</MenuItem>
                  <MenuItem value={2}>無法參加</MenuItem>
                </Select>
              </FormControl>
              
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default CheckGroupView