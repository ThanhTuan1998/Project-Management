import { INIT_STATE_LOGIN } from "./state";
import produce from "immer";
import { SAVE_INFO_LOGIN, SET_LOADING } from "./contants";

export default function loginReducers(state = INIT_STATE_LOGIN, action) {
  return produce(state, (draf) => {
    switch (action.type) {
      case SET_LOADING:
        draf.isLoading = action.payload;
        break;
      case SAVE_INFO_LOGIN:
        localStorage.setItem("token", action.payload.token);
        // document.cookie = `token = ${action.payload.token}`;
        draf.infoUser = action.payload;
        break;
      default:
        return state;
    }
  });
}
