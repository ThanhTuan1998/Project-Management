import { INIT_STATE_SYSTEM_SERVICES } from "./state";
import { produce } from "immer";
import {
  SET_LOADING_SYSTEM_SERVICES,
  SAVE_ALL_SYSTEM_SERVICES,
  SAVE_DETAIL_SYSTEM_SERVICES,
} from "./contants";

export default function myListSystemServicesReducers(
  state = INIT_STATE_SYSTEM_SERVICES,
  action
) {
  return produce(state, (draf) => {
    switch (action.type) {
      case SET_LOADING_SYSTEM_SERVICES:
        draf.isLoading = action.payload;
        break;
      case SAVE_ALL_SYSTEM_SERVICES:
        draf.listSystemServices = action.payload;
        break;
      case SAVE_DETAIL_SYSTEM_SERVICES:
        draf.detailSystemServices = action.payload;
        break;
      default:
        return state;
    }
  });
}
