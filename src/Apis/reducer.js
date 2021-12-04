import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';

const initialState = {
  email: 'eve.holt@reqres.in',
  password: 'cityslicka',
};

const reducer = (state = initialState, action) => {
  return state;
};

export default reducer;
