import {
  SET_LOADING_BOOKING_SERVICES,
  GET_ALL_BOOKING_SERVICES,
  SAVE_ALL_BOOKING_SERVICES,
  GET_DETAIL_BOOKING_SERVICES,
  SAVE_DETAIL_BOOKING_SERVICES,
} from "./contants";

export const setLoadingBookingServicesAction = (payload) => {
  return {
    type: SET_LOADING_BOOKING_SERVICES,
    payload,
  };
};
export const getAllBookingServicesAction = (payload) => {
  console.log(payload);
  return {
    type: GET_ALL_BOOKING_SERVICES,
    payload,
  };
};
export const saveAllBookingServicesAction = (payload) => {
  return {
    type: SAVE_ALL_BOOKING_SERVICES,
    payload,
  };
};
export const getDetailBookingServicesAction = (payload) => {
  console.log(payload);
  return {
    type: GET_DETAIL_BOOKING_SERVICES,
    payload,
  };
};
export const saveDetailBookingServicesAction = (payload) => {
  return {
    type: SAVE_DETAIL_BOOKING_SERVICES,
    payload,
  };
};
