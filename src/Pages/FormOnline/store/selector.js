// Lấy data ra
import { createSelector } from "reselect";
import { INIT_STATE_FORM_ONLINE } from "./state";

const selectMyListFormOnline = (state) =>
  state.myListFormOnlineReducers || INIT_STATE_FORM_ONLINE;

const selectLoadingFormOnline = createSelector(
  selectMyListFormOnline,
  (state) => state.isLoading
);
const selectFormOnline = createSelector(
  selectMyListFormOnline,
  (state) => state.listFormOnline
);
const selectFormOnlineDetail = createSelector(
  selectMyListFormOnline,
  (state) => state.listFormOnlineDetail
);
export { selectLoadingFormOnline, selectFormOnline, selectFormOnlineDetail };
