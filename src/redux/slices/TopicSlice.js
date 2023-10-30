import { createSlice } from "@reduxjs/toolkit";

const topicSlice = createSlice({
  name: "topic",
  initialState: {
    topics: [],
  },
  reducers: {
    addTopic: (state, action) => {
      state.topics.push(action.payload);
    },
    removeTopic: (state, action) => {
      state.topics = state.topics.filter((topic) => topic !== action.payload);
    },
  },
});

export const { addTopic, removeTopic } = topicSlice.actions;
export default topicSlice.reducer;
