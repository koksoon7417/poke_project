import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  login, register,
} from '../../services';
import { AuthType } from '../../types';

const initialState: AuthType = {
  access: localStorage.getItem('access') || '',
  refresh: localStorage.getItem('refresh') || '',
};

export const loginAsync = createAsyncThunk(
  'auth/login',
  async (crendential: { username: string, password: string }) => {
    return login(crendential);
  }
);

export const registerAsync = createAsyncThunk(
  'auth/register',
  async (crendential: { username: string, password: string }) => {
    return register(crendential);;
  }
);

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signout: (state) => {
      localStorage.clear();

      return {
        ...state,
        access: '',
        refresh: ''
      };
    },
    seesionOut: (state) => {
      localStorage.clear();
      alert('Session timeout. Please log in again.')

      return {
        ...state,
        access: '',
        refresh: ''
      };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginAsync.fulfilled, (state, action) => {
        localStorage.setItem('access', action.payload.access);
        localStorage.setItem('refresh', action.payload.refresh);

        return action.payload;
      })
      .addCase(loginAsync.rejected, (state, action) => {
        alert('Wrong username/ password!');
      })
      .addCase(registerAsync.fulfilled, (state, action) => {
        alert('Thanks for your registration.');
      })
      .addCase(registerAsync.rejected, (state, action) => {
        alert('wrong input');
      });
  },
});

export const { signout, seesionOut } = authSlice.actions;

export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
