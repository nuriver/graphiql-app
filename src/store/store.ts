import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector, useStore } from 'react-redux';
import headersReducer from './headersSlice';
import graphiqlReducer from './graphiqlFeatures/graphiqlSlice';

const rootReducer = combineReducers({
  headers: headersReducer,
  graphiql: graphiqlReducer,
});

export const setupStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
};

export const makeStore = () => {
  return configureStore({
    reducer: rootReducer,
    devTools: true,
  });
};

export type AppState = ReturnType<AppStore['getState']>;
export type AppStore = ReturnType<typeof makeStore>;
export type AppDispatch = AppStore['dispatch'];
export type RootState = ReturnType<typeof rootReducer>;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export const useAppStore = useStore.withTypes<AppStore>();

// import { configureStore } from '@reduxjs/toolkit';
// import headersReducer from './headersSlice';
// import type { HeadersState } from './headersSlice';

// const store = configureStore({
//   reducer: {
//     headers: headersReducer,
//   },
// });

// export type RootState = {
//   headers: HeadersState;
// };
// export type AppDispatch = typeof store.dispatch;

// export default store;
