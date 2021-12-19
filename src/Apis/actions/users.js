export const Types = {
  GET_USERS_REQUEST: 'GET_USERS_REQUEST',
  GET_USERS_SUCCESS: 'GET_USERS_SUCCESS',
  LOGIN_SUCCESS: 'GET_TOKEN',
  DASHBOARD_SUCCESS: 'GET_MITRA',
};

export const getUsersRequest = () => ({
  type: Types.GET_USERS_REQUEST,
});

export const getUsersSuccess = items => ({
  type: Types.GET_USERS_SUCCESS,
  payload: {items},
});
export const getLoginUsers = items => ({
  type: Types.LOGIN_SUCCESS,
  payload: items,
});
export const getDashboarUsers = items => ({
  type: Types.DASHBOARD_SUCCESS,
  payload: items,
});
