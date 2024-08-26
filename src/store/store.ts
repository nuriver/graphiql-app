import { configureStore } from '@reduxjs/toolkit';
import headersReducer from './headersSlice';
import type { HeadersState } from './headersSlice';

const store = configureStore({
  reducer: {
    headers: headersReducer,
  },
});

export type RootState = {
  headers: HeadersState;
};
export type AppDispatch = typeof store.dispatch;

export default store;
