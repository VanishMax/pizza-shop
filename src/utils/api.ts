import { LocalStorageItem } from '../components/global-context';

const request = async (url: RequestInfo, options: RequestInit = {}) => {
  const ls = JSON.parse(localStorage.getItem(LocalStorageItem) || '{}');
  const token = ls?.auth?.token;

  return fetch(url, {
    headers: {
      Authorization: token,
    },
    ...options,
  });
};
export default request;
