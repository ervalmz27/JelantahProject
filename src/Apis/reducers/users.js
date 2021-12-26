import {Types} from '../actions/users';

const initialState = {
  login: [],
  items: '',
  dashboard: [],
  qrcodeJadwal: [],
};

export const usersReducer = (state = initialState, action) => {
  switch (action.type) {
    case Types.GET_USERS_SUCCESS:
      return {
        ...state,
        items: action.payload.items,
      };
    case Types.LOGIN_SUCCESS:
      return {
        ...state,
        login: action.payload,
      };
    case Types.DASHBOARD_SUCCESS:
      return {
        ...state,
        dashboard: action.payload,
      };
    case Types.QRCODE_SUCCESS:
      return {
        ...state,
        qrcodeJadwal: action.payload,
      };
    default:
      return state;
  }
};
