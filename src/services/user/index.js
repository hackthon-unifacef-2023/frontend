import { handleErrors } from '../../common/utils/handlers/handleErrors';
import { get, post } from '../baseService';

export const getAll = async (data) => {
  try {
    const response = await get(
      `api/v1/user?${data.search ? `filter=${data.search}&` : ''}page=${data.page}&limit=${
        data.limit
      }`,
    );

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};

export const active = async (data) => {
  try {
    const response = await post(`api/v1/user/accountant/activate/${data}`);

    return response;
  } catch (error) {
    return handleErrors(error);
  }
};
