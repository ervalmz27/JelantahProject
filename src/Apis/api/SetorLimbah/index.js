import axios from 'axios';
import {API_URL} from '../../../config/env';

export const getLimbah = async () => {
  try {
    const Response = await axios.get(`${API_URL}getDataLimbah.php`);
    return Response;
  } catch (error) {
    console.log(error);
  }
};
