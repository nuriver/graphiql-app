import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RestfulState, ResponseState } from '../core/types';
export interface RestfulHeader {
  headerKey: string;
  headerValue: string;
}

export interface HeadersState {
  headers: RestfulHeader[];
}
const initialState: RestfulState = {
  method: 'GET',
  endpoint: '',
  body: '',
  headers: [],
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
    removeHeader(state, action: PayloadAction<number>) {
      state.headers = state.headers.filter(
        (_, index) => index !== action.payload
      );
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
      console.log('Adding URL to restfulUrls:', action.payload);
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
} = RestfulSlice.actions;

export default RestfulSlice.reducer;
// import { createSlice, PayloadAction } from '@reduxjs/toolkit';
// import { RestfulState, ResponseState } from '../core/types';

// export interface RestfulHeader {
//   headerKey: string;
//   headerValue: string;
// }

// export interface HeadersState {
//   headers: RestfulHeader[];
// }

// const initialState: RestfulState = {
//   method: 'GET',
//   headers: [],
//   endpoint: '',
//   body: '',
//   variables: '',
//   url: '',
// };

// const RestfulSlice = createSlice({
//   name: 'RestfulSlice',
//   initialState,
//   reducers: {
//     addHeader(state, action) {
//       state.headers.push(action.payload);
//     },
//     removeHeader(state, action: PayloadAction<number>) {
//       state.headers = state.headers.filter(
//         (_, index) => index !== action.payload
//       );
//     },
//     setRestfulMethod: (state, action) => {
//       state.method = action.payload;
//     },
//     setRestfulEndpoint: (state, action: PayloadAction<string>) => {
//       state.endpoint = action.payload;
//     },
//     setRestfulBody: (state, action) => {
//       state.body = action.payload;
//     },
//     setRestfulVariables: (state, action) => {
//       state.variables = action.payload;
//       if (action.payload === '') {
//         state.variables = '{}';
//       }
//     },

//     setRestfulUrl: (state, action) => {
//       console.log('Adding URL to restfulUrls:', action.payload);
//       state.url = action.payload;
//     },
//     resetRestfulStore: () => {
//       return {
//         method: 'GET',
//         endpoint: '',
//         body: '',
//         variables: '',
//         headers: [],
//         url: '',
//       };
//     },
//     setRestfulStore: (state, action: PayloadAction<RestfulState>) => {
//       return action.payload;
//     },
//     setResponse(state, action: PayloadAction<ResponseState>) {
//       state.response = action.payload;
//     },
//   },
// });

// export const {
//   addHeader,
//   removeHeader,
//   setRestfulMethod,
//   setRestfulEndpoint,
//   setRestfulBody,
//   setRestfulVariables,
//   setRestfulUrl,
//   resetRestfulStore,
//   setRestfulStore,
//   setResponse
// } = RestfulSlice.actions;
// export default RestfulSlice.reducer;
