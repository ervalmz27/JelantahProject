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
