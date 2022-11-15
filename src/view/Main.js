import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { fetchGet } from '../component/Fetch';
import { Link } from 'react-router-dom';
import { ApiBaseURL } from '../component/Conf';
import { updateProfile, updateSessionToken } from '../component/Session';

import MenuCard from '../component/MenuCard';

import heroes from '../asset/img/eso/heroes.jpg'
import dungeon from '../asset/img/eso/dungeon.jpg'
import archer from '../asset/img/eso/archer.jpg'

const MainView = () => {
  const navigate = useNavigate();
  const [showView, setShowView] = useState('hidden');

  useEffect(() => {
    fetchGet(ApiBaseURL + '/session')
      .then(
        res => {
          if (!res.ok) throw new Error(res.status);
          return res.json();
        }
      )
      .then(d => {
        if (!d.data.session.psn_id) {
          navigate('/my-profile');
          return;
        }
        if (!d.data.session.line_notify_enabled) {
          navigate('/enable-line-notify');
          return;
        }
        updateProfile(d.data.session);
        updateSessionToken(d.data.token);
        setShowView('visible');
      })
      .catch(e => {
        console.log(e);
      });
  }, []);
  return (
    <Grid
      container
      rowSpacing={0}
      direction="column"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
      visibility={showView}
    >
      <Grid container justifyContent="center" columnSpacing={3} rowSpacing={3}>
        <Grid item xs={10} sm={3}>
          <Link to={'/group'}>
            <MenuCard
              image={dungeon}
              title={'團隊招募'}
            />
          </Link>
        </Grid>
        <Grid item xs={10} sm={3}>
          <Link to={'/guild-member'}>
            <MenuCard
              image={heroes}
              title={'公會成員'}
            />
          </Link>
        </Grid>
        <Grid item xs={10} sm={3}>
          <Link to={'/my-profile'}>
            <MenuCard
              image={archer}
              title={'個人資訊'}
            />
          </Link>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MainView;