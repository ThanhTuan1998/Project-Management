import request from "../utils/request";

const BASE_API = "https://quanlycudan.azurewebsites.net";

export function loginRequestService(payload) {
  return request(`${BASE_API}/api/users/authenticate`, {
    method: "POST",
    data: payload,
  });
}
export function getListAll(payload) {
  return request(`${BASE_API}/api/users/get-all/${payload.type}`, {
    method: "POST",
    data: payload,
  });
}
export function getListProFile(payload) {
  return request(`${BASE_API}/api/users/get-profile`, {
    method: "POST",
    data: payload,
  });
}
export function createAccountResidentService(payload) {
  return request(`${BASE_API}/api/users/create`, {
    method: "POST",
    data: payload,
  });
}
export function deleteResidentService(payload) {
  return request(`${BASE_API}/api/users/delete/${payload}`, {
    method: "POST",
    data: payload,
  });
}
export function editService(payload) {
  return request(`${BASE_API}/api/users/update`, {
    method: "POST",
    data: payload,
  });
}
export function dashBoard(payload) {
  return request(`${BASE_API}/api/residence/get-dashboard`, {
    method: "POST",
    data: payload,
  });
}
