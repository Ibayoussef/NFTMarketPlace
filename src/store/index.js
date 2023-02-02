import { configureStore } from "@reduxjs/toolkit";
import web3Reducer from "../reducers/web3Reducer";

export const store = configureStore({
  reducer: {
    web3: web3Reducer,
  },
});
