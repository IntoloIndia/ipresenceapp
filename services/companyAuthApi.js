import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  setCompanyId,
  removeCompanyId,
  storeToken,
  removeToken,
} from './asyncStorageService';
import { API_URL } from '@env';

export const STATUSES = Object.freeze({
  IDLE: 'idle',
  ERROR: 'error',
  LOADING: 'loading',
  LOGOUT: 'logout',
});

const initialState = {
  _id: '',
  company_id: '',
  company_name: '',
  name: '',
  mobile: '',
  email: '',
  token: '',
  refresh_token: '',
  status: STATUSES.IDLE,
};

export const companySlice = createSlice({
  name: 'company_auth',
  initialState,
  reducers: {
    setCompanyToken: (state, action) => {
      (state._id = action.payload._id),
      (state.company_id = action.payload._id),
      (state.company_name = action.payload.company_name),
      (state.name = action.payload.name),
      (state.mobile = action.payload.mobile),
      (state.email = action.payload.email),
      (state.token = action.payload.access_token),
      (state.refresh_token = action.payload.refresh_token),
      (state.status = STATUSES.IDLE);
    },

    companyLogout: (state, action) => {
      (state._id = null),
      (state.company_id = null),
      (state.company_name = null),
      (state.name = null),
      (state.mobile = null),
      (state.email = null),
      (state.token = null),
      (state.refresh_token = null),
      (state.status = STATUSES.LOGOUT);
      // removeToken('token');
      // removeCompanyId('company_id');
    },
  },

  extraReducers: builder => {
    builder
      //login company
      .addCase(companyLogin.pending, (state, action) => {
        state.status = STATUSES.LOADING;
      })
      .addCase(companyLogin.fulfilled, (state, action) => {
        if (action.payload.status === 200) {
          state.status = STATUSES.IDLE;
          state._id = action.payload._id;
          state.company_id = action.payload.company_id;
          state.company_name = action.payload.company_name;
          state.name = action.payload.name;
          state.mobile = action.payload.mobile;
          state.email = action.payload.email;
          state.token = action.payload.access_token;
          state.refresh_token = action.payload.refresh_token;
          // setCompanyId(action.payload._id);
          // storeToken(action.payload.access_token);
        }
      })
      .addCase(companyLogin.rejected, (state, action) => {
        state.status = STATUSES.ERROR;
      });
  },
});

export const { setCompanyToken, companyLogout } = companySlice.actions;
export default companySlice.reducer;

//login company
export const companyLogin = createAsyncThunk(
  'company/login',
  async companyData => {
    const res = await fetch(API_URL + 'company-login', {
      method: 'post',
      body: JSON.stringify(companyData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = await res.json();
    return data;
  },
);
