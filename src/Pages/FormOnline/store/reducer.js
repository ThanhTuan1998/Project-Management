import { INIT_STATE_FORM_ONLINE } from "./state";
import { produce } from "immer";
import {
  SET_LOADING_FORM_ONLINE,
  SAVE_ALL_FORM_ONLINE,
  SAVE_DETAIL_FORM_ONLINE,
} from "./contants";

export default function myListFormOnlineReducers(
  state = INIT_STATE_FORM_ONLINE,
  action
) {
  return produce(state, (draf) => {
    switch (action.type) {
      case SET_LOADING_FORM_ONLINE:
        draf.isLoading = action.payload;
        break;
      case SAVE_ALL_FORM_ONLINE:
        draf.listFormOnline = action.payload;
        break;
      case SAVE_DETAIL_FORM_ONLINE:
        draf.listFormOnlineDetail = action.payload;
        break;
      default:
        return state;
    }
  });
}
