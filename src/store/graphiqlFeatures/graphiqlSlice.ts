import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { GraphiqlHeader, GraphiqlState } from '../../core/types';

const initialState: GraphiqlState = {
  endpoint: '',
  sdl: '',
  query: '',
  variables: '',
  headers: [{ id: nanoid(), key: '', value: '' }],
  url: '',
};

export const graphiqlSlice = createSlice({
  name: 'graphiql',
  initialState,
  reducers: {
    setGraphiqlEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
      state.sdl = `${action.payload}?sdl`;
      if (action.payload === '') {
        state.sdl = '';
      }
    },
    setGraphiqlSdl: (state, action: PayloadAction<string>) => {
      state.sdl = action.payload;
    },
    addGraphiqlHeader: (state) => {
      state.headers.push({ id: nanoid(), key: '', value: '' });
    },
    updateGraphiqlHeader: (state, action: PayloadAction<GraphiqlHeader>) => {
      const { id, key, value } = action.payload;
      const header = state.headers.find((header) => header.id === id);
      if (header) {
        header.key = key;
        header.value = value;
      }
      console.log(state.headers);
    },
    clearGraphiqlHeaders: (state) => {
      state.headers = [{ id: nanoid(), key: '', value: '' }];
    },
    setGraphiqlQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setGraphiqlVariables: (state, action: PayloadAction<string>) => {
      state.variables = action.payload;
      if (action.payload === '') {
        state.variables = '{}';
      }
    },
    setGraphiqlUrl: (state, action: PayloadAction<string>) => {
      state.url = action.payload;
    },
    resetGraphiqlStore: () => {
      return {
        endpoint: '',
        sdl: '',
        query: '',
        variables: '',
        headers: [{ id: nanoid(), key: '', value: '' }],
        url: '',
      };
    },
    setGraphiqlStore: (state, action: PayloadAction<GraphiqlState>) => {
      return { ...state, ...action.payload };
    },
  },
});

export const {
  setGraphiqlEndpoint,
  setGraphiqlSdl,
  addGraphiqlHeader,
  updateGraphiqlHeader,
  clearGraphiqlHeaders,
  setGraphiqlQuery,
  setGraphiqlVariables,
  setGraphiqlUrl,
  resetGraphiqlStore,
  setGraphiqlStore,
} = graphiqlSlice.actions;
export default graphiqlSlice.reducer;
