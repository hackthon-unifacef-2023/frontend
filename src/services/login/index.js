import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { post } from '../baseService';

export const login = async (payload) => {
  try {
    const response = await post(`/api/users/auth`, payload);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const logout = async () => {
  localStorage.removeItem('TOKEN_KEY');
};
