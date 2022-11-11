import React, { useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import { ApiBaseURL } from '../component/Conf';
import { fetchPost } from '../component/Fetch';
import { StorageKeyTgSession, StorageKeyTgLineState, WebsiteURL } from '../component/Conf';

const LineAuthCallbackView = () => {
  const navigate = useNavigate();

  useEffect(() => {
    let params = new URLSearchParams(document.location.search);
    let code = params.get('code');
    let state = params.get('state');
    let lineState = localStorage.getItem(StorageKeyTgLineState);
    localStorage.removeItem(StorageKeyTgLineState);
    if (lineState !== state) {
      navigate('/');
      return;
    }
  
    fetchPost(ApiBaseURL + '/session', {code: code}, navigate)
      .then(
        res => {
          if (res.ok) {
            return res.json();
          }
        }
      )
      .then(d => {
        localStorage.setItem(StorageKeyTgSession, d.data.token);
        window.location.href = WebsiteURL
      });
  }, [navigate]);
  return (
    <div></div>
  );
};

export default LineAuthCallbackView;