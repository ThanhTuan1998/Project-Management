import { takeLatest, put, call, all } from "redux-saga/effects";
import { GET_ALL_DASH_BOARD } from "./contants";
import { setLoadingDashBoardAction, saveAllDashBoardAction } from "./action";
import { dashBoard } from "../../../Services/userService";

function* myListDashBoard() {
  try {
    yield put(setLoadingDashBoardAction(true));
    const response = yield call(dashBoard);
    yield all([
      put(setLoadingDashBoardAction(false)),
      put(saveAllDashBoardAction(response.data.result)),
    ]);
  } catch (error) {
    yield put(setLoadingDashBoardAction(false));
  }
}
export function* listMyDashBoard() {
  yield takeLatest(GET_ALL_DASH_BOARD, myListDashBoard);
}
