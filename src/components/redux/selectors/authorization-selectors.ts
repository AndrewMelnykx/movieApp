import { RootState } from "@redux/reducers/root-reducer";

const FilterAuthorizationSelector = (state: RootState) => state.authorizationHandling.isFilterVisible;
const LoginAuthorizationSelector = (state: RootState) => state.authorizationHandling.isLogInVisible;
const SIgnUpAuthorizationSelector = (state: RootState) => state.authorizationHandling.isSignUpIsVisible;
export { FilterAuthorizationSelector, SIgnUpAuthorizationSelector, LoginAuthorizationSelector };
