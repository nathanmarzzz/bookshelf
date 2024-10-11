import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../data/users';

export type UserState = {
  user: Partial<User> | User | null;
};
const initUserState = {
  user: null,
};

export const userSlice = createSlice({
  name: 'user',
  initialState: initUserState,
  reducers: {
    setUser: (
      state: UserState,
      action: PayloadAction<{ user: Partial<User> }>,
    ) => {
      const { user } = action.payload;
      state.user = user;
    },
  },
});

const { actions, reducer } = userSlice;
export const { setUser } = actions;
