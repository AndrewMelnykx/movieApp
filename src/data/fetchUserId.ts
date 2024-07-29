import axios from "axios";
import { tokenFromCookies } from "@helpers/const-values";

const url = import.meta.env.VITE_MOVIE_APP_USER_ID;

const fetchUserId = async () => {
  try {
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${tokenFromCookies}`,
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Failed to fetch", error);
  }
};

export { fetchUserId };
