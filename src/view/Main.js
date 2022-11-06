import Grid from '@mui/material/Grid';

import MenuCard from '../component/MenuCard';

import heroes from '../asset/img/eso/heroes.jpg'
import dungeon from '../asset/img/eso/dungeon.jpg'
import archer from '../asset/img/eso/archer.jpg'

export default function ActionAreaCard() {
  return (
    <Grid
      container
      rowSpacing={0}
      direction="column"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
      marginTop={1}
    >
      <Grid container justifyContent="center" columnSpacing={3} rowSpacing={3}>
        <Grid item xs={10} sm={3}>
          <MenuCard
            image={dungeon}
            title={'團隊招募'}
          />
        </Grid>
        <Grid item xs={10} sm={3}>
          <MenuCard
            image={heroes}
            title={'公會成員'}
          />
        </Grid>
        <Grid item xs={10} sm={3}>
          <MenuCard
            image={archer}
            title={'個人資訊'}
          />
        </Grid>
      </Grid>
    </Grid>
  );
}
