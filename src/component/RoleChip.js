import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';

export const RoleChip = (props) => {
  return (
    <Chip 
      label={props.label}
      size="small"
      color={props.hasRole ? props.color : 'default'}
      variant={props.hasRole ? 'filled' : 'outlined'} 
    />
  )
}

export const RoleChipStack = (props) => {
  return (
    <Stack direction="row" spacing={props.spacing} justifyContent={props.justifyContent}>
      <RoleChip label="坦" color="info" hasRole={props.roles.hasTank} />
      <RoleChip label="補" color="success" hasRole={props.roles.hasHealer} />
      <RoleChip label="輸出" color="warning" hasRole={props.roles.hasDD} />
      <RoleChip label="PvP" color="secondary" hasRole={props.roles.hasPvP} />
    </Stack>
  );
}