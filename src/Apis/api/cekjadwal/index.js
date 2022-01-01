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

// getDataTerimaJadwal.php
export const getDataTerimaJadwal = async id_token => {
  try {
    const data = {id_token: id_token};
    const Response = await axios.post(
      `${API_URL}getDataTerimaJadwal.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};

// act_terima_jadwal.php
export const ResultJadwalTerima = async (
  code_setoran,
  id_token_from,
  id_token_to,
  limbah_kat_id,
  tanggal,
  jam,
  volume,
  aksi,
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
      aksi: aksi,
    };
    const Response = await axios.post(`${API_URL}act_terima_jadwal.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};
