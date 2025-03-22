import { userReducer } from "@/features/user/user.slice";
import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";

const store = configureStore({
  reducer: {
    user: userReducer,
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware({
      serializableCheck: false,
      /** Disables the serializability check in Redux Toolkit.
      This is useful when dealing with non-serializable values (e.g., Promises, functions, or class instances) inside actions or the Redux store. */
    });
  },
  devTools: import.meta.env.DEV ? true : false,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

//? hooks
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
export default store;
