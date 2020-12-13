import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import logger from 'redux-logger'
import counterReducer from '../features/counter/counterSlice';
import companyReducer from '../features/company/companySlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    company: companyReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
