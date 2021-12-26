import axios from 'axios';
import {API_URL} from '../../../config/env';

// getDataEWallet.php

export const getDataEWallet = async id_token => {
  try {
    const data = {id_token: id_token};

    const info = await axios.post(`${API_URL}getDataEWallet.php`, data, {
      header: {
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message Error :', error);
  }
};

// getDataDigitalMoney.php
export const getDataDigitalMoney = async () => {
  try {
    const info = await axios.get(`${API_URL}getDataDigitalMoney.php`);
    return info;
  } catch (error) {
    console.log('Message Error :', error);
    throw error;
  }
};

//
export const RegisterEwalet = async (
  id_token,
  nama_dgm,
  no_dgm,
  id_dgm,
  isAkunUtama,
) => {
  const data = {
    id_token: id_token,
    nama_dgm: nama_dgm,
    no_dgm: no_dgm,
    id_dgm: id_dgm,
    isAkunUtama: isAkunUtama,
  };
  try {
    const info = await axios.post(`${API_URL}act_EWallet.php`, data);
    return info;
  } catch (error) {
    console.log('Message Error :', error);
    throw error;
  }
};

export const DeleteEwalet = async (id_token, id_user_dgm) => {
  const data = {id_token: id_token, id_user_dgm: id_user_dgm};
  try {
    const info = await axios.post(`${API_URL}act_deleteEWallet.php`, data);
    return info;
  } catch (error) {
    console.log('Message Error :', error);
    throw error;
  }
};
// act_AkunUtamaEWallet.php
//
export const AkunUtamaEWallet = async (id_token, id_dgm) => {
  const data = {id_token: id_token, id_dgm: id_dgm};
  try {
    const info = await axios.post(`${API_URL}act_AkunUtamaEWallet.php`, data);
    return info;
  } catch (error) {
    console.log('Message Error :', error);
    throw error;
  }
};
