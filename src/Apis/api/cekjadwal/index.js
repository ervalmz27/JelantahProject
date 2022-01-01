import axios from 'axios';
import {API_URL} from '../../../config/env';
// getDataCekJadwal.php
export const getDataCekJadwal = async id_token => {
  try {
    const data = {id_token: id_token};
    const Response = await axios.post(`${API_URL}getDataCekJadwal.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};
