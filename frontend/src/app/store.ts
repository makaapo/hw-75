import {configureStore} from '@reduxjs/toolkit';
import {codingReducer} from '../features/codingSlice';

export const store = configureStore({
  reducer: {
    coding: codingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;