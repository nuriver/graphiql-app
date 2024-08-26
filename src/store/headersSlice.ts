import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Header {
  headerKey: string;
  headerValue: string;
}

export interface HeadersState {
  headers: Header[];
}

const initialState: HeadersState = {
  headers: [],
};

const headersSlice = createSlice({
  name: 'headers',
  initialState,
  reducers: {
    addHeader(state, action: PayloadAction<Header>) {
      state.headers.push(action.payload);
    },
    removeHeader(state, action: PayloadAction<number>) {
      state.headers = state.headers.filter(
        (_, index) => index !== action.payload
      );
    },
  },
});

export const { addHeader, removeHeader } = headersSlice.actions;
export default headersSlice.reducer;
