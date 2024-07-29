import RootReducer from "@redux/reducers/root-reducer";
import { useDispatch } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: RootReducer,
});

export type DispatchType = typeof store.dispatch;

export const UseStoreDispatcher = (): DispatchType => useDispatch();

export default store;
