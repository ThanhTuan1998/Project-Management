import { takeLatest, put, call, all } from "redux-saga/effects";
import { LOGIN_REQUEST } from "./contants";
import { loginRequestService } from "../../../Services/loginService";
import { saveInfoLoginAction, setLoading } from "./actions";

function* loginRequestSaga({ payload, resolve }) {
  try {
    yield put(setLoading(true));
    const respone = yield call(loginRequestService, payload.values);
    yield all([
      put(setLoading(false)),
      put(saveInfoLoginAction(respone.data.result)),
    ]);
    if (respone.data.result) {
      payload.navigate("/administrator/users");
    }
  } catch (error) {
    yield put(setLoading(false));
  }
}

export function* requestLogin() {
  yield takeLatest(LOGIN_REQUEST, loginRequestSaga);
}
