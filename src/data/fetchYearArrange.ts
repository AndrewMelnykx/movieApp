import { tokenFromCookies } from "@helpers/const-values";
import axios from "axios";
const baseUrl = import.meta.env.VITE_MOVIE_APP_YEAR_ARRANGE;

const fetchYearArrange = async (year: number | number[], optionValue: string, page: number, genres: string) => {
  const url = `${baseUrl}_&page=${page} &primary_release_year=${year}&sort_by=${optionValue}.desc&with_genres=${genres}`;

  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${tokenFromCookies}`,
      Accept: "application/json",
    },
  });
  return response.data.results;
};

export default fetchYearArrange;
