import axios from 'axios';
import {API_URL} from '../../config/env';

export const Datainfo = async id_token => {
  try {
    const data = {id_token: id_token};

    const info = await axios.post(`${API_URL}getDataInfo.php`, data, {
      header: {
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message Error :', error);
  }
};

export const DataProfile = async (user_id, user_password) => {
  try {
    const data = {
      user_id: user_id,
      user_password: user_password,
    };
    const info = await axios.post(`${API_URL}act_loginAndroid.php`, data, {
      header: {
        'Content-Type': 'application/json',
      },
    });
    return info;
  } catch (error) {
    console.log('Message Error : ', error);
  }
};

export const getDataRTNearby = async (id_token, lat, long) => {
  try {
    const data = {id_token: id_token, nlat: lat, nlong: long};
    const Response = await axios.post(`${API_URL}getDataRTNearby.php`, data, {
      header: {
        'Content-Type': 'application/json',
      },
    });
    return Response;
  } catch (error) {
    console.log('Message Error', error);
  }
};

export const getDataInfoPesanDetail = async id_token => {
  try {
    const data = {id_token: id_token};
    const Response = await axios.post(`${API_URL}getDataPesan.php`, data, {
      header: {
        'Content-Type': 'application/json',
      },
    });
    return Response;
  } catch (error) {
    console.log('Message Error', error);
  }
};

export const getStatistik = async id_token => {
  try {
    const Token = {
      id_token: id_token,
    };
    const Response = await axios.post(`${API_URL}getDataStatistik.php`, Token);
    return Response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};

// getDataProfile.php

export const getDataProfil = async id_token => {
  try {
    const Token = {
      id_token: id_token,
    };
    const Response = await axios.post(`${API_URL}getDataProfile.php`, Token);
    return Response;
  } catch (error) {
    console.log(error);
    throw error;
  }
};
