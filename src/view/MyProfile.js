import React, { useState, useEffect } from 'react';
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
import { ApiBaseURL, WebsiteURL } from '../component/Conf';
import { BannerSuccess, BannerError } from '../component/Banner';
import { fetchGet, fetchPut } from '../component/Fetch';

const MyProfileView = () => {
  const [nickName, setNickName] = useState('');
  const [psnID, setPsnID] = useState('');
  const [hasTank, setHasTank] = useState(false);
  const [hasHealer, setHasHealer] = useState(false);
  const [hasDD, setHasDD] = useState(false);
  const [hasPvP, setHasPvP] = useState(false);
  const [lockUI, setLockUI] = useState(true);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showForm, setShowForm] = useState('hidden');
  const [changed, setChanged] = useState(false);

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

  useEffect(() => {
    resetBanner();
    setShowForm('hidden');
    setLockUI(true);
    setChanged(false);

    fetchGet(ApiBaseURL + '/profile')
      .then(
        res => {
          setLockUI(false);
          if (res.ok) {
            return res.json().then(d => {
              setNickName(d.data.nickname);
              setPsnID(d.data.psn_id);
              setHasTank(d.data.has_tank);
              setHasHealer(d.data.has_healer);
              setHasDD(d.data.has_dd);
              setHasPvP(d.data.has_pvp);
              setShowForm('visible');
            });
          }
          if (res.status === 404) {
            setShowForm('visible');
            return;
          }
          throw new Error(res.status);
        }
      )
      .catch((error) => {
        showErrorBanner(error); 
      });
  }, []);

  const update = () => {
    resetBanner();
    setLockUI(true);
    setChanged(false);

    const data = {
      nickname: nickName,
      psn_id: psnID,
      has_tank: hasTank,
      has_healer: hasHealer,
      has_dd: hasDD,
      has_pvp: hasPvP
    }
    fetchPut(ApiBaseURL + '/profile', data)
      .then(res => {
        setLockUI(false);
        if (!res.ok) throw new Error(res.status);
        showSuccessBanner();
        return res.json()
      })
      .then(d => {
        window.location.href = WebsiteURL + '/#/main';
      })
      .catch((error) => { showErrorBanner(error); });
  }

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
      <Grid container justifyContent={'center'} >
        <Grid item xs={12}>
          <BannerSuccess displayed={showSuccess}>更新成功</BannerSuccess>
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
                id="psn-id-textfield"
                label="PSN ID"
                disabled={lockUI}
                value={psnID}
                helperText={(!psnID && changed) ? "不可為空" : ""}
                error={(!psnID && changed)}
                onChange={e => {setPsnID(e.target.value); setChanged(true)}}
              />
            </Grid>
            <Grid item>
              <TextField
                fullWidth
                required
                id="nickname-textfield"
                label="暱稱"
                disabled={lockUI}
                value={nickName}
                helperText={(!nickName && changed) ? "不可為空" : ""}
                error={(!nickName && changed)}
                onChange={e => {setNickName(e.target.value); setChanged(true)}}
              />
            </Grid>
            <Grid item container>
              <FormGroup>
                擁有角色：
                <FormControlLabel
                  control={<Checkbox />} 
                  label="坦克" 
                  disabled={lockUI}
                  checked={hasTank} 
                  onChange={e => {setHasTank(e.target.checked); setChanged(true)}}
                />
                <FormControlLabel 
                  control={<Checkbox />} 
                  label="補師"
                  disabled={lockUI}
                  checked={hasHealer}
                  onChange={e => {setHasHealer(e.target.checked); setChanged(true)}}
                />
                <FormControlLabel 
                  control={<Checkbox />} 
                  label="輸出"
                  disabled={lockUI}
                  checked={hasDD}
                  onChange={e => {setHasDD(e.target.checked); setChanged(true)}}
                />
                <FormControlLabel 
                  control={<Checkbox />} 
                  label="PvP" 
                  disabled={lockUI}
                  checked={hasPvP}
                  onChange={e => {setHasPvP(e.target.checked); setChanged(true)}}
                />
              </FormGroup>
            </Grid>
            <Grid item container justifyContent={'right'}>
              <Button 
                variant="contained"
                onClick={e => update()} 
                disabled={lockUI || (!changed) || (!psnID) || (!nickName)}
              >更新個人資訊</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default MyProfileView