import { createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";

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
      state.podcastList = action.payload;
      state.lastUpdate = moment().valueOf();
      state.status = status.UPDATED;
    },
    updateStatus: (state, action) => {
      state.status = action.payload;
    },
  },
});

const { updatePodcaster, updateStatus } = podcasterSlice.actions;

export {
  updatePodcaster,
  updateStatus,
  status,
} 
export default podcasterSlice.reducer;