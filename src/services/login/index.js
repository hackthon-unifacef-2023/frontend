import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { post } from '../baseService';

export const login = async (payload) => {
  try {
    const response = await post(`/api/users/auth`, payload);

    localStorage.setItem('TOKEN_KEY', response.data.token);
    localStorage.setItem('isAdmin', response.data.is_admin);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const logout = async () => {
  localStorage.removeItem('TOKEN_KEY');
  localStorage.removeItem('isAdmin');
};
