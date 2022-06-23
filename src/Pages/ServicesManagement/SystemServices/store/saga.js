import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  GET_ALL_SYSTEM_SERVICES,
  CREATE_SYSTEM_SERVICES,
  GET_DETAIL_SYSTEM_SERVICES,
  UPDATE_SYSTEM_SERVICES,
  DELETE_SYSTEM_SERVICES,
} from "./contants";
import {
  systemServices,
  createSystemServices,
  systemServicesDetail,
  updateSystemServices,
  deleteSystemServices,
} from "../../../../Services/residentService";
import {
  setLoadingSystemServicesAction,
  saveAllSystemServicesAction,
  saveDetailSystemServicesAction,
} from "./action";

function* myListSystemServices({ payload, resolve }) {
  try {
    yield put(setLoadingSystemServicesAction(true));
    console.log(payload);
    const response = yield call(systemServices, payload);
    console.log(response);
    resolve(response.data);
    yield all([
      put(setLoadingSystemServicesAction(false)),
      put(saveAllSystemServicesAction(response.data)),
    ]);
  } catch (error) {
    yield put(setLoadingSystemServicesAction(false));
  }
}
function* createSystemServicesAction({ payload, resolve }) {
  try {
    yield put(setLoadingSystemServicesAction(true));
    const response = yield call(createSystemServices, payload);
    resolve(response.data);
    yield put(setLoadingSystemServicesAction(false));
  } catch (error) {
    resolve(false);
    yield put(setLoadingSystemServicesAction(false));
  }
}
function* myListSystemServicesDetail({ payload, resolve }) {
  try {
    yield put(setLoadingSystemServicesAction(true));
    const response = yield call(systemServicesDetail, payload);
    resolve(response.data.result);
    yield all([
      put(saveDetailSystemServicesAction(response.data.result)),
      put(setLoadingSystemServicesAction(false)),
    ]);
  } catch (error) {
    yield put(setLoadingSystemServicesAction(false));
  }
}
function* updateSystemServicesAction({ payload, resolve }) {
  try {
    yield put(setLoadingSystemServicesAction(true));
    const response = yield call(updateSystemServices, payload);
    resolve(response.data);
    yield all([put(setLoadingSystemServicesAction(false))]);
  } catch (error) {
    yield put(setLoadingSystemServicesAction(false));
  }
}
function* deleteSystemServicesAction({ payload, resolve }) {
  try {
    yield put(setLoadingSystemServicesAction(true));
    const response = yield call(deleteSystemServices, payload);
    resolve(response.data);
    yield put(setLoadingSystemServicesAction(false));
  } catch (error) {
    resolve(false);
    yield put(setLoadingSystemServicesAction(false));
  }
}
export function* listMySystemServices() {
  yield takeLatest(GET_ALL_SYSTEM_SERVICES, myListSystemServices);
  yield takeLatest(GET_DETAIL_SYSTEM_SERVICES, myListSystemServicesDetail);
  yield takeLatest(CREATE_SYSTEM_SERVICES, createSystemServicesAction);
  yield takeLatest(UPDATE_SYSTEM_SERVICES, updateSystemServicesAction);
  yield takeLatest(DELETE_SYSTEM_SERVICES, deleteSystemServicesAction);
}
