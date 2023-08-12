import { configureStore } from "@reduxjs/toolkit";
import authreducer from "./authReducer";
import historyreducer from "./historyReducer";

export const store = configureStore({
  reducer: {
    authreducer: authreducer,
    historyreducer: historyreducer,
  },
});
