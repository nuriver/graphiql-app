import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface graphiqlState {
  endpoint: string;
  sdl: string;
  query: string;
}

const initialState = {
  endpoint: '',
  sdl: '',
  query: '',
};

export const graphiqlSlice = createSlice({
  name: 'graphiql',
  initialState,
  reducers: {
    setGraphiqlEndpoint: (state, action: PayloadAction<string>) => {
      state.endpoint = action.payload;
      state.sdl = `${action.payload}?sdl`;
    },
  },
});

export const { setGraphiqlEndpoint } = graphiqlSlice.actions;
export default graphiqlSlice.reducer;
