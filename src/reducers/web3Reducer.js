import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  signer: "",
  contract: "",
  account: "",
};

export const web3Slice = createSlice({
  name: "webthree",
  initialState,
  reducers: {
    storeSigner: (state, action) => {
      state.signer = action.payload.signer;
      state.account = action.payload.account;
    },
    storeContract: (state, action) => {
      state.contract = action.payload;
    },
  },
});

export const { storeSigner, storeContract } = web3Slice.actions;

export default web3Slice.reducer;
