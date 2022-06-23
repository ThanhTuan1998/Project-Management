import "./App.css";
import { Login, Logout } from "./Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AdminPage from "./Common/AdminPage";
import UserPage from "./Common/UserPage";
import Admin from "./Common/AdminPage";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  // const onIdle = () => {
  //   localStorage.removeItem("token");
  //   window.location.href = "/login";
  // }

  return (
    <>
      {/* <IdleTimer 
      ref={(ref)=>{
        
      }}
      /> */}

      <BrowserRouter>
        <Routes>
          <Route path="/logout" element={<Logout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/administrator/*" element={<AdminPage />} />
          <Route path="/user/*" element={<UserPage />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      {/* Same as */}
      <ToastContainer />
    </>
  );
}

export default App;
