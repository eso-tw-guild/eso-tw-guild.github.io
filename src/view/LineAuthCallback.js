import React, { useEffect } from 'react';
import { ApiBaseURL } from '../component/Conf';
import { fetchPost } from '../component/Fetch';
import { StorageKeyTgLineState, WebsiteURL } from '../component/Conf';
import { updateSessionToken } from '../component/Session';

const LineAuthCallbackView = () => {
  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    let code = params.get('code');
    let state = params.get('state');
    let lineState = localStorage.getItem(StorageKeyTgLineState);
    localStorage.removeItem(StorageKeyTgLineState);
    if (lineState !== state) {
      window.location.href = WebsiteURL;
    }
  
    fetchPost(ApiBaseURL + '/session', {code: code})
      .then(
        res => {
          if (res.ok) {
            return res.json();
          }
          window.location.href = WebsiteURL;
        }
      )
      .then(d => {
        updateSessionToken(d.data.token);
        window.location.href = WebsiteURL + '/#/main'
      });
  }, []);
  return (
    <div></div>
  );
};

export default LineAuthCallbackView;