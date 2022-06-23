import { INIT_STATE_RESIDENT } from "./state";
import produce from "immer";
import { SAVE_ALL_RESIDENT, SAVE_ID_USERS, SET_LOADING } from "./contants";

export default function usersReducers(state = INIT_STATE_RESIDENT, action) {
  return produce(state, (draf) => {
    switch (action.type) {
      case SET_LOADING:
        draf.isLoading = action.payload;
        break;
      case SAVE_ALL_RESIDENT:
        draf.listAccountResident.data = action.payload;
        break;
      default:
        return state;
    }
  });
}
