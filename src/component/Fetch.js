import { v4 as uuidv4 } from 'uuid';
import { Cookies } from 'react-cookie';
import { StorageKeyTgSession } from './Conf';

const _fetch = (method, url, navigate, options={}) => {
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

  const token = localStorage.getItem(StorageKeyTgSession);
  if (token) {
    opts.headers.Authorization = 'Bearer ' + token;
  }
  
  return fetch(url, opts)
    .then(
      res => {
        if (res.status === 401) {
          navigate('/');
        }
        if (res.status === 403) {
          navigate('/main');
        }
        return res
      }
    )
}

export const fetchGet = (url, navigate, options={}) => {
  return _fetch('GET', url, navigate, options)
}

export const fetchDelete = (url, navigate, options={}) => {
  return _fetch('DELETE', url, navigate, options)
}

export const fetchPost = (url, data, navigate, options={}) => {
  let opts = {
    ...options,
    ...{ 'body': JSON.stringify(data) }
  };

  opts.headers = {
    ...opts.headers,
    ...{ 'Content-Type': 'application/json' }
  }  
  
  return _fetch('POST', url, navigate, opts)
}

export const fetchPut = (url, data, navigate, options={}) => {
  let opts = {
    ...options,
    ...{ 'body': JSON.stringify(data) }
  };

  opts.headers = {
    ...opts.headers,
    ...{ 'Content-Type': 'application/json' }
  }

  return _fetch('PUT', url, navigate, opts)
}
