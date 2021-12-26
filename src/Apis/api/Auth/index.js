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
