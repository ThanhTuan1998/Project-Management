import {
  SET_LOADING_DASH_BOARD,
  GET_ALL_DASH_BOARD,
  SAVE_ALL_DASH_BOARD,
} from "./contants";

export const setLoadingDashBoardAction = (payload) => {
  return {
    type: SET_LOADING_DASH_BOARD,
    payload,
  };
};
export const getAllDashBoardAction = (payload) => {
  return {
    type: GET_ALL_DASH_BOARD,
    payload,
  };
};
export const saveAllDashBoardAction = (payload) => {
  return {
    type: SAVE_ALL_DASH_BOARD,
    payload,
  };
};
