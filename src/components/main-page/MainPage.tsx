import React, { useEffect, useCallback } from "react";
import "./MainPage.css";

import AuthorizationModal from "@modals/LoginModal/LoginModal";
import SignupModal from "@modals/SignupModal/SignupModal";
import Header from "@header/Header";
import Filter from "@filter/Filter";
import { tokenFromCookies } from "@helpers/const-values";

import { Box } from "@mui/material";
import MovieCards from "@components/cards/CardsByCondition";
import ImportantMessage from "@components/important-message/ImportantMessage";
import { useSelector } from "react-redux";
import {
  FilterAuthorizationSelector,
  LoginAuthorizationSelector,
  SIgnUpAuthorizationSelector,
} from "@stateSelectors/authorization-selectors";
import { UseStoreDispatcher } from "@redux/store/store";
import { authorizationActions } from "@redux/slices/authorization-slice";

export default function MainPage() {
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
    <>
      <Header />
      {wrongToken && <ImportantMessage />}
      <Box className="cards-flex-container">
        <Box sx={{ marginLeft: "5%" }}>{filterVisibilityState && <Filter />}</Box>

        <Box>
          <MovieCards />
        </Box>
      </Box>
      {signUpVisibilityState && <SignupModal />}
      {loginVisibilityState && <AuthorizationModal />}
    </>
  );
}
