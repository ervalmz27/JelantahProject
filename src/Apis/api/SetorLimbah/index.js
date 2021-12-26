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
// act_perkiraanSaldoPoin.php

export const getPerkiraan = async (volume, user_level_id) => {
  try {
    const data = {volume: volume, user_level_id: user_level_id};
    const Response = await axios.post(
      `${API_URL}act_perkiraanSaldoPoin.php`,
      data,
      {
        header: {
          'Content-Type': 'application/json',
        },
      },
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};

// {"id_token_from":"rvZDFEOu1bbJ","id_token_to":"ULENMJdfg5Mv","limbah_kat_id":"1","tanggal":"2021-12-17","jam":"11:00","volume":"2500"}

export const JadwalSetoran = async (
  id_token_from,
  id_token_to,
  limbah_kat_id,
  tanggal,
  jam,
  volume,
) => {
  try {
    const data = {
      id_token_from: id_token_from,
      id_token_to: id_token_to,
      limbah_kat_id: limbah_kat_id,
      tanggal: tanggal,
      jam: jam,
      volume: volume,
    };
    const Response = await axios.post(`${API_URL}act_jadwalSetoran.php`, data, {
      header: {
        'Content-Type': 'application/json',
      },
    });
    return Response;
  } catch (error) {
    console.log(error);
  }
};
