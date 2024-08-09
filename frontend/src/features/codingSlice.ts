import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {decodeMessage, encodeMessage} from './codingThunks';

export interface CodingState {
  encode: string;
  decode: string;
  password: string;
  loadingEncoded: boolean;
  loadingDecoded: boolean;
}

const initialState: CodingState = {
  encode: '',
  decode: '',
  password: '',
  loadingEncoded: false,
  loadingDecoded: false,
};

const codingSlice = createSlice({
  name: 'coding',
  initialState,
  reducers: {
    setPassword: (state, action:PayloadAction<string>) => {
      state.password = action.payload;
    },
    setEncode: (state, action:PayloadAction<string>) => {
      state.encode = action.payload;
    },
    setDecode: (state, action:PayloadAction<string>) => {
      state.decode = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(encodeMessage.pending, (state) => {
        state.loadingEncoded = true;
      }).addCase(encodeMessage.fulfilled, (state, action) => {
        state.encode = '';
        state.decode = action.payload.encoded;
        state.loadingEncoded = false;
      }).addCase(encodeMessage.rejected, (state) => {
        state.loadingEncoded = false;
      })
    builder.addCase(decodeMessage.pending, (state) => {
        state.loadingDecoded = true;
      }).addCase(decodeMessage.fulfilled, (state, action) => {
        state.decode = '';
        state.encode = action.payload.decoded;
        state.loadingDecoded = false;
      }).addCase(decodeMessage.rejected, (state) => {
        state.loadingDecoded = false;
      });
  },
  selectors: {
    selectEncode: (state) => state.encode,
    selectDecode: (state) => state.decode,
    selectPassword: (state) => state.password,
    selectLoadingEncoded: (state) => state.loadingEncoded,
    selectLoadingDecoded: (state) => state.loadingDecoded,
  }
});

export const codingReducer = codingSlice.reducer;

export const {
  setPassword,
  setEncode,
  setDecode
} = codingSlice.actions;

export const {
  selectEncode,
  selectDecode,
  selectPassword,
  selectLoadingDecoded,
  selectLoadingEncoded
} = codingSlice.selectors;