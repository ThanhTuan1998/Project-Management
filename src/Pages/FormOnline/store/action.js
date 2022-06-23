import {
  SET_LOADING_FORM_ONLINE,
  GET_ALL_FORM_ONLINE,
  SAVE_ALL_FORM_ONLINE,
  GET_DETAIL_FORM_ONLINE,
  SAVE_DETAIL_FORM_ONLINE,
} from "./contants";

export const setLoadingFormOnlineAction = (payload) => {
  return {
    type: SET_LOADING_FORM_ONLINE,
    payload,
  };
};
export const getAllFormOnlineAction = (payload) => {
  console.log(payload);
  return {
    type: GET_ALL_FORM_ONLINE,
    payload,
  };
};
export const saveAllFormOnlineAction = (payload) => {
  return {
    type: SAVE_ALL_FORM_ONLINE,
    payload,
  };
};
export const getDetailFormOnlineAction = (payload) => {
  console.log(payload);
  return {
    type: GET_DETAIL_FORM_ONLINE,
    payload,
  };
};
export const saveDetailFormOnlineAction = (payload) => {
  return {
    type: SAVE_DETAIL_FORM_ONLINE,
    payload,
  };
};
