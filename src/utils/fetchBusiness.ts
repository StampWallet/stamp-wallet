import * as api from '../api';
import Auth from '../database/Auth';

const fetchBusiness = async () => {
  const BA = new api.BusinessApi();
  const header = Auth.getAuthHeader();
  let response;

  try {
    response = await BA.getBusinessAccountInfo(header);
  } catch (e) {
    console.log(e);
    throw e;
  }

  const { itemDefinitions } = response.data;

  return {
    hasBusiness: true,
    itemDefinitions,
  };
};

export default fetchBusiness;
