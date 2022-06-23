import request from "../utils/request";

const BASE_API = "https://quanlycudan.azurewebsites.net";

export function loginRequestService(payload) {
  return request(`${BASE_API}/api/users/authenticate`, {
    method: "POST",
    data: payload,
  });
}

export function formOnlineService(payload) {
  return request(`${BASE_API}/api/Forms/get-all/${payload.type}`, {
    method: "POST",
    data: payload,
  });
}

export function formOnlineServiceDetail(payload) {
  return request(`${BASE_API}/api/Forms/get-detail/${payload}`, {
    method: "POST",
    data: payload,
  });
}

export function bookingServices(payload) {
  return request(`${BASE_API}/api/services/get-all-booking`, {
    method: "POST",
    data: payload,
  });
}

export function bookingServicesDetail(payload) {
  return request(
    `${BASE_API}/api/services/get-service-booking-detail/${payload}`,
    {
      method: "POST",
      data: payload,
    }
  );
}

export function systemServices(payload) {
  return request(`${BASE_API}/api/services/get-all`, {
    method: "POST",
    data: payload,
  });
}

export function createSystemServices(payload) {
  return request(`${BASE_API}/api/services/create`, {
    method: "POST",
    data: payload,
  });
}

export function systemServicesDetail(payload) {
  return request(`${BASE_API}/api/services/get-detail/${payload}`, {
    method: "POST",
    data: payload,
  });
}

export function updateSystemServices(payload) {
  return request(`${BASE_API}/api/services/update/${payload.id}`, {
    method: "POST",
    data: payload,
  });
}
export function deleteSystemServices(payload) {
  return request(`${BASE_API}/api/services/delete/${payload}`, {
    method: "POST",
    data: payload,
  });
}
