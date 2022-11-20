import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Grid from '@mui/material/Grid';
import { fetchGet } from '../component/Fetch';
import { Link as RouterLink } from 'react-router-dom';
import { ApiBaseURL } from '../component/Conf';
import { updateProfile, updateSessionToken } from '../component/Session';
import Link from '@mui/material/Link';

import MenuCard from '../component/MenuCard';

import heroes from '../asset/img/eso/heroes.jpg'
import dungeon from '../asset/img/eso/dungeon.jpg'
import archer from '../asset/img/eso/archer.jpg'
import achievement from '../asset/img/eso/achievement.jpg'
import guild from '../asset/img/eso/guild.png'

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
        <Grid item xs={10} sm={2}>
          <RouterLink to={'/group'}>
            <MenuCard
              image={dungeon}
              title={'團隊招募'}
            />
          </RouterLink>
        </Grid>
        <Grid item xs={10} sm={2}>
          <RouterLink to={'/my-achievement'}>
            <MenuCard
              image={achievement}
              title={'成就積分'}
            />
          </RouterLink>
        </Grid>
        <Grid item xs={10} sm={2}>
          <Link href="https://esotwguild.wordpress.com" target="_blank">
            <MenuCard
              image={guild}
              title={'文章心得'}
            />
          </Link>
        </Grid>
        <Grid item xs={10} sm={2}>
          <RouterLink to={'/guild-member'}>
            <MenuCard
              image={heroes}
              title={'公會成員'}
            />
          </RouterLink>
        </Grid>
        <Grid item xs={10} sm={2}>
          <RouterLink to={'/my-profile'}>
            <MenuCard
              image={archer}
              title={'個人資訊'}
            />
          </RouterLink>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default MainView;