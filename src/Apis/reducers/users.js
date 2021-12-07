import {Types} from '../actions/users';

const initialState = {
  login: false,
  items: '',
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
    default:
      return state;
  }
};
