// Lấy data ra
import { createSelector } from "reselect";
import { INIT_STATE_DASH_BOARD } from "./state";

const selectMyListDashBoard = (state) =>
  state.myListDashBoardReducers || INIT_STATE_DASH_BOARD;

const selectLoadingDashBoard = createSelector(
  selectMyListDashBoard,
  (state) => state.isLoading
);
const selectDashBoard = createSelector(
  selectMyListDashBoard,
  (state) => state.listDashBoard
);
export { selectLoadingDashBoard, selectDashBoard };
