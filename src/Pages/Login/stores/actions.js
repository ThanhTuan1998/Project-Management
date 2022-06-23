import { SET_LOADING, LOGIN_REQUEST, SAVE_INFO_LOGIN } from "./contants";

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};
export const loginRequestAction = (payload) => {
  return {
    type: LOGIN_REQUEST,
    payload,
  };
};

export const saveInfoLoginAction = (payload) => {
  return {
    type: SAVE_INFO_LOGIN,
    payload,
  };
};
