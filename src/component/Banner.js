import React, { useState, useEffect } from 'react';
import Collapse from '@mui/material/Collapse';
import Alert from '@mui/material/Alert';

export const Banner = (props) => {
  const [displayed, setDisplayed] = useState(props.displayed);
  const [sev, setSev] = useState('info');
  useEffect(() => {
    setSev(props.severity)
    setDisplayed(props.displayed)
  }, [props.severity, props.displayed]);

  return (
    <Collapse in={displayed}>
      <Alert
        severity={sev}
        onClose={() => { setDisplayed(false) }}
      >{props.children}</Alert>
    </Collapse>
  )
}

export const BannerSuccess = (props) => {
  return (<Banner severity="success" displayed={props.displayed}>{props.children}</Banner>)
}

export const BannerError = (props) => {
  return (<Banner severity="error" displayed={props.displayed}>{props.children}</Banner>)
}