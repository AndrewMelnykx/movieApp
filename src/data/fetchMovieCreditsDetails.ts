import axios from "axios";
import { tokenFromCookies } from "@helpers/const-values";

const fetchMovieDetails = async (movieId?: string) => {
  const MOVIE_DETAILS = import.meta.env.VITE_MOVIE_APP_DETAILS;
  const url = MOVIE_DETAILS.replace("{movie_id}", movieId);
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tokenFromCookies}`,
        Accept: "application/json",
      },
    });
    return await response;
  } catch (error) {
    console.error("Failed to fetch", error);
  }
};

const fetchMovieCredits = async (movieId?: string) => {
  const MOVIE_CREDITS = import.meta.env.VITE_MOVIE_APP_CREDITS;
  const url = MOVIE_CREDITS.replace("{movie_id}", movieId);
  try {
    const response = axios.get(url, {
      headers: {
        Authorization: `Bearer ${tokenFromCookies}`,
        Accept: "application/json",
      },
    });
    return await response;
  } catch (error) {
    console.error("Failed to fetch", error);
  }
};

export { fetchMovieCredits, fetchMovieDetails };
