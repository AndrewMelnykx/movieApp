import { MovieProps } from "@components/cards/types";

interface GenreItem {
  id: number;
  name: string;
  checked: boolean;
}

interface DataHandlingState {
  favoriteList: MovieProps[];
  searchMovies: MovieProps[];
  genres: GenreItem[];
  popularMovies: MovieProps[];
  ratingMovies: MovieProps[];
  yearMovies: MovieProps[];
}
interface FilterHandlingState {
  selectByYear: number[] | number;
  selectByOption: string;
  page: number;
  genres: GenreItem[];
}
interface AuthorizationHandlingState {
  isSignUpIsVisible: boolean;
  isLogInVisible: boolean;
  isFilterVisible: boolean;
}

interface FavoriteListProps {
  page: number;
  results: [];
  total_pages: number;
  total_results: number;
  id: number;
}

export type { FilterHandlingState, DataHandlingState, AuthorizationHandlingState, FavoriteListProps, GenreItem };
