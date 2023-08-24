import { createSlice } from "@reduxjs/toolkit";

const locationDataStoreSlice = createSlice({
  name: "locationDataStoreSlice",
  initialState: {
    locationData: {},
  },
  reducers: {
    setLocationDataToStore: (state, action) => {
      state.locationData = action.payload;
    },
  },
});

export const { setLocationDataToStore } = locationDataStoreSlice.actions;

export default locationDataStoreSlice.reducer;
