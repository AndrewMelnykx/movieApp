import axios from "axios";
import { tokenFromCookies } from "@helpers/const-values";

const url = import.meta.env.VITE_MOVIE_APP_MOVIES_POPULAR;

const fetchPopularMovies = async (page: number) => {
  try {
    const response = await axios.get(`${url}${page}`, {
      headers: {
        Authorization: `Bearer ${tokenFromCookies}`,
        Accept: "application/json",
      },
    });
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch", error);
  }
};

export default fetchPopularMovies;
