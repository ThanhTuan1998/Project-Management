// Lấy data ra
import { createSelector } from "reselect";
import { INIT_STATE_SYSTEM_SERVICES } from "./state";

const selectMyListSystemServices = (state) =>
  state.myListSystemServicesReducers || INIT_STATE_SYSTEM_SERVICES;

const selectLoadingSystemServices = createSelector(
  selectMyListSystemServices,
  (state) => state.isLoading
);
const selectSystemServices = createSelector(
  selectMyListSystemServices,
  (state) => state.listSystemServices
);
const selectDetailSystemServices = createSelector(
  selectMyListSystemServices,
  (state) => state.detailSystemServices
);
export {
  selectLoadingSystemServices,
  selectSystemServices,
  selectDetailSystemServices,
};
