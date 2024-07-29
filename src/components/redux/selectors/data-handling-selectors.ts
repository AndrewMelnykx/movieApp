import { RootState } from "@redux/reducers/root-reducer";

const DataSelectorFavorites = (state: RootState) => state.dataHandling.favoriteList;
const DataSelectorSearchMovies = (state: RootState) => state.dataHandling.searchMovies;
const DataSelectorPopularMovies = (state: RootState) => state.dataHandling.popularMovies;
const DataSelectorRatingMovies = (state: RootState) => state.dataHandling.ratingMovies;
const DataSelectorYearArrangeMovies = (state: RootState) => state.dataHandling.yearMovies;

export {
  DataSelectorFavorites,
  DataSelectorSearchMovies,
  DataSelectorPopularMovies,
  DataSelectorRatingMovies,
  DataSelectorYearArrangeMovies,
};
