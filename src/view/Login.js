import Grid from '@mui/material/Grid';
import { Link } from 'react-router-dom';

import styles from './Login.module.css';

import tg_logo from '../asset/img/tg_logo/tg_with_text_white.png';

const LoginView = () => {
  return (
    <Grid
      container
      rowSpacing={5}
      direction="column"
      justifyContent="center"
      style={{ minHeight: '100vh' }}
    >
      <Grid item container justifyContent="center">
        <Grid item xs={6} sm={3}>
          <img src={tg_logo} style={{ height: 'auto', width: '100%' }} alt="TG Logo" />
        </Grid>
      </Grid>

      <Grid item container justifyContent="center">
        <Link to="/main">
          <input type="button" className={styles.lineLoginButton} />
        </Link>
      </Grid>

    </Grid>
  );
}

export default LoginView;
