import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';

interface graphiqlState {
  endpoint: string;
  sdl: string;
  query: string;
  headers: graphiqlHeader[];
}

interface graphiqlHeader {
  id: string;
  key: string;
  value: string;
}

const initialState = {
  endpoint: '',
  sdl: '',
  query: '',
  headers: [{ id: nanoid(), key: '', value: '' }],
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
      console.log(state.query);
    },
    setGraphiqlVariables: (state, action) => {
      state.query = action.payload;
      console.log(state.query);
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
} = graphiqlSlice.actions;
export default graphiqlSlice.reducer;
