import React, { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";

import { UseStoreDispatcher } from "@redux/store/store";
import {
  FIlterSelectorGenres,
  FilterSelectorOption,
  FilterSelectorPage,
  FilterSelectorYear,
} from "@redux/selectors/filter-handling-selectors";
import {
  DataSelectorFavorites,
  DataSelectorSearchMovies,
  DataSelectorPopularMovies,
  DataSelectorRatingMovies,
  DataSelectorYearArrangeMovies,
} from "@stateSelectors/data-handling-selectors";
import {
  fetchFavoriteListThunk,
  fetchPopularMoviesThunk,
  fetchRatingMoviesThunk,
} from "@redux/slices/actions-slice";

import { Box } from "@mui/material";
import { handleUserTokenAndIdCookiesSetting } from "@helpers/additional-funcs";
import CardItem from "./Template";
import { MovieProps } from "./types";
import { fetchUserId } from "@data/fetchUserId";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "@components/hero/index.css";

const MovieCards = () => {
  const [movieData, setMovieData] = useState<MovieProps[]>([]);
  const dispatch = UseStoreDispatcher();
  const filterOptionState = useSelector(FilterSelectorOption);
  const pageState = useSelector(FilterSelectorPage);
  const searchMoviesState = useSelector(DataSelectorSearchMovies);
  const favoritesState = useSelector(DataSelectorFavorites);
  const popularMoviesData = useSelector(DataSelectorPopularMovies);
  const ratingMoviesData = useSelector(DataSelectorRatingMovies);
  const yearsArrangeData = useSelector(DataSelectorYearArrangeMovies);
  const yearsSliderState = useSelector(FilterSelectorYear);
  const searchIsValid = searchMoviesState.length && true;
  const genresState = useSelector(FIlterSelectorGenres);

  const fetchMovies = useCallback(async () => {
    let moviesByOption;
    try {
      switch (filterOptionState) {
        case "Popularity":
          await dispatch(fetchPopularMoviesThunk(pageState));
          moviesByOption = popularMoviesData;
          break;
        case "Rating":
          await dispatch(fetchRatingMoviesThunk(pageState));
          moviesByOption = ratingMoviesData;
          break;
        case "Favorites":
          moviesByOption = favoritesState;
          break;
        default:
          await dispatch(fetchPopularMoviesThunk(pageState));
          moviesByOption = popularMoviesData;
          break;
      }
      setMovieData(moviesByOption || []);
    } catch (error) {
      toast.error("Failed to fetch movies at all!");
    }
  }, [filterOptionState, pageState, ratingMoviesData, favoritesState]);

  useEffect(() => {
    const fetchUserIdRequest = async () => {
      try {
        const response = await fetchUserId();
        handleUserTokenAndIdCookiesSetting("userId", response.id);
      } catch (error) {
        toast.error("Failed to fetch user`s id");
      }
    };
    fetchUserIdRequest();
  }, []);

  const fetchFavoriteList = useCallback(async () => {
    try {
      await dispatch(fetchFavoriteListThunk(pageState));
    } catch (error) {
      toast.error("Failed to fetch movie list!");
    }
  }, [pageState, dispatch]);

  useEffect(() => {
    fetchFavoriteList();
  }, [fetchFavoriteList]);

  useEffect(() => {
    setMovieData(yearsArrangeData);
  }, [yearsSliderState, genresState, yearsArrangeData]);

  useEffect(() => {
    fetchMovies();
  }, [fetchMovies]);

  return (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: {
          xs: "1fr",
          sm: "repeat(2, 1fr)",
          md: "repeat(3, 1fr)",
          lg: "repeat(4, 1fr)",
        },
        gap: "35px",
        padding: "24px",
        maxWidth: "70%",
        margin: "0 auto",
      }}
    >
      {(searchIsValid ? searchMoviesState : movieData).map(movie => (
        <CardItem movie={movie} key={movie.id} />
      ))}
      <ToastContainer />
    </Box>
  );
};

export default MovieCards;
