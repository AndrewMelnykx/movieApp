import axios from "axios";
import { tokenFromCookies, accountId } from "@helpers/const-values";

const urlForOneMovieBase = import.meta.env.VITE_MOVIE_APP_FAVORITE;
const urlForWholeListBase = import.meta.env.VITE_MOVIE_APP_FAVORITE_LIST;

const fetchFavoriteMovie = async (media_id: number, favorite?: boolean) => {
  try {
    const urlForOneMovie = urlForOneMovieBase.replace("{account_id}", accountId);

    const response = await axios.post(
      urlForOneMovie,
      {
        media_type: "movie",
        media_id: media_id,
        favorite: favorite,
      },

      {
        headers: {
          Authorization: `Bearer ${tokenFromCookies}`,
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      },
    );
    return response.data;
  } catch (error) {
    console.error("Failed to fetch", error);
  }
};

const fetchFavoriteMovieList = async (page: number) => {
  try {
    const urlForWholeListWithAccount = urlForWholeListBase.replace("{account_id}", accountId);
    const urlForWholeList = urlForWholeListWithAccount.replace("{page}", page);
    const response = await axios.get(urlForWholeList, {
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

export { fetchFavoriteMovie, fetchFavoriteMovieList };
