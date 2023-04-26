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
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

//TODO: save data in userStorage

const { updatePodcaster, updateStatus } = podcasterSlice.actions;

export {
  updatePodcaster,
  updateStatus,
  status,
} 
export default podcasterSlice.reducer;