import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user';
import { User } from '../data/users';

export type State = {
  user: User;
};

export const store = configureStore({
  reducer: {
    user: userSlice.reducer,
  },
  devTools: true,
});
