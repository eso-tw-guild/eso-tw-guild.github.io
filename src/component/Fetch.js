import { v4 as uuidv4 } from 'uuid';
import { Cookies } from 'react-cookie';
import { getSessionToken, removeSessionToken } from './Session';
import { WebsiteURL } from './Conf';

const _fetch = (method, url, options={}) => {
  let opts = {
    ...options,
    ...{
      'method': method,
      'mode': 'cors',
      'credentials': 'include'
    }
  };

  const csrfToken = uuidv4();
  let cookies = new Cookies();
  cookies.set(
    'tg-csrf',
    csrfToken,
    {
      'path': '/',
      'sameSite': 'none',
      'secure': true
    }
  )

  opts.headers = {
    ...opts.headers,
    ...{
      'x-tg-csrf': csrfToken
    }
  }

  const token = getSessionToken();
  if (token) {
    opts.headers.Authorization = 'Bearer ' + token;
  }
  
  return fetch(url, opts)
    .then(
      res => {
        if (res.status === 401) {
          removeSessionToken();
          window.location.href = WebsiteURL;
          return;
        }
        if (res.status === 403) {
          window.location.href = WebsiteURL + '/#/main';
          return;
        }
        return res
      }
    )
}

export const fetchGet = (url, options={}) => {
  return _fetch('GET', url, options)
}

export const fetchDelete = (url, options={}) => {
  return _fetch('DELETE', url, options)
}

export const fetchPost = (url, data, options={}) => {
  let opts = {
    ...options,
    ...{ 'body': JSON.stringify(data) }
  };

  opts.headers = {
    ...opts.headers,
    ...{ 'Content-Type': 'application/json' }
  }  
  
  return _fetch('POST', url, opts)
}

export const fetchPut = (url, data, options={}) => {
  let opts = {
    ...options,
    ...{ 'body': JSON.stringify(data) }
  };

  opts.headers = {
    ...opts.headers,
    ...{ 'Content-Type': 'application/json' }
  }

  return _fetch('PUT', url, opts)
}
