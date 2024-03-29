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

export const OpenPesanDetail = async (id_token, id_pesan) => {
  try {
    const data = {id_token: id_token, id_pesan: id_pesan};
    const Response = await axios.post(
      `${API_URL}act_OpenPesanDetail.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};
//  get DAta Details
export const getDataInfoTerkiniDetail = async id_info => {
  try {
    const data = {id_info: id_info};
    const Response = await axios.post(
      `${API_URL}getDataInfoTerkiniDetail.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};
export const getDataTugasDetail = async id_token => {
  try {
    const data = {id_token: id_token};
    const Response = await axios.post(`${API_URL}getDataTugasDetail.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};
// getDataSeputarDetail.php
export const getDataSeputarDetail = async id_seputar => {
  try {
    const data = {id_seputar: id_seputar};
    const Response = await axios.post(
      `${API_URL}getDataSeputarDetail.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};

// notification
// getDataPesanDetail.php
export const getDataPesanDetail = async id_pesan => {
  try {
    const data = {id_pesan: id_pesan};
    const Response = await axios.post(`${API_URL}getDataPesanDetail.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};

// getDataRiwayat.php
export const getDataRiwayat = async id_token => {
  try {
    const data = {id_token: id_token};
    const Response = await axios.post(`${API_URL}getDataRiwayat.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};

// getDataAktifitasTerakhirDompet.php
export const getDataAktifitasTerakhirDompet = async id_token => {
  try {
    const data = {id_token: id_token};
    const Response = await axios.post(
      `${API_URL}getDataAktifitasTerakhirDompet.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};
// getDataStatistikSetoranDetail.php

export const getDataStatistikSetoranDetail = async id_token => {
  try {
    const data = {id_token: id_token};
    const Response = await axios.post(
      `${API_URL}getDataStatistikSetoranDetail.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};
// getDataRiwayatDompet.php
export const getDataRiwayatDompet = async id_token => {
  try {
    const data = {id_token: id_token};
    const Response = await axios.post(
      `${API_URL}getDataRiwayatDompet.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};
