import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { get, post } from '../baseService';

export const create = async (payload) => {
  try {
    const response = await post(`api/v1/user/accountant`, payload);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const getAll = async () => {
  try {
    const response = await get(`api/v1/accounting-office/public`);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};
