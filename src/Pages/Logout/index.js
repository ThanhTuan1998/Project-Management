import { React, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "../Login";

const Logout = () => {
  const navigate = useNavigate();
  const user = localStorage.getItem("user");

  useEffect(() => {
    if (user) {
      document.cookie = "token =";
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <Login />
    </div>
  );
};
export default Logout;
