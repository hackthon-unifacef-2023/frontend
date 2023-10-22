import axios from 'axios';

export const axiosDefault = () => {
  const token = localStorage.getItem('TOKEN_KEY');

  const configs = {
    baseURL: 'http://localhost:6969',
    headers: {
      Authorization: `Bearer ${token}`,
      withCredentials: true
    }
  };

  return axios.create(configs);
};
