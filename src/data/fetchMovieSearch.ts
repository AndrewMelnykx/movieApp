import axios from "axios";
import { tokenFromCookies } from "@helpers/const-values";
const basicUrl = import.meta.env.VITE_MOVIE_APP_SEARCH_MOVIE;

const fetchMovieSearch = async (inputValue?: string, page?: number) => {
  const urlWithValue = basicUrl.replace("{inputValue}", inputValue);
  const url = urlWithValue.replace("{page}", page);
  try {
    const response = await axios.get(url, {
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
export { fetchMovieSearch };
