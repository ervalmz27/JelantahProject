import axios from 'axios';
import {API_URL} from '../../config/env';

export const getWidraw = async (
  id_token,
  jumlah_withdraw,
  isBankOrDgm,
  idBankOrDgm,
) => {
  try {
    const data = {
      id_token: id_token,
      jumlah_withdraw: jumlah_withdraw,
      isBankOrDgm: isBankOrDgm,
      idBankOrDgm: idBankOrDgm,
    };
    const Response = await axios.post(`${API_URL}act_withdraw.php`, data, {
      header: {
        Authorization: 'Bearer 9J9NSaKq9eK7UqGWxT07042027072118',
        'Content-Type': 'application/json',
      },
    });
    return Response;
  } catch (error) {
    console.log(error);
  }
};
