import { createSlice } from "@reduxjs/toolkit";
import { FilterHandlingState } from "../reducers/types";
import { initialYear, initialOption } from "@redux/constants";
import { fetchInitialGenresThunk } from "./actions-slice";
import { GenreItem } from "../reducers/types";

const initialState: FilterHandlingState = {
  selectByYear: initialYear,
  selectByOption: initialOption,
  page: 1,
  genres: [],
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    resetFilter: state => {
      state.genres = state.genres.map(genre => ({ ...genre, checked: false }));
      state.page = 1;
      (state.selectByOption = initialOption), (state.selectByYear = initialYear);
    },

    switchedThePage: (state, action) => {
      state.page = action.payload;
    },
    toggledTheGenre: (state, action) => {
      const updatedGenres = state.genres.map(genre =>
        genre.id === action.payload ? { ...genre, checked: !genre.checked } : genre,
      );
      state.genres = updatedGenres;
    },
    changedByYear: (state, action) => {
      state.selectByYear = action.payload;
    },
    loadedInitialGenres: (state, action) => {
      state.genres = action.payload;
    },
    changedByOption: (state, action) => {
      state.selectByOption = action.payload;
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchInitialGenresThunk.fulfilled, (state, action) => {
      const initialGenres = action.payload.genres.map((genre: GenreItem) => ({
        ...genre,
        checked: false,
      }));
      state.genres = initialGenres;
    });
  },
});

export const filterAction = filterSlice.actions;
export default filterSlice;
