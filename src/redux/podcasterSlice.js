import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import moment from "moment/moment";
import { requestPodcastList, requestPodcastEpisodes } from "../services/podcastService";
import { savePodcastListInLocalStorage } from "../utils/utils";

const initialState = {
  podcastList: [],
  lastUpdate: null,
};

const updatePodcaster = createAsyncThunk(
  'podcaster/fetchPodcastList',
  async (thunkAPI) => {
    return await requestPodcastList();
  }
)

const updatePodcastEpisodes = createAsyncThunk(
  'podcaster/fetchPodcastEpisodes',
  async (podcastId, thunkAPI) => {
    return {
      podcastId,
      response: await requestPodcastEpisodes(podcastId)
    };
  }
) 



export const podcasterSlice = createSlice({
  name: "podcaster",
  initialState,
  reducers: {
    savePodcastList: (state, action) => {
      state.podcastList = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(updatePodcaster.fulfilled, (state, action) => {
      const podcastList = action.payload;
      if (podcastList) {
        const lastUpdateDate = moment().valueOf();
        state.podcastList = podcastList;
        state.lastUpdate = lastUpdateDate;
        savePodcastListInLocalStorage(podcastList, lastUpdateDate);
      }
    });
    builder.addCase(updatePodcastEpisodes.fulfilled, (state, action) => {
      const {podcastId, response: podcastEpisodeList} = action.payload;
      if (podcastEpisodeList) {
        const podcastIndexToUpdate = state.podcastList.findIndex((podcast) => podcast.id === podcastId);
        if (podcastIndexToUpdate !== -1) {
          const copyOfPodcastList = state.podcastList,
            lastUpdateDate = moment().valueOf();
          copyOfPodcastList[podcastIndexToUpdate] = {
            ...copyOfPodcastList[podcastIndexToUpdate],
            podcastEpisodeList,
            podcastEpisodeListLastUpdate: lastUpdateDate,
          }
          state.podcastList = copyOfPodcastList;
          savePodcastListInLocalStorage(copyOfPodcastList, lastUpdateDate);
        }
      }
    });
  } 
});




const { savePodcastList } = podcasterSlice.actions;

export {
  savePodcastList,
  updatePodcaster,
  updatePodcastEpisodes,
} 
export default podcasterSlice.reducer;