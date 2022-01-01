import axios from 'axios';
import {API_URL} from '../../../config/env';

export const forgotPaswword = async user_email => {
  try {
    const data = {
      user_email: user_email,
    };
    const Response = await axios.post(
      `${API_URL}act_forgot_password.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};

export const getOTPEmail = async (user_email, kode_otp) => {
  try {
    const data = {user_email: user_email, kode_otp: kode_otp};
    const Response = await axios.post(`${API_URL}act_check_OTPEmail.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};

// act_change_password.php

export const change_password = async (id_token, user_password) => {
  try {
    const data = {id_token: id_token, user_password: user_password};
    const Response = await axios.post(
      `${API_URL}act_change_password.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error);
  }
};
// getDataLembaga.php

export const getDataLembaga = async () => {
  try {
    const Response = await axios.get(`${API_URL}getDataLembaga.php`);
    return Response;
  } catch (error) {
    console.log(error);
  }
};

export const getProvinsi = async () => {
  try {
    const data = {id_negara: '62'};
    const Response = await axios.post(`${API_URL}getProvinsi.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};

export const getKabupaten = async id_prov => {
  try {
    const data = {id_prov: id_prov};
    const Response = await axios.post(`${API_URL}getKabupaten.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};
// getKecamatan.php
export const getKecamatan = async id_kab => {
  try {
    const data = {id_kab: id_kab};
    const Response = await axios.post(`${API_URL}getKecamatan.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};
// getKelurahan.php
export const getKelurahan = async id_kec => {
  try {
    const data = {id_kec: id_kec};
    const Response = await axios.post(`${API_URL}getKelurahan.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};

// getRW.php
export const getRW = async id_kel => {
  try {
    const data = {id_kel: id_kel};
    const Response = await axios.post(`${API_URL}getRW.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};

// getRT.php
export const getRT = async id_rw => {
  try {
    const data = {id_rw: id_rw};
    const Response = await axios.post(`${API_URL}getRT.php`, data);
    return Response;
  } catch (error) {
    console.log(error);
  }
};

// act_reguserAndroidLembaga.php

export const RegisterLembaga = async (
  user_fullname,
  user_email,
  user_nohp,
  user_password,
  code_ref,
  id_level,
  id_prov,
  id_kab,
  id_kec,
  id_kel,
  id_rw,
  id_rt,
  lat,
  long,
) => {
  try {
    const data = {
      user_fullname: user_fullname,
      user_email: user_email,
      user_nohp: user_nohp,
      user_password: user_password,
      code_ref: code_ref,
      id_level: id_level,
      id_prov: id_prov,
      id_kab: id_kab,
      id_kec: id_kec,
      id_kel: id_kel,
      id_rw: id_rw,
      id_rt: id_rt,
      lat: lat,
      long: long,
    };
    const Response = await axios.post(
      `${API_URL}act_reguserAndroidLembaga.php`,
      data,
    );
    return Response;
  } catch (error) {
    console.log(error.reponse.data);
  }
};
