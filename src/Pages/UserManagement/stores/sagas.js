import { takeLatest, put, call, all } from "redux-saga/effects";
import {
  CREATE_ACCOUNT_RESIDENT,
  DELETE_ACCOUNT_RESIDENT,
  GET_ALL_RESIDENT,
  GET_ID_USERS,
  UPDATE_USERS,
} from "./contants";
import {
  createAccountResidentService,
  deleteResidentService,
  editService,
  getListAll,
  getListProFile,
} from "../../../Services/userService";
import { saveAllResident, setLoading } from "./actions";
function* getListAccountResident({ payload }) {
  try {
    yield put(setLoading(true));
    const respone = yield call(getListAll, payload);
    console.log(respone);
    yield all([
      put(setLoading(false)),
      put(saveAllResident(respone.data.result.data)),
    ]);
  } catch (error) {
    yield put(setLoading(false));
  }
}

function* createAccoutResidents({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const respone = yield call(createAccountResidentService, payload);
    resolve(respone.data.result);
    yield put(setLoading(false));
  } catch (error) {
    resolve(false);
    yield put(setLoading(false));
  }
}
function* deleteAccoutResidents({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const respone = yield call(deleteResidentService, payload);
    resolve(respone.data);
    yield put(setLoading(false));
  } catch (error) {
    resolve(false);
    yield put(setLoading(false));
  }
}
function* getIdUsers({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const respone = yield call(getListProFile, payload);
    resolve(respone.data.result);
    yield put(setLoading(false));
  } catch (error) {
    resolve(false);
    yield put(setLoading(false));
  }
}
function* updateUsers({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const respone = yield call(editService, payload);
    console.log(respone.data);
    resolve(respone.data.result);
    yield put(setLoading(false));
  } catch (error) {
    resolve(false);
    yield put(setLoading(false));
  }
}
export function* listAccoutResident() {
  yield takeLatest(GET_ALL_RESIDENT, getListAccountResident);
  yield takeLatest(CREATE_ACCOUNT_RESIDENT, createAccoutResidents);
  yield takeLatest(DELETE_ACCOUNT_RESIDENT, deleteAccoutResidents);
  yield takeLatest(GET_ID_USERS, getIdUsers);
  yield takeLatest(UPDATE_USERS, updateUsers);
}
