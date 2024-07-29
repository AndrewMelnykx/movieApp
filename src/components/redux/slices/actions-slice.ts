import { createAsyncThunk } from "@reduxjs/toolkit";
import fetchPopularMovies from "@data/fetchPopularMovies";
import fetchRatingMovies from "@data/fetchRatingMovies";
import { fetchFavoriteMovieList } from "@data/fetchFavorites";
import { fetchMovieSearch } from "@data/fetchMovieSearch";
import { fetchGenres } from "@data/fetchGenres";
import fetchYearArrange from "@data/fetchYearArrange";

const fetchPopularMoviesThunk = createAsyncThunk("data/fetchPopularMovies", async (page: number) => {
  const response = await fetchPopularMovies(page);
  return response;
});
const fetchRatingMoviesThunk = createAsyncThunk("data/fetchRatingMovies", async (page: number) => {
  const response = await fetchRatingMovies(page);
  return response;
});
const fetchSearchDataThunk = createAsyncThunk(
  "data/fetchSearchData",
  async ({ value, page }: { value: string; page: number }) => {
    const response = await fetchMovieSearch(value, page);
    return response;
  },
);
const fetchFavoriteListThunk = createAsyncThunk("data/fetchFavoriteList", async (page: number) => {
  const response = await fetchFavoriteMovieList(page);
  return response;
});
const fetchInitialGenresThunk = createAsyncThunk("filter/fetchInitialGenres", async () => {
  const response = await fetchGenres();
  return response;
});

const fetchYearArrangeMoviesThunk = createAsyncThunk(
  "data/fetchYearArrangeMovies",
  async ({
    year,
    optionValue,
    page,
    genres,
  }: {
    year: number | number[];
    optionValue: string;
    page: number;
    genres: string;
  }) => {
    const response = await fetchYearArrange(year, optionValue, page, genres);
    return response;
  },
);

export {
  fetchPopularMoviesThunk,
  fetchRatingMoviesThunk,
  fetchSearchDataThunk,
  fetchFavoriteListThunk,
  fetchInitialGenresThunk,
  fetchYearArrangeMoviesThunk,
};
