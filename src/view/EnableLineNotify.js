import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { ApiBaseURL } from '../component/Conf';
import { BannerSuccess, BannerError } from '../component/Banner';
import { fetchPost } from '../component/Fetch';
import { useParams } from "react-router-dom";
import { v4 as uuidv4 } from 'uuid';
import { StorageKeyTgLineState, LineNotifyCallbackURL, WebsiteURL } from '../component/Conf';

import oneToOne from '../asset/img/line-notify/choose-1-to-1.jpg';
import linkedMsg from '../asset/img/line-notify/notify-linked-msg.jpg';

const EnableLineNotifyView = () => {
  const [lockUI, setLockUI] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const { action } = useParams();
  
  const resetBanner = () => {
    setShowSuccess(false);
    setShowError(false);
  }

  const showSuccessBanner = () => {
    resetBanner();
    setShowSuccess(true);
    setLockUI(true);
  }
  const showErrorBanner = (e) => {
    resetBanner();
    setShowError(true);
    setErrMsg(e);
  }

  const enableNotify = () => {
    const lineState = uuidv4();
  
    localStorage.setItem(StorageKeyTgLineState, lineState);

    let url = 'https://notify-bot.line.me/oauth/authorize?';
    url += 'response_type=code';
    url += '&client_id=St1i5c4BRn2bIbokmBDojs';
    url += '&redirect_uri=' + encodeURIComponent(LineNotifyCallbackURL);
    url += '&state=' + encodeURIComponent(lineState);
    url += '&scope=' + encodeURIComponent('notify');
    window.location.href = url;
  }

  useEffect(() => {
    resetBanner();
    setLockUI(false);
    if (action === 'callback') {
      setLockUI(true);
      let params = new URLSearchParams(document.location.search);
      let code = params.get('code');
      let state = params.get('state');
      let lineState = localStorage.getItem(StorageKeyTgLineState);
      localStorage.removeItem(StorageKeyTgLineState);
      if (lineState !== state) {
        window.location.href = WebsiteURL;
        return;
      }

      fetchPost(ApiBaseURL + '/line/notify-token', { code: code })
        .then(res => {
          if (res.ok) {
            window.location.href = WebsiteURL + '/#/enable-line-notify/ok';
            return;
          }
          if (res.status === 400) {
            return res.json().then(d => {
              if (d.status === 200) {
                window.location.href = WebsiteURL + '/#/enable-line-notify/error-not-1-to-1';
                return;
              }
              window.location.href = WebsiteURL + '/#/enable-line-notify/error-other';
            })
          }
          window.location.href = WebsiteURL + '/#/enable-line-notify/error-other';
        });
    }
    if (action === 'ok') {
      setLockUI(true);
      showSuccessBanner();
      return
    }
    if (action === 'error-not-1-to-1') {
      showErrorBanner('??????????????????????????????LINE Notify?????????"??????1???1????????????LINE Notify?????????"');
      return
    }
    if (action === 'error-other') {
      showErrorBanner('??????????????????????????????LINE Notify');
      return
    }
  }, [action]);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            ??????LINE Notify
          </Typography>
          <Link to={'/main'}>
            <Button>?????????</Button>
          </Link>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent={'center'} >
        <Grid item xs={12}>
          <BannerSuccess displayed={showSuccess}>????????????</BannerSuccess>
          <BannerError displayed={showError}>{'????????????: ' + errMsg}</BannerError>
        </Grid>
        <Paper
          elevation={3}
          component={Grid}
          item container
          justifyContent={'center'}
          xs={10} sm={8} md={6}
          marginTop={5}
        >
          <Grid
            item container
            direction="column"
            spacing={2}
            xs={11}
            marginBottom={2}
          >
            <Grid item>
              <h3>????????????</h3>
            </Grid>
            <Grid item>
              <ol>
                <li>??????"??????LINE NOTIFY"????????????????????????LINE?????????</li>
                <li>??????"??????1???1????????????LINE Notify?????????"???</li>
                  <Grid item xs={11}>
                    <img src={oneToOne} alt="1-to-1" width={'100%'} />
                  </Grid>
                <li>?????????????????????ESO TW GUILD??????LINE Notify??????????????????</li>
                <Grid item xs={11}>
                  <img src={linkedMsg} alt="linked" width={'100%'} />
                </Grid>
              </ol>
            </Grid>
            <Grid item container justifyContent={'center'}>
              <Button
                variant="contained"
                size="large"
                onClick={enableNotify}
                disabled={lockUI}
              >??????Line Notify</Button>
            </Grid>
          </Grid>
        </Paper>
      </Grid>
    </div>
  );
};

export default EnableLineNotifyView