import axios from 'axios';
import {API_URL} from '../../../config/env';

export const getDataTerimaSetoran = async code_setoran => {
  try {
    const data = {
      code_setoran: code_setoran,
    };
    const Response = await axios.post(
      `${API_URL}getDataTerimaSetoran.php`,
      data,
      {
        header: {
          Authorization: 'Bearer 9J9NSaKq9eK7UqGWxT07042027072118',
          'Content-Type': 'application/json',
        },
      },
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};
// act_setoran.php
export const act_setoran = async (
  code_setoran,
  id_token_from,
  id_token_to,
  limbah_kat_id,
  tanggal,
  jam,
  volume,
) => {
  try {
    const data = {
      code_setoran: code_setoran,
      id_token_from: id_token_from,
      id_token_to: id_token_to,
      limbah_kat_id: limbah_kat_id,
      tanggal: tanggal,
      jam: jam,
      volume: volume,
    };
    const Response = await axios.post(`${API_URL}act_setoran.php`, data, {
      header: {
        Authorization: 'Bearer 9J9NSaKq9eK7UqGWxT07042027072118',
        'Content-Type': 'application/json',
      },
    });
    return Response;
  } catch (error) {
    console.log(error);
  }
};
// act_setoran.php
