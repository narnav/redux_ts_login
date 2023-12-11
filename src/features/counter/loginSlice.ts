import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState, AppThunk } from '../../app/store';
import { login } from './loginAPI';


export interface loginState {
  username: string;
  password:string
  status: 'idle' | 'loading' | 'failed';
  token:string
  logged:boolean
}

const initialState: loginState = {
    username: '',
    password: '',
    status: 'idle',
    token: '',
    logged: false
};

export const loginAsync = createAsyncThunk(
  'login/login',
  async (credentials: { username: string; password: string }) => {
    const response = await login(credentials);
    return response.data;
  }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    increment: (state) => {
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state,action) => {
        state.token=action.payload.access
        state.logged=true
        state.status = 'loading';
      })
  },
});

export const { increment } = loginSlice.actions;
export const selectstatus = (state: RootState) => state.login.status;
export const selectLogged = (state: RootState) => state.login.logged;
export const selectToken = (state: RootState) => state.login.token;
export default loginSlice.reducer;
