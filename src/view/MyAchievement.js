import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import AppBar from '@mui/material/AppBar';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Link as RouterLink } from 'react-router-dom';
import { ApiBaseURL } from '../component/Conf';
import { BannerError } from '../component/Banner';
import { fetchGet, fetchPut } from '../component/Fetch';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import { ScoreChip } from '../component/ScoreChip';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Link from '@mui/material/Link';

const dlcHmDesc = {
  'earthenRootEnclave': {
    'name_zhtw': '土根飛地',
    'name_en': 'Earthen Root Enclave',
    'dlc': 'Lost Depths',
    'hm': 'Earthen Root Avenger',
    'tri': 'Invaders\' Bane',
  },
  'gravenDeep': {
    'name_zhtw': '格羅夫深谷',
    'name_en': 'Graven Deep',
    'dlc': 'Lost Depths',
    'hm': 'Breathless',
    'tri': 'Fist of Tava',
  },
  'coralAerie': {
    'name_zhtw': '珊瑚巢穴',
    'name_en': 'Coral Aerie',
    'dlc': 'Ascending Tide',
    'hm': 'Tentacless Triumph',
    'tri': 'Land, Air, and Sea Supremacy',
  },
  'shipwrightsRegret': {
    'name_zhtw': '造船廠',
    'name_en': 'Shipwright\'s Regret',
    'dlc': 'Ascending Tide',
    'hm': 'Sans Spirit Support',
    'tri': 'Zero Regrets',
  },
  'redPetalBastion': {
    'name_zhtw': '紅花瓣堡壘',
    'name_en': 'Red Petal Bastion',
    'dlc': 'Waking Flame',
    'hm': 'Prior Offenses',
    'tri': 'Bastion Breaker',
  },
  'theDreadCellar': {
    'name_zhtw': '恐懼地窖',
    'name_en': 'The Dread Cellar',
    'dlc': 'Waking Flame',
    'hm': 'Unshaken',
    'tri': 'Battlespire\'s Best',
  },
  'blackDrakeVilla': {
    'name_zhtw': '黑龍山莊',
    'name_en': 'Black Drake villa',
    'dlc': 'Flames of Ambition',
    'hm': 'Snuffed Out',
    'tri': 'Ardent Bibliophile',
  },
  'theCauldron': {
    'name_zhtw': '地罋',
    'name_en': 'The Cauldron',
    'dlc': 'Flames of Ambition',
    'hm': 'Schemes Disrupted',
    'tri': 'Subterranean Smasher',
  },
  'castleThorn': {
    'name_zhtw': '荊棘城堡',
    'name_en': 'Castle Thorn',
    'dlc': 'Stonethorn',
    'hm': 'Thorn Remover',
    'tri': 'Bane of Thorns',
  },
  'stoneGarden': {
    'name_zhtw': '石頭花園',
    'name_en': 'Stone Garden',
    'dlc': 'Stonethorn',
    'hm': 'Triple Checked',
    'tri': 'True Genius',
  },
  'icereach': {
    'name_zhtw': '冰岸',
    'name_en': 'Icereach',
    'dlc': 'Harrowstorm',
    'hm': 'Cold-Blooded Killer',
    'tri': 'No Rest for the Wicked',
  },
  'unhallowedGrave': {
    'name_zhtw': '不潔墳墓',
    'name_en': 'Unhallowed Grave',
    'dlc': 'Harrowstorm',
    'hm': 'Skull Smasher',
    'tri': 'In Defiance of Death',
  },
  'lairOfMaarselok': {
    'name_zhtw': '馬塞洛克的巢穴',
    'name_en': 'Lair of Maarselok',
    'dlc': 'Scalebreaker',
    'hm': 'Selene\'s Savior',
    'tri': 'Nature\'s Wrath',
  },
  'moongraveFane': {
    'name_zhtw': '月墓神殿',
    'name_en': 'Moongrave Fane',
    'dlc': 'Scalebreaker',
    'hm': 'Drunk on Power',
    'tri': 'Defanged the Devourer',
  },
  'depthsOfMalatar': {
    'name_zhtw': '馬拉托的深處',
    'name_en': 'Depths of Malatar',
    'dlc': 'Wrathstone',
    'hm': 'Throwing Shade',
    'tri': 'Depths Defier',
  },
  'frostvault': {
    'name_zhtw': '冰霜穹頂',
    'name_en': 'Frostvault',
    'dlc': 'Wrathstone',
    'hm': 'Vault Cracker',
    'tri': 'Relentless Raider',
  },
  'blackrosePrison': {
    'name_zhtw': '黑玫瑰',
    'name_en': 'Blackrose Prison',
    'dlc': 'Murkmire ',
    'hm': 'Blackrose Prison Conqueror',
    'tri': 'God of the Gauntlet',
  },
  'marchOfSacrifices': {
    'name_zhtw': '犧牲進行曲',
    'name_en': 'March of Sacrifices',
    'dlc': 'Wolfhunter',
    'hm': 'Hircine\'s Champion',
    'tri': 'Apex Predator',
  },
  'moonHunterKeep': {
    'name_zhtw': '月亮獵人要塞',
    'name_en': 'Moon Hunter Keep',
    'dlc': 'Wolfhunter',
    'hm': 'The Alpha Predator',
    'tri': 'Pure Lunacy',
  },
  'fangLair': {
    'name_zhtw': '牙巢',
    'name_en': 'Fang Lair',
    'dlc': 'Dragon Bones',
    'hm': 'Let Bygones Be Bygones',
    'tri': 'Leave No Bone Unbroken',
  },
  'scalecallerPeak': {
    'name_zhtw': '呼喚者山峰',
    'name_en': 'Scalecaller Peak',
    'dlc': 'Dragon Bones',
    'hm': 'Breaker of Spells',
    'tri': 'Mountain God',
  },
  'bloodrootForge': {
    'name_zhtw': '血根熔爐',
    'name_en': 'Bloodroot Forge',
    'dlc': 'Horns of the Reach',
    'hm': 'Tempered Tantrum',
    'tri': 'Bloodroot Forge Challenger',
  },
  'falkreathHold': {
    'name_zhtw': '福克瑞斯要塞',
    'name_en': 'Craglorn',
    'dlc': 'Horns of the Reach',
    'hm': 'Taking the Bull by the Horns',
    'tri': 'Falkreath Hold Challenger',
  },
  'cradleOfShadows': {
    'name_zhtw': '陰影的搖籃',
    'name_en': 'Cradle of Shadows',
    'dlc': 'Shadows of the Hist',
    'hm': 'Velidreth\'s Vengeance',
    'tri': 'Cradle of Shadows Challenger',
  },
  'ruinsOfMazzatun': {
    'name_zhtw': '馬札頓遺址',
    'name_en': 'Ruins of Mazzatun',
    'dlc': 'Shadows of the Hist',
    'hm': 'Tree-Minder\'s Mania',
    'tri': 'Ruins of Mazzatun Challenger',
  },
}

const achievementOrder = [
  'earthenRootEnclave',
  'gravenDeep',
  'coralAerie',
  'shipwrightsRegret',
  'redPetalBastion',
  'theDreadCellar',
  'blackDrakeVilla',
  'theCauldron',
  'castleThorn',
  'stoneGarden',
  'icereach',
  'unhallowedGrave',
  'lairOfMaarselok',
  'moongraveFane',
  'depthsOfMalatar',
  'frostvault',
  'blackrosePrison',
  'marchOfSacrifices',
  'moonHunterKeep',
  'fangLair',
  'scalecallerPeak',
  'bloodrootForge',
  'falkreathHold',
  'cradleOfShadows',
  'ruinsOfMazzatun',
]

const MyAchievementView = () => {
  const [showError, setShowError] = useState(false);
  const [errMsg, setErrMsg] = useState('');
  const [showForm, setShowForm] = useState('hidden');
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState('');
  const [dialogTextHM, setDialogTextHM] = useState('');
  const [dialogTextTri, setDialogTextTri] = useState('');
  const [score, setScore] = useState(0);
  const [dlcDungeonHMs, setDlcDungeonHMs] = useState({
    'earthenRootEnclave': 0,
	  'gravenDeep': 0,
    'coralAerie': 0,
    'shipwrightsRegret': 0,
    'redPetalBastion': 0,
    'theDreadCellar': 0,
    'blackDrakeVilla': 0,
    'theCauldron': 0,
    'castleThorn': 0,
    'stoneGarden': 0,
    'icereach': 0,
    'unhallowedGrave': 0,
    'lairOfMaarselok': 0,
    'moongraveFane': 0,
    'depthsOfMalatar': 0,
    'frostvault': 0,
    'blackrosePrison': 0,
    'marchOfSacrifices': 0,
    'moonHunterKeep': 0,
    'fangLair': 0,
    'scalecallerPeak': 0,
    'bloodrootForge': 0,
    'falkreathHold': 0,
    'cradleOfShadows': 0,
    'ruinsOfMazzatun': 0,
});

  const resetBanner = () => {
    setShowError(false);
  }
  const showErrorBanner = (e) => {
    resetBanner();
    setShowError(true);
    setErrMsg(e);
  }

  let dlcHmAchievements = achievementOrder.map((item) => 
    <Grid item container alignItems={'center'} margin={1} key={item + '-grid-out'}>
      <Grid item xs={8} key={item + '-grid-name'}>
        <Link
          component="button"
          // variant="body2"
          onClick={() => {
            setDialogTitle(dlcHmDesc[item].name_zhtw + ' (' + dlcHmDesc[item].name_en + ')');
            setDialogTextHM(
              '困難模式通關：日誌 JOURNAL / 成就 ACHIEVEMENTS / ' + dlcHmDesc[item].dlc + ' / ' + dlcHmDesc[item].hm
            );
            setDialogTextTri(
              '三合一：日誌 JOURNAL / 成就 ACHIEVEMENTS / ' + dlcHmDesc[item].dlc + ' / ' + dlcHmDesc[item].tri
            );
            setDialogOpen(true);
          }}
          key={item + '-name'}
        >
          {dlcHmDesc[item].name_zhtw + ' (' + dlcHmDesc[item].name_en + ')'}
        </Link>
      </Grid>
      <Grid item xs={4} key={item + '-grid-select'}>
        <FormControl fullWidth size="small" key={item + '-form'}>
          <Select
            id={item + '-select'}
            value={dlcDungeonHMs[item]}
            onChange={e => { 
              setDlcDungeonHMs({ ...dlcDungeonHMs, [item]: e.target.value }); 
              updateAchiements({ ...dlcDungeonHMs, [item]: e.target.value }); 
            }}
            key={item + '-select'}
          >
            <MenuItem value={0}>未通關</MenuItem>
            <MenuItem value={1}>通關</MenuItem>
            <MenuItem value={2}>三合一</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  )

  const getAchievements = () => {
    fetchGet(ApiBaseURL + '/achievement')
      .then(
        res => {
          if (res.ok) {
            return res.json().then(d => {
              setScore(d.data.score);
              setDlcDungeonHMs(d.data.dlcDungeonHM);
              setShowForm('visible');
            });
          }
          throw new Error(res.status);
        }
      )
      .catch((error) => {
        showErrorBanner(error);
      });
  }

  const updateAchiements = (dlcDungeonHMs) => {
    let data = {
      'dlcDungeonHM': dlcDungeonHMs
    }
    fetchPut(ApiBaseURL + '/achievement', data)
      .then(res => {
        if (!res.ok) throw new Error(res.status);
        getAchievements();
      })
      .catch((error) => { showErrorBanner(error); });
  }

  useEffect(() => {
    resetBanner();
    setShowForm('hidden');
    getAchievements();
  }, []);

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            成就積分
          </Typography>
          <RouterLink to={'/main'}>
            <Button>回首頁</Button>
          </RouterLink>
        </Toolbar>
      </AppBar>
      <Grid container justifyContent={'center'} >
        <Grid item xs={12}>
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
            marginBottom={2}
          >
            <Grid item container justifyContent={'right'} alignItems={'center'}>
              <Grid item>
                <h2>目前積分：</h2>
              </Grid>
              <Grid item>
                <ScoreChip value={score} />
              </Grid>
            </Grid>
            <Grid item>
              <h2>DLC副本困難模式 (Hard Mode)：</h2>
            </Grid>
            <Grid item>
              點擊下列副本名稱可查詢相對應的遊戲內成就路徑，來確認是否已取得成就。<p/>
              請照實填寫，若有不實灌水者，將視嚴重程度進行懲處。
            </Grid>
            {dlcHmAchievements}
          </Grid>
        </Paper>
      </Grid>
      <Dialog onClose={e => setDialogOpen(false)} open={dialogOpen}>
        <DialogTitle>
          {dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="dialog-text-hm">
            {dialogTextHM}
          </DialogContentText>
          <DialogContentText id="dialog-text-tri">
            {dialogTextTri}
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default MyAchievementView