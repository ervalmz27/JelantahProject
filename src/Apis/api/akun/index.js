import axios from 'axios';
import {API_URL} from '../../../config/env';

export const verifikasiPassword = async (id_token, user_password) => {
  try {
    const data = {id_token: id_token, user_password: user_password};
    const info = await axios.post(
      `${API_URL}act_verifikasi_password.php`,
      data,
      {
        header: {
          'Content-Type': 'application/json',
        },
      },
    );
    return info;
  } catch (error) {
    console.log('Message error : ', error);
    throw error;
  }
};
