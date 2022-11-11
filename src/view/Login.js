import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { ApiBaseURL, LineAuthCallbackURL } from '../component/Conf';
import { fetchGet } from '../component/Fetch';
import { StorageKeyTgSession, StorageKeyTgLineState } from '../component/Conf';
import { v4 as uuidv4 } from 'uuid';

import styles from './Login.module.css';

import tg_logo from '../asset/img/tg_logo/tg_with_text_white.png';

const LoginView = () => {
  const navigate = useNavigate();

  const [showView, setShowView] = useState('hidden');

  const lineAuth = (e) => {
    const lineState = uuidv4();
    
    localStorage.setItem(StorageKeyTgLineState, lineState);

    let url = 'https://access.line.me/oauth2/v2.1/authorize?';
    url += 'response_type=code';
    url += '&client_id=1657615308';
    url += '&redirect_uri=' + encodeURIComponent(LineAuthCallbackURL);
    url += '&state=' + encodeURIComponent(lineState);
    url += '&scope=' + encodeURIComponent('profile openid');
    window.location.href = url;
  }

  useEffect(() => {
    fetchGet(ApiBaseURL + '/session', navigate)
      .then(
        res => {
          if (res.ok) {
            navigate('/main');
            return;
          }
          localStorage.removeItem(StorageKeyTgSession);
          setShowView('visible');
        }
      );
  }, [navigate]);
  return (
    <Grid
      container
      rowSpacing={5}
      direction="column"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
      visibility={showView}
    >
      <Grid item container justifyContent="center">
        <Grid item xs={6} sm={3}>
          <img src={tg_logo} style={{ height: 'auto', width: '100%' }} alt="TG Logo" />
        </Grid>
      </Grid>

      <Grid item container justifyContent="center">
        <input type="button" className={styles.lineLoginButton} onClick={lineAuth}/>
      </Grid>

    </Grid>
  );
}

export default LoginView;
