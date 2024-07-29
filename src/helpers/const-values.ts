import Cookies from "js-cookie";

const byOption = [
  { id: "0", value: "Popularity" },
  { id: "1", value: "Rating" },
  { id: "2", value: "Favorites" },
];
const tokenFromCookies = Cookies.get("userToken");
const accountId = Cookies.get("userId");
const preloadTime = 1200;

export { byOption, tokenFromCookies, accountId, preloadTime };
