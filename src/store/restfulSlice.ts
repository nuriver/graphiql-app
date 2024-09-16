import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { RestfulState, ResponseState, RestfulHeader } from '../core/types';

const initialState: RestfulState = {
  method: 'GET',
  endpoint: '',
  body: '',
  headers: [{ id: nanoid(), key: '', value: '' }],
  variables: '',
  url: '',
  response: null,
};

const RestfulSlice = createSlice({
  name: 'RestfulSlice',
  initialState,
  reducers: {
    addHeader(state, action) {
      state.headers.push(action.payload);
    },
    addRestfulHeader: (state) => {
      state.headers.push({ id: nanoid(), key: '', value: '' });
    },
    removeHeader(state, action: PayloadAction<number>) {
      state.headers = state.headers.filter(
        (_, index) => index !== action.payload
      );
    },
    updateRestfulHeader: (state, action: PayloadAction<RestfulHeader>) => {
      const { id, key, value } = action.payload;
      const header = state.headers.find((header) => header.id === id);
      if (header) {
        header.key = key;
        header.value = value;
      }
    },
    setRestfulMethod(state, action: PayloadAction<string>) {
      state.method = action.payload;
    },
    setRestfulEndpoint(state, action: PayloadAction<string>) {
      state.endpoint = action.payload;
    },
    setRestfulBody(state, action: PayloadAction<string>) {
      state.body = action.payload;
    },
    setRestfulVariables(state, action: PayloadAction<string>) {
      state.variables = action.payload || '{}';
    },
    setRestfulUrl(state, action: PayloadAction<string>) {
      state.url = action.payload;
    },
    resetRestfulStore() {
      return initialState;
    },
    setRestfulStore(state, action: PayloadAction<RestfulState>) {
      return { ...state, ...action.payload };
    },
    setResponse(state, action: PayloadAction<ResponseState>) {
      state.response = action.payload;
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
  setResponse,
  addRestfulHeader,
  updateRestfulHeader,
} = RestfulSlice.actions;

export default RestfulSlice.reducer;
