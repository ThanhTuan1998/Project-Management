import { combineReducers } from "redux";

import loginReducers from "../../Pages/Login/stores/reducer";
import myListNewsReducers from "../../Pages/News/store/reducer";
import usersReducers from "../../Pages/UserManagement/stores/reducer";
import myListFormOnlineReducers from "../../Pages/FormOnline/store/reducer";
import myListBookingServicesReducers from "../../Pages/ServicesManagement/ListBookingServices/store/reducer";
import myListSystemServicesReducers from "../../Pages/ServicesManagement/SystemServices/store/reducer";
import myListDashBoardReducers from "../../Pages/Admin_Home/store/reducer";
export default function createReducer() {
  const rootReducer = combineReducers({
    loginReducers,
    myListNewsReducers,
    usersReducers,
    myListDashBoardReducers,
    myListFormOnlineReducers,
    myListBookingServicesReducers,
    myListSystemServicesReducers,
  });
  return rootReducer;
}
