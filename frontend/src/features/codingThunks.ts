import {createAsyncThunk} from '@reduxjs/toolkit';
import axiosApi from '../axiosApi';

interface Encode {
  encoded: string;
}

interface Decode {
  decoded: string;
}

interface Data {
  password: string;
  message: string;
}

export const encodeMessage = createAsyncThunk<Encode, Data>(
  'encoding/encodeMessage',
  async (messageWithPassword) => {
    const {data} = await axiosApi.post<Encode>('/encode', messageWithPassword);
    return data;
  }
);

export const decodeMessage = createAsyncThunk<Decode, Data>(
  'encoding/decodeMessage',
  async (messageWithPassword) => {
    const {data} = await axiosApi.post<Decode>('/decode', messageWithPassword);
    return data;
  }
);
