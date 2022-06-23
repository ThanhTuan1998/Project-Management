import { INIT_STATE_BOOKING_SERVICES } from "./state";
import { produce } from "immer";
import {
  SET_LOADING_BOOKING_SERVICES,
  SAVE_ALL_BOOKING_SERVICES,
  SAVE_DETAIL_BOOKING_SERVICES,
} from "./contants";

export default function myListBookingServicesReducers(
  state = INIT_STATE_BOOKING_SERVICES,
  action
) {
  return produce(state, (draf) => {
    switch (action.type) {
      case SET_LOADING_BOOKING_SERVICES:
        draf.isLoading = action.payload;
        break;
      case SAVE_ALL_BOOKING_SERVICES:
        draf.listBookingServices = action.payload;
        break;
      case SAVE_DETAIL_BOOKING_SERVICES:
        draf.listBookingServicesDetail = action.payload;
        break;
      default:
        return state;
    }
  });
}
