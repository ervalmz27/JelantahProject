import axios from 'axios';
import {API_URL} from '../../../config/env';

// act_editNama.php
export const editNama = async (id_token, user_nama) => {
  try {
    const data = {id_token: id_token, user_nama: user_nama};
    const info = await axios.post(`${API_URL}act_editNama.php`, data, {
      header: {
        Authorization: 'Bearer 9J9NSaKq9eK7UqGWxT07042027072118',
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message error : ', error);
    throw error;
  }
};
export const editGender = async (id_token, id_gender) => {
  try {
    const data = {id_token: id_token, id_gender: id_gender};
    const info = await axios.post(`${API_URL}act_editGender.php`, data, {
      header: {
        Authorization: 'Bearer 9J9NSaKq9eK7UqGWxT07042027072118',
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message error : ', error);
    throw error;
  }
};
// act_editDOB.php
export const editDOB = async (id_token, tgl_lahir) => {
  try {
    const data = {id_token: id_token, tgl_lahir: tgl_lahir};
    const info = await axios.post(`${API_URL}act_editDOB.php`, data, {
      header: {
        Authorization: 'Bearer 9J9NSaKq9eK7UqGWxT07042027072118',
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message error : ', error);
    throw error;
  }
};
export const changePP = async (id_token, image) => {
  try {
    const data = {id_token: id_token, image: image};
    const info = await axios.post(`${API_URL}act_changePP.php`, data, {
      header: {
        Authorization: 'Bearer 9J9NSaKq9eK7UqGWxT07042027072118',
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message error : ', error);
    throw error;
  }
};

// act_change_hp.php

export const editHP = async (id_token, no_hp) => {
  try {
    const data = {id_token: id_token, no_hp: no_hp};
    const info = await axios.post(`${API_URL}act_change_nohp.php`, data, {
      header: {
        Authorization: 'Bearer 9J9NSaKq9eK7UqGWxT07042027072118',
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message error : ', error);
    throw error;
  }
};

// act_check_OTPHP.php

export const check_OTPHP = async (id_token, kode_otp) => {
  try {
    const data = {id_token: id_token, kode_otp: kode_otp};
    const info = await axios.post(`${API_URL}act_check_OTPHP.php`, data, {
      header: {
        Authorization: 'Bearer 9J9NSaKq9eK7UqGWxT07042027072118',
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message error : ', error);
    throw error;
  }
};

// act_change_hp.php  (Verifikasi OTP Email)

export const OtpEmail = async user_email => {
  try {
    const data = {user_email: user_email};
    const info = await axios.post(`${API_URL}act_change_hp.php`, data, {
      header: {
        Authorization: 'Bearer 9J9NSaKq9eK7UqGWxT07042027072118',
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message error : ', error);
    throw error;
  }
};
