import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { get, post } from '../baseService';

export const getAll = async () => {
  try {
    const response = await get(`/api/organizations/list`);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const activeOrganization = async (id) => {
  try {
    const response = await post(`/api/organizations/approve/${id}`);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const activeEvent = async (id) => {
  try {
    const response = await post(`/api/events/approve/${id}`);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};
