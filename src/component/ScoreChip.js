import Chip from '@mui/material/Chip';
import StarIcon from '@mui/icons-material/Star';

export const ScoreChip = (props) => {
  const mapColor = (v) => {
    if (v === 0) return 'default';
    if (v <= 20) return 'success';
    if (v <= 30) return 'info';
    if (v <= 40) return 'secondary';
    return 'warning';
  }
  return (
    <Chip
      icon={<StarIcon />}
      label={props.value + ''}
      size={props.size}
      color={mapColor(props.value)}
      variant={'filled'}
    />
  )
}
