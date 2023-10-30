import { configureStore } from "@reduxjs/toolkit";
import BlogSlice from "./slices/BlogSlice";
import CategorySlice from "./slices/CategorySlice";
import TopicSlice from "./slices/TopicSlice";

const store = configureStore({
  reducer: {
    blog: BlogSlice,
    category: CategorySlice,
    topic: TopicSlice,
  },
});

export default store;
