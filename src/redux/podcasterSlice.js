import { createSlice } from "@reduxjs/toolkit";

const status = {
  ZERO: "ZERO",
  UPDATED: "UPDATED",
  OUTDATED: "OUTDATED",
}

const initialState = {
  status: status.ZERO,
  podcastList: [],
  lastUpdate: null,
};

export const podcasterSlice = createSlice({
  name: "podcaster",
  initialState,
  reducers: {
    updatePodcaster: (state, action) => {
      const { podcastList, lastUpdate } = action.payload;
      state.podcastList = podcastList;
      state.lastUpdate = lastUpdate;
      state.status = status.UPDATED;
    },
  },
});

const { updatePodcaster } = podcasterSlice.actions;

export {
  updatePodcaster,
  status,
} 
export default podcasterSlice.reducer;