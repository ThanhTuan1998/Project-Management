// Lấy data ra
import { createSelector } from "reselect";
import { INIT_STATE_NEWS } from "./state";

const selectMyNews = (state) => state.myListNewsReducers || INIT_STATE_NEWS;

// Loading
const selectLoading = createSelector(
    selectMyNews,
    (state) => state.isLoading
);
// List All
const selectNews = createSelector(
    selectMyNews,
    (state) => state.listNewsContent
);
// List Detail
const selectDetailContent = createSelector(
    selectMyNews,
    (state) => state.detailContent
);
export {
    selectLoading,
    selectNews,
    selectDetailContent
};
