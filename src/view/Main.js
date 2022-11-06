import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import MenuCard from '../component/MenuCard';

import heroes from '../asset/img/eso/heroes.jpg'
import dungeon from '../asset/img/eso/dungeon.jpg'
import archer from '../asset/img/eso/archer.jpg'

const MainView = () => {
  return (
    <Grid
      container
      rowSpacing={0}
      direction="column"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
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