import { RootState } from "@/store/store";
import { IUser } from "@/types/types";
import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface IUserSlice {
  activeUser: IUser | null;
}

const initialState: IUserSlice = {
  activeUser: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    addUser(state: IUserSlice, action: PayloadAction<IUser>) {
      state.activeUser = action.payload;
    },
    removeUser(state: IUserSlice) {
      state.activeUser = null;
    },
  },
});

export const { addUser, removeUser } = userSlice.actions;
export const userReducer = userSlice.reducer;

const userState = (state: RootState) => state.user;

export const getLoggedInUser = createSelector([userState], (u) => u.activeUser);
