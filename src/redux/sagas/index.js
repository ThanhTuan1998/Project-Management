import { all } from "redux-saga/effects";
import * as loginSagas from "../../Pages/Login/stores/sagas";
import * as listNewsSagas from "../../Pages/News/store/sagas";
import * as userSagas from "../../Pages/UserManagement/stores/sagas";
import * as formOnlineSaga from "../../Pages/FormOnline/store/saga";
import * as bookingServiceSaga from "../../Pages/ServicesManagement/ListBookingServices/store/saga";
import * as systemServiceSaga from "../../Pages/ServicesManagement/SystemServices/store/saga";
import * as DashBoard from "../../Pages/Admin_Home/store/saga";
export default function* () {
  yield all([
    loginSagas.requestLogin(),
    listNewsSagas.myListNewsSagas(),
    userSagas.listAccoutResident(),
    DashBoard.listMyDashBoard(),
    formOnlineSaga.listMyFormOnline(),
    bookingServiceSaga.listMyBookingServices(),
    systemServiceSaga.listMySystemServices(),
  ]);
}
