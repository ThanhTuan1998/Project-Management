import { createSelector } from "reselect";
import { INIT_STATE_LOGIN } from "./state";

const selectMyResidents = (state) => state.loginReducers || INIT_STATE_LOGIN;
const selectLoading = createSelector(
  selectMyResidents,
  (state) => state.isLoading
);
const selectInfoUser = createSelector(
  selectMyResidents,
  (state) => state.infoUser
);
export { selectLoading, selectInfoUser };
