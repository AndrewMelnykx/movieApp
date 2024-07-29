import { combineReducers } from "redux";
import { DataHandlingState, FilterHandlingState, AuthorizationHandlingState } from "./types";
import filterSlice from "@slices/filter-slice";
import authorizationSlice from "@slices/authorization-slice";
import dataSlice from "@redux/slices/data-slice";

export interface RootState {
  dataHandling: DataHandlingState;
  authorizationHandling: AuthorizationHandlingState;
  filterHandling: FilterHandlingState;
}

const RootReducer = combineReducers({
  dataHandling: dataSlice.reducer,
  authorizationHandling: authorizationSlice.reducer,
  filterHandling: filterSlice.reducer,
});

export default RootReducer;
