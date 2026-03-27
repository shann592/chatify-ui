import { configureStore } from "@reduxjs/toolkit";
import { chatifyApi } from "../api/chatify.api";

export const store = configureStore({
  reducer: {
    [chatifyApi.reducerPath]: chatifyApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(chatifyApi.middleware),
});
