import { takeLatest, put, call, all } from "redux-saga/effects";
import { GET_ALL_FORM_ONLINE, GET_DETAIL_FORM_ONLINE } from "./contants";
import {
  formOnlineService,
  formOnlineServiceDetail,
} from "../../../Services/residentService";
import {
  setLoadingFormOnlineAction,
  saveAllFormOnlineAction,
  saveDetailFormOnlineAction,
} from "./action";

function* myListFormOnline({ payload }) {
  try {
    yield put(setLoadingFormOnlineAction(true));
    console.log(payload);
    const response = yield call(formOnlineService, payload);
    console.log(response);
    yield all([
      put(setLoadingFormOnlineAction(false)),
      put(saveAllFormOnlineAction(response.data.result.data)),
    ]);
  } catch (error) {
    yield put(setLoadingFormOnlineAction(false));
  }
}
function* myListFormOnlineDetail({ payload }) {
  try {
    yield put(setLoadingFormOnlineAction(true));
    console.log(payload);
    const response = yield call(formOnlineServiceDetail, payload);
    console.log(response);
    yield all([
      put(setLoadingFormOnlineAction(false)),
      put(saveDetailFormOnlineAction(response.data.result)),
    ]);
  } catch (error) {
    yield put(setLoadingFormOnlineAction(false));
  }
}
export function* listMyFormOnline() {
  yield takeLatest(GET_ALL_FORM_ONLINE, myListFormOnline);
  yield takeLatest(GET_DETAIL_FORM_ONLINE, myListFormOnlineDetail);
}
