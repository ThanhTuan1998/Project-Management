import {
  CREATE_ACCOUNT_RESIDENT,
  DELETE_ACCOUNT_RESIDENT,
  GET_ALL_RESIDENT,
  GET_ID_USERS,
  SAVE_ALL_RESIDENT,
  SET_LOADING,
  UPDATE_USERS,
} from "./contants";

export const setLoading = (payload) => {
  return {
    type: SET_LOADING,
    payload,
  };
};

export const getAllResident = (payload) => {
  return {
    type: GET_ALL_RESIDENT,
    payload,
  };
};
export const saveAllResident = (payload) => {
  return {
    type: SAVE_ALL_RESIDENT,
    payload,
  };
};

export const createAcountResident = (payload, resolve) => {
  return {
    type: CREATE_ACCOUNT_RESIDENT,
    payload,
    resolve,
  };
};
export function asyncreateAcountResident(dispatch) {
  return function returnAsync(payload) {
    return new Promise((resolve) =>
      dispatch(createAcountResident(payload, resolve))
    );
  };
}
export const deleteAcountResident = (payload, resolve) => {
  return {
    type: DELETE_ACCOUNT_RESIDENT,
    payload,
    resolve,
  };
};
export function asyndeleteAcountResident(dispatch) {
  return function returnAsync(payload) {
    return new Promise((resolve) =>
      dispatch(deleteAcountResident(payload, resolve))
    );
  };
}
export const getIdUser = (payload, resolve) => {
  return {
    type: GET_ID_USERS,
    payload,
    resolve,
  };
};
export function asynGetIdUser(dispatch) {
  return function returnAsync(payload) {
    return new Promise((resolve) => dispatch(getIdUser(payload, resolve)));
  };
}
export const updateUsers = (payload, resolve) => {
  return {
    type: UPDATE_USERS,
    payload,
    resolve,
  };
};
export function asynUpdateUsers(dispatch) {
  return function returnAsync(payload) {
    return new Promise((resolve) => dispatch(updateUsers(payload, resolve)));
  };
}
