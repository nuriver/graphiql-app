import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RestfulState } from '../core/types';

export interface RestfulHeader {
  headerKey: string;
  headerValue: string;
}

export interface HeadersState {
  headers: RestfulHeader[];
}

const initialState: RestfulState = {
  method: 'GET',
  headers: [],
  endpoint: '',
  body: '',
  variables: '',
  url: '',
};

const RestfulSlice = createSlice({
  name: 'RestfulSlice',
  initialState,
  reducers: {
    addHeader(state, action) {
      state.headers.push(action.payload);
    },
    removeHeader(state, action: PayloadAction<number>) {
      state.headers = state.headers.filter(
        (_, index) => index !== action.payload
      );
    },
    setRestfulMethod: (state, action) => {
      state.method = action.payload;
    },
    setRestfulEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
    },
    setRestfulBody: (state, action) => {
      state.body = action.payload;
    },
    setRestfulVariables: (state, action) => {
      state.variables = action.payload;
      if (action.payload === '') {
        state.variables = '{}';
      }
    },

    setRestfulUrl: (state, action) => {
      console.log('Adding URL to restfulUrls:', action.payload);
      state.url = action.payload;
    },
    resetRestfulStore: () => {
      return {
        method: 'GET',
        endpoint: '',
        body: '',
        variables: '',
        headers: [],
        url: '',
      };
    },
    setRestfulStore: (state, action: PayloadAction<RestfulState>) => {
      return action.payload;
    },
  },
});

export const {
  addHeader,
  removeHeader,
  setRestfulMethod,
  setRestfulEndpoint,
  setRestfulBody,
  setRestfulVariables,
  setRestfulUrl,
  resetRestfulStore,
  setRestfulStore,
} = RestfulSlice.actions;
export default RestfulSlice.reducer;
