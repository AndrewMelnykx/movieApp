import { createSlice } from "@reduxjs/toolkit";
import { AuthorizationHandlingState } from "@redux/reducers/types";

const initialState: AuthorizationHandlingState = {
  isSignUpIsVisible: false,
  isLogInVisible: false,
  isFilterVisible: false,
};

const authorizationSlice = createSlice({
  name: "authorization",
  initialState,
  reducers: {
    changedSignUpVisibility: (state, action) => {
      state.isSignUpIsVisible = action.payload;
    },
    changedLogInVisibility: (state, action) => {
      state.isLogInVisible = action.payload;
    },
    changedFilterVisibility: (state, action) => {
      state.isFilterVisible = action.payload;
    },
  },
});

export const authorizationActions = authorizationSlice.actions;
export default authorizationSlice;
