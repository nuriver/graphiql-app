import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface graphiqlState {
  endpoint: string;
  sdl: string;
  query: string;
  variables: string;
  headers: graphiqlHeader[];
  url: string;
}

interface graphiqlHeader {
  id: string;
  key: string;
  value: string;
}

const initialState: graphiqlState = {
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
    updateGraphiqlHeader: (state, action) => {
      const { id, key, value } = action.payload;
      const header = state.headers.find((header) => header.id === id);
      if (header) {
        header.key = key;
        header.value = value;
      }
    },
    clearGraphiqlHeaders: (state) => {
      state.headers = [{ id: nanoid(), key: '', value: '' }];
    },
    setGraphiqlQuery: (state, action) => {
      state.query = action.payload;
    },
    setGraphiqlVariables: (state, action) => {
      state.query = action.payload;
      if (action.payload === '') {
        state.variables = '{}';
      }
    },
    setGraphiqlUrl: (state, action) => {
      state.url = action.payload;
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
} = graphiqlSlice.actions;
export default graphiqlSlice.reducer;
