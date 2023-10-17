import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { post } from '../baseService';

export const login = async (payload) => {
  try {
    const response = await post(`api/v1/user/auth`, payload);

    if (response.success) {
      localStorage.setItem('TOKEN_KEY', response.data.data.token);
    }

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};
