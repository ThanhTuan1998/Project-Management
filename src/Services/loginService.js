import request from "../utils/request";

const BASE_API = "https://quanlycudan.azurewebsites.net";

export function loginRequestService(payload) {
    return request(`${BASE_API}/api/users/authenticate`, {
        method: "POST",
        data: payload,
    });
}