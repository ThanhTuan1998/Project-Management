import { createSelector } from "reselect";
import { INIT_STATE_RESIDENT } from "./state";

const selectMyResidents = (state) => state.usersReducers || INIT_STATE_RESIDENT;
const selectLoading = createSelector(
  selectMyResidents,
  (state) => state.isLoading
);
const selectListAccountResident = createSelector(
  selectMyResidents,
  (state) => state.listAccountResident.data
);

export { selectLoading, selectListAccountResident };
