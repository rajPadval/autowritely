import { configureStore } from "@reduxjs/toolkit";
import BlogSlice from "./slices/BlogSlice";

const store = configureStore({
  reducer: {
    blog: BlogSlice,
  },
});

export default store;
