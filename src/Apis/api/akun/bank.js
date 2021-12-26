import axios from 'axios';
import {API_URL} from '../../../config/env';

// getDataBank.php
export const getDataBank = async () => {
  try {
    const info = await axios.get(`${API_URL}getDataBank.php`);
    return info;
  } catch (error) {
    console.log('Message Error :', error);
    throw error;
  }
};
// getDataRekeningBank.php
export const getDataRekeningBank = async id_token => {
  try {
    const data = {id_token: id_token};

    const info = await axios.post(`${API_URL}getDataRekeningBank.php`, data, {
      header: {
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message Error :', error);
  }
};

// act_RekeningBank.php
// {"id_token":"rvZDFEOu1bbJ","nama_rekening":"Hengky TS","no_rekening":"12313213","id_bank":1,"isAkunUtama":1}
export const RegisterRekBank = async (
  id_token,
  nama_rekening,
  no_rekening,
  id_bank,
  isAkunUtama,
) => {
  const data = {
    id_token: id_token,
    nama_rekening: nama_rekening,
    no_rekening: no_rekening,
    id_bank: id_bank,
    isAkunUtama: isAkunUtama,
  };
  try {
    const info = await axios.post(`${API_URL}act_RekeningBank.php`, data);
    return info;
  } catch (error) {
    console.log('Message Error :', error);
    throw error;
  }
};

// act_deleteRekeningBank.php

export const DeleteBank = async (id_token, id_user_bank) => {
  const data = {id_token: id_token, id_user_bank: id_user_bank};
  try {
    const info = await axios.post(`${API_URL}act_deleteRekeningBank.php`, data);
    return info;
  } catch (error) {
    console.log('Message Error :', error);
    throw error;
  }
};

// act_AkunUtamaRekeningBank.php

export const AkunUtamaBank = async (id_token, id_bank) => {
  try {
    const data = {id_token: id_token, id_bank: id_bank};
    const info = await axios.post(
      `${API_URL}act_AkunUtamaRekeningBank.php`,
      data,
    );
    return info;
  } catch (error) {
    console.log('Message Error :', error);
    throw error;
  }
};
