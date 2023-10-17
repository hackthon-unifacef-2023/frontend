import { get } from '../baseService';

export const isAuthenticated = async () => {
  const token = localStorage.getItem('TOKEN_KEY');
  const response = await get('api/v1/user/auth/validate');

  if (token && response.success) {
    return response;
  }

  return false;
};
