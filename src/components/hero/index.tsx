import React, { useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import {
  FilterAuthorizationSelector,
  LoginAuthorizationSelector,
  SIgnUpAuthorizationSelector,
} from "@stateSelectors/authorization-selectors";
import { UseStoreDispatcher } from "@redux/store/store";
import { authorizationActions } from "@redux/slices/authorization-slice";

import AuthorizationModal from "@components/modals/LoginModal";
import SignupModal from "@components/modals/SignupModal";
import Header from "@components/header";
import Filter from "@components/filter";
import ImportantMessage from "@components/important-message";

import { Box } from "@mui/material";
import MovieCards from "@components/cards/CardsByCondition";
import { tokenFromCookies } from "@helpers/const-values";
import HeroImage from "@assets/images/MovieHeroImage.png";
import MobileHeroImage from "@assets/images/MovieHeroMobileImage.png";

import "./index.css";

export default function Hero() {
  const signUpVisibilityState = useSelector(SIgnUpAuthorizationSelector);
  const loginVisibilityState = useSelector(LoginAuthorizationSelector);
  const filterVisibilityState = useSelector(FilterAuthorizationSelector);
  const dispatch = UseStoreDispatcher();

  const wrongToken = !tokenFromCookies;
  const changeFilterVisibility = useCallback(() => {
    if (tokenFromCookies) {
      dispatch(authorizationActions.changedFilterVisibility(true));
    }
  }, [dispatch]);

  useEffect(() => {
    changeFilterVisibility();
  }, [changeFilterVisibility, filterVisibilityState]);

  return (
    <Box
      sx={{
        backgroundImage: { xs: `url(${MobileHeroImage})`, md: `url(${HeroImage})` },
        backgroundSize: "100% auto",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "black",
      }}
    >
      <Header />
      <Box display={{ xs: "block", md: "flex" }}>
        <Box sx={{ marginLeft: "5%" }}>{filterVisibilityState && <Filter />}</Box>
        <MovieCards />
      </Box>
      {wrongToken && <ImportantMessage />}

      {signUpVisibilityState && <SignupModal />}
      {loginVisibilityState && <AuthorizationModal />}
    </Box>
  );
}
