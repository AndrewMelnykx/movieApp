import axios from "axios";
import { tokenFromCookies } from "@helpers/const-values";
const url = import.meta.env.VITE_MOVIE_APP_GENRES;

const fetchGenres = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tokenFromCookies}`,
        accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch", error);
  }
};

export { fetchGenres, url };
