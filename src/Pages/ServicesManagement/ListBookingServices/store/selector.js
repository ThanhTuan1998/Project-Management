// Lấy data ra
import { createSelector } from "reselect";
import { INIT_STATE_BOOKING_SERVICES } from "./state";

const selectMyListBookingServices = (state) =>
  state.myListBookingServicesReducers || INIT_STATE_BOOKING_SERVICES;

const selectLoadingBookingServices = createSelector(
  selectMyListBookingServices,
  (state) => state.isLoading
);
const selectBookingServices = createSelector(
  selectMyListBookingServices,
  (state) => state.listBookingServices
);
const selectBookingServicesDetail = createSelector(
  selectMyListBookingServices,
  (state) => state.listBookingServicesDetail
);
export {
  selectLoadingBookingServices,
  selectBookingServices,
  selectBookingServicesDetail,
};
