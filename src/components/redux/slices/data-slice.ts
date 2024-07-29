import { createSlice } from "@reduxjs/toolkit";
import { DataHandlingState } from "@redux/reducers/types";
import {
  fetchSearchDataThunk,
  fetchPopularMoviesThunk,
  fetchRatingMoviesThunk,
  fetchFavoriteListThunk,
  fetchYearArrangeMoviesThunk,
} from "./actions-slice";

const initialState: DataHandlingState = {
  genres: [],
  favoriteList: [],
  searchMovies: [],
  ratingMovies: [],
  popularMovies: [],
  yearMovies: [],
};

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: {
    fetchedFavoriteList: (state, action) => {
      state.favoriteList = action.payload;
    },
    fetchedSearchedMovies: (state, action) => {
      state.searchMovies = action.payload;
    },
    fetchedPopularMovies: (state, action) => {
      state.popularMovies = action.payload;
    },
    fetchRatingMovies: (state, action) => {
      state.ratingMovies = action.payload;
    },
    fetchYearArrangeMovies: (state, action) => {
      state.yearMovies = action.payload;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchPopularMoviesThunk.fulfilled, (state, action) => {
        state.popularMovies = action.payload;
      })
      .addCase(fetchRatingMoviesThunk.fulfilled, (state, action) => {
        state.ratingMovies = action.payload;
      })
      .addCase(fetchSearchDataThunk.fulfilled, (state, action) => {
        state.searchMovies = action.payload;
      })
      .addCase(fetchFavoriteListThunk.fulfilled, (state, action) => {
        state.favoriteList = action.payload;
      })
      .addCase(fetchYearArrangeMoviesThunk.fulfilled, (state, action) => {
        state.yearMovies = action.payload;
      });
  },
});

export const dataActions = dataSlice.actions;
export default dataSlice;
