import { takeLatest, put, call, all } from "redux-saga/effects";
import {
    GET_ALL_NEWS,
    CREATE_NEWS,
    UPDATE_NEWS,
    DELETE_NEWS,
    GET_DETAIL_NEWS
} from "./contants";
import {
    getListNewsContent,
    createNewsServicesAction,
    updateNewsServices,
    deleteNewsServices,
    getDetailNewsServices
} from "../../../Services/newsService";
import { saveDetailNews, setLoading, saveAllNews } from "./actions";

// Show All News
function* listNewsSaga({ payload }) {
    try {
        console.log(payload);
        yield put(setLoading(true));
        const response = yield call(getListNewsContent, payload);
        console.log(response);
        yield all([
            put(setLoading(false)),
            put(saveAllNews(response.data.result.data)),
        ]);
    } catch (error) {
        yield put(setLoading(false));
    }
}

function* detailNewsSaga({ payload }) {
    try {
        yield put(setLoading(true));
        // console.log(payload);
        const response = yield call(getDetailNewsServices, payload.data);
        console.log(response+"hihi");
        yield all([
            put(setLoading(false)),
            put(saveDetailNews(response.data.result)),
        ]);
    } catch (error) {
        yield put(setLoading(false));
    }
}



export function* myListNewsSagas() {
    yield takeLatest(GET_ALL_NEWS, listNewsSaga);
    yield takeLatest(GET_DETAIL_NEWS, detailNewsSaga);
}