
export const keyTgSessionToken = 'tg-session';
export const keyTgProfile = 'tg-profile';

export const getSessionToken = () => {
  return localStorage.getItem(keyTgSessionToken);
}

export const updateSessionToken = (s) => {
  localStorage.setItem(keyTgSessionToken, s);
}

export const removeSessionToken = () => {
  localStorage.removeItem(keyTgSessionToken);
}

export const getProfile = () => {
  return localStorage.getItem(keyTgProfile);
}

export const updateProfile = (p) => {
  localStorage.setItem(keyTgProfile, p);
}