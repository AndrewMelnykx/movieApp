import Cookies from "js-cookie";
const handleReload = (time: number) => {
  setTimeout(() => {
    window.location.reload();
  }, time);
};
const handleUserTokenAndIdCookiesSetting = (cookieKey: string, value: string) => {
  Cookies.set(cookieKey, value);
};

export { handleReload, handleUserTokenAndIdCookiesSetting };
