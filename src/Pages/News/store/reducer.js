import { INIT_STATE_NEWS } from "./state";
import { produce } from "immer";
import {
    SET_LOADING,
    SAVE_ALL_NEWS,
    SAVE_DETAIL_NEWS,
} from "./contants";

export default function myListNewsReducers(state = INIT_STATE_NEWS, action) {
    return produce(state, (draf) => {
        switch (action.type) {
            case SET_LOADING:
                draf.isLoading = action.payload;
                break;
            case SAVE_ALL_NEWS:
                draf.listNewsContent = action.payload;
                break;
            case SAVE_DETAIL_NEWS:
                draf.detailContent = action.payload;
                break;
            default:
                return state;
        }
    });
}
