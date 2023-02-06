import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  balance: "",
  contract: "",
  account: "",
  nfts: [],
  search: "",
  filteredNfts: [],
  filterStatus: "",
};

export const web3Slice = createSlice({
  name: "webthree",
  initialState,
  reducers: {
    storeSigner: (state, action) => {
      state.balance = action.payload.balance;
      state.account = action.payload.account;
    },
    storeContract: (state, action) => {
      state.contract = action.payload;
    },
    storeNFTS: (state, action) => {
      state.nfts = action.payload;
    },
    filterNFTs: (state, action) => {
      const filteredNfts = state.nfts.filter((nft) => {
        return nft.name.toLowerCase().includes(action.payload.toLowerCase());
      });
      state.search = action.payload;
      state.filteredNfts = filteredNfts;
    },
    storeFilterStatus: (state, action) => {
      state.filterStatus = action.payload.status;
      if (action.payload.status === "trending") {
        state.filteredNfts = state.nfts.sort(function (a, b) {
          return b.likes - a.likes;
        });
      }
      if (action.payload.status === "favorites") {
        state.filteredNfts = action.payload.filter;
      }
      if (action.payload.status === "fresh") {
        state.filteredNfts = state.nfts.sort(function (a, b) {
          return b.created - a.created;
        });
      }
      if (
        action.payload.status !== "favorites" &&
        action.payload.status !== "fresh" &&
        action.payload.status !== "trending"
      ) {
        state.filteredNfts = state.nfts.filter((nft) =>
          nft.tags.includes(action.payload.status)
        );
      }
    },
  },
});

export const {
  storeSigner,
  storeContract,
  storeNFTS,
  filterNFTs,
  storeFilterStatus,
} = web3Slice.actions;

export default web3Slice.reducer;
