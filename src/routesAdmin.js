import React from "react";
import {
  Home,
  ErrPage,
  Login,
  Logout,
  Dashboard,
  News,
  UserManagement,
  Feedbacks,
  FormOnline,
  ListBookingServices,
  SystemServices,
  Admin_Home,
} from "./Pages";
const routes = [
  { path: "/dashboard", component: () => <Admin_Home /> },
  { path: "/users", component: () => <UserManagement /> },
  { path: "/news", component: () => <News /> },
  { path: "/feedbacks", component: () => <Feedbacks /> },
  { path: "/form-online", component: () => <FormOnline /> },
  { path: "/services/booking", component: () => <ListBookingServices /> },
  { path: "/services/system", component: () => <SystemServices /> },

  { path: "/login", component: () => <Login /> },
  { path: "/logout", component: () => <Logout /> },
  { path: "/*", component: () => <ErrPage /> },
];

export default routes;
