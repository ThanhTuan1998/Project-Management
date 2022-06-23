import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  GET_ALL_BOOKING_SERVICES,
  GET_DETAIL_BOOKING_SERVICES,
} from "./contants";
import {
  bookingServices,
  bookingServicesDetail,
} from "../../../../Services/residentService";
import {
  setLoadingBookingServicesAction,
  saveAllBookingServicesAction,
  saveDetailBookingServicesAction,
} from "./action";

function* myListBookingServices({ payload }) {
  try {
    yield put(setLoadingBookingServicesAction(true));
    console.log(payload);
    const response = yield call(bookingServices, payload);
    console.log(response);
    yield all([
      put(setLoadingBookingServicesAction(false)),
      put(saveAllBookingServicesAction(response.data.result.data)),
    ]);
  } catch (error) {
    yield put(setLoadingBookingServicesAction(false));
  }
}
function* myListBookingServicesDetail({ payload }) {
  try {
    yield put(setLoadingBookingServicesAction(true));
    console.log(payload);
    const response = yield call(bookingServicesDetail, payload);
    console.log(response);
    yield all([
      put(setLoadingBookingServicesAction(false)),
      put(saveDetailBookingServicesAction(response.data.result)),
    ]);
  } catch (error) {
    yield put(setLoadingBookingServicesAction(false));
  }
}
export function* listMyBookingServices() {
  yield takeLatest(GET_ALL_BOOKING_SERVICES, myListBookingServices);
  yield takeLatest(GET_DETAIL_BOOKING_SERVICES, myListBookingServicesDetail);
}
