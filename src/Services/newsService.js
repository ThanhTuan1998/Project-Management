import request from "../utils/request";

const BASE_API = "https://quanlycudan.azurewebsites.net";

export function getListNewsContent(payload) {
    return request(`${BASE_API}/api/news/get-all`, {
        method: "POST",
        data: payload
    });
}
export function getDetailNewsServices(payload) {
    return request(`${BASE_API}/api/News/get-detail/${payload}`, {
        method: "POST",
        data: payload,
    });
}

// export function createNewsServicesAction(payload) {
//     return request(`${BASE_API}/api/News/create`, {
//         method: "POST",
//         data: payload,
//     });
// }

// export function updateNewsServices(params) {
//     return request(`${BASE_API}/api/News/update/${params.id}`, {
//         method: "PUT",
//         data: params,
//     });
// }

// export function deleteNewsServices(id, payload) {
//     return request(`${BASE_API}/api/news/delete/${id}`, {
//         method: "POST",
//         data: payload,
//     });
// }
