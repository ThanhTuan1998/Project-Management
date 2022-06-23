import { INIT_STATE_DASH_BOARD } from "./state";
import { produce } from "immer";
import { SET_LOADING_DASH_BOARD, SAVE_ALL_DASH_BOARD } from "./contants";

export default function myListDashBoardReducers(
  state = INIT_STATE_DASH_BOARD,
  action
) {
  return produce(state, (draf) => {
    switch (action.type) {
      case SET_LOADING_DASH_BOARD:
        draf.isLoading = action.payload;
        break;
      case SAVE_ALL_DASH_BOARD:
        draf.listDashBoard = action.payload;
        break;
      default:
        return state;
    }
  });
}
