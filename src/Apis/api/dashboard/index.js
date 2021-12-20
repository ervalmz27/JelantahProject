import axios from 'axios';
import {API_URL} from '../../../config/env';

export const getInfoTerkini = async () => {
  try {
    const Response = await axios.get(`${API_URL}getDataInfoTerkini.php`);
    return Response;
  } catch (error) {
    console.log(error);
  }
};
export const getDataSeputar = async () => {
  try {
    const Response = await axios.get(`${API_URL}getDataSeputar.php`);
    return Response;
  } catch (error) {
    console.log(error);
  }
};
export const getDataAktifitasTerakhir = async id_token => {
  try {
    const data = {id_token: id_token};
    const Response = await axios.post(
      `${API_URL}getDataAktifitasTerakhir.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};
