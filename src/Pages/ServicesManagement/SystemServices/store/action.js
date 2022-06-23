import {
  SET_LOADING_SYSTEM_SERVICES,
  GET_ALL_SYSTEM_SERVICES,
  SAVE_ALL_SYSTEM_SERVICES,
  CREATE_SYSTEM_SERVICES,
  GET_DETAIL_SYSTEM_SERVICES,
  SAVE_DETAIL_SYSTEM_SERVICES,
  UPDATE_SYSTEM_SERVICES,
  DELETE_SYSTEM_SERVICES,
} from "./contants";

export const setLoadingSystemServicesAction = (payload) => {
  return {
    type: SET_LOADING_SYSTEM_SERVICES,
    payload,
  };
};
export const getAllSystemServicesAction = (payload, resolve) => {
  return {
    type: GET_ALL_SYSTEM_SERVICES,
    payload,
    resolve,
  };
};
export const asyncGetAllSystemServicesAction = (dispatch) => {
  return function returnAsync(payload) {
    return new Promise((resolve) =>
      dispatch(getAllSystemServicesAction(payload, resolve))
    );
  };
};
export const saveAllSystemServicesAction = (payload) => {
  return {
    type: SAVE_ALL_SYSTEM_SERVICES,
    payload,
  };
};
export const getDetailSystemServicesAction = (payload, resolve) => {
  console.log(payload);
  return {
    type: GET_DETAIL_SYSTEM_SERVICES,
    payload,
    resolve,
  };
};
export const saveDetailSystemServicesAction = (payload) => {
  return {
    type: SAVE_DETAIL_SYSTEM_SERVICES,
    payload,
  };
};
export function asyncGetDetailSystemServices(dispatch) {
  return function returnAsync(payload) {
    return new Promise((resolve) =>
      dispatch(getDetailSystemServicesAction(payload, resolve))
    );
  };
}
export const createSystemServices = (payload, resolve) => {
  return {
    type: CREATE_SYSTEM_SERVICES,
    payload,
    resolve,
  };
};
export function asyncCreateSystemServices(dispatch) {
  return function returnAsync(payload) {
    return new Promise((resolve) =>
      dispatch(createSystemServices(payload, resolve))
    );
  };
}
export const updateSystemServices = (payload, resolve) => {
  return {
    type: UPDATE_SYSTEM_SERVICES,
    payload,
    resolve,
  };
};
export function asyncUpdateSystemServices(dispatch) {
  return function returnAsync(payload) {
    return new Promise((resolve) =>
      dispatch(updateSystemServices(payload, resolve))
    );
  };
}
export const deleteSystemServices = (payload, resolve) => {
  return {
    type: DELETE_SYSTEM_SERVICES,
    payload,
    resolve,
  };
};
export function asyncDeleteSystemServices(dispatch) {
  return function returnAsync(payload) {
    return new Promise((resolve) =>
      dispatch(deleteSystemServices(payload, resolve))
    );
  };
}
