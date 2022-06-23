import {
    GET_ALL_NEWS,
    SAVE_ALL_NEWS,
    SET_LOADING,

    CREATE_NEWS,
    DELETE_NEWS,
    UPDATE_NEWS,

    GET_DETAIL_NEWS,
    SAVE_DETAIL_NEWS
} from "./contants";

export const setLoading = (payload) => {
    return {
        type: SET_LOADING,
        payload,
    };
};
export const getAllNews = (payload) => {
    console.log(payload);
    return {
        type: GET_ALL_NEWS,
        payload,
    };
};

export const saveAllNews = (payload) => {
    return {
        type: SAVE_ALL_NEWS,
        payload,
    };
};

export const getDetailNews = (payload) => {
    console.log(payload);
    return {
        type: GET_DETAIL_NEWS,
        payload,
    };
};

export const saveDetailNews = (payload) => {
    return {
        type: SAVE_DETAIL_NEWS,
        payload,
    };
};
