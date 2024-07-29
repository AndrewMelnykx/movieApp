import React, { useCallback, useEffect, useState } from "react";
import "@components/main-page/MainPage.css";
import CardItem from "./CardTemplate";
import { Box } from "@mui/material";
import { MovieProps } from "./types";
import { fetchUserId } from "@data/fetchUserId";
import { handleUserTokenAndIdCookiesSetting } from "@helpers/additional-funcs";
import {
  FIlterSelectorGenres,
  FilterSelectorOption,
  FilterSelectorPage,
  FilterSelectorYear,
} from "@redux/selectors/filter-handling-selectors";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  DataSelectorFavorites,
  DataSelectorSearchMovies,
  DataSelectorPopularMovies,
  DataSelectorRatingMovies,
  DataSelectorYearArrangeMovies,
} from "@stateSelectors/data-handling-selectors";
import { UseStoreDispatcher } from "@redux/store/store";
import { fetchFavoriteListThunk, fetchPopularMoviesThunk, fetchRatingMoviesThunk } from "@redux/slices/actions-slice";

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
    <Box className="cards-grid-container">
      {(searchIsValid ? searchMoviesState : movieData).map(movie => (
        <CardItem movie={movie} key={movie.id} />
      ))}
      <ToastContainer />
    </Box>
  );
};

export default MovieCards;
