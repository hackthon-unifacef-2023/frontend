import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { get, post } from '../baseService';

export const getAll = async () => {
  try {
    const response = await get(`/api/events/organization/list`);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const create = async (payload) => {
  try {
    const response = await post(`/api/events/create`, payload);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};
