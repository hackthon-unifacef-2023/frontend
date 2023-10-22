import axios from 'axios';

export const axiosDefault = () => {
  const token = localStorage.getItem('TOKEN_KEY');

  const configs = {
    baseURL: 'http://10.0.34.72:6969',
    headers: {
      Authorization: token ? `Bearer ${token}` : undefined,
      withCredentials: true
    }
  };

  return axios.create(configs);
};
