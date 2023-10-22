import { axiosDefault } from '../common/utils/api';
import { handleErrors } from '../common/utils/handlers/handleErrors';
import { handleSuccess } from '../common/utils/handlers/handleSuccess';

export const get = async (path) => {
  const axios = axiosDefault();

  try {
    const { data } = await axios.get(path);
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};

export const post = async (path, payload) => {
  const axios = axiosDefault();

  try {
    const { data } = await axios.post(path, payload);
    return handleSuccess(data);
  } catch (error) {
    return handleErrors(error);
  }
};
