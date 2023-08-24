import { configureStore } from "@reduxjs/toolkit";
import locationDataStoreSlice from "./locationDataStoreSlice.js";

const store = configureStore({
  reducer: {
    locationDataStoreSlice,
  },
});

export default store;
