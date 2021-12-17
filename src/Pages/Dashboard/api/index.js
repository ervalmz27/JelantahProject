import axios from 'axios';
import {API_URL} from '../../../config/env';

export const Datainfo = async id_token => {
  try {
    const data = {id_token: id_token};

    const info = await axios.post(`${API_URL}getDataInfo.php`, data);
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
    const info = await axios.post(`${API_URL}act_loginAndroid.php`, data);
    return info;
  } catch (error) {
    console.log('Message Error : ', error);
  }
};

// export const Notif = async id_token => {
//   try {
//     const data = {id_token: id_token};
//     const notif = await axios.post(`${API_URL}getDataInfoPesan.php`, data);
//     return notif;
//   } catch (error) {
//     console.log('Message Error : ', error);
//   }
// };
