import { configureStore } from "@reduxjs/toolkit";
import signUpReducer from "@/redux/features/signup/signupSlice";
import blogBuilderReducer from "@/redux/features/builders/blogBuilderSlice";

export const store = configureStore({
  reducer: {
    signUp: signUpReducer,
    blogBuilder: blogBuilderReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export default store;
