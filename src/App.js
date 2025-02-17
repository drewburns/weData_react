import React, { useContext } from "react";
import ReactDOM from "react-dom";
import { Route, BrowserRouter, Switch, Link } from "react-router-dom";
import Login from "./screens/Login";
import SignUp from "./screens/SignUp";
import Home from "./screens/Home";
import AuthService from "./services/authService";
import Dashboard from "./screens/dashboard/Dashboard";
import ProtectedRoute from "./utility/ProtectedRoute";
import { GlobalContext } from "./utility/GlobalContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import ProjectHome from "./screens/project/ProjectHome";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  const { state, setState } = useContext(GlobalContext);

  // console.log(state);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
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

      <nav
        className="navbar navbar-expand navbar-dark"
        style={{ backgroundColor: "#fff", color: "#0092e0" }}
      >
        <Link
          to={"/"}
          className="navbar-brand"
          style={{
            marginLeft: "5%",
            color: "#0092e0",
            fontWeight: "bold",
            fontSize: "32px",
          }}
        >
          Quota
        </Link>
        {/* <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/"} className="nav-link" style={{ color: "white" }}>
              Home
            </Link>
          </li>
        </div> */}

        {state.currentUserID ? (
          <div className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link
                to={"/profile"}
                className="nav-link"
                style={{ color: "#0092e0" }}
              >
                Profile
              </Link>
            </li>
            <li className="nav-item">
              <a
                href="/"
                className="nav-link"
                onClick={logOut}
                style={{ color: "#0092e0" }}
              >
                LogOut
              </a>
            </li>
          </div>
        ) : (
          <div className="navbar-nav ml-auto" style={{ paddingRight: "15%" }}>
            <li className="nav-item">
              <Link
                to={"/login"}
                className="nav-link"
                style={{
                  color: "#0092e0",
                  fontSize: "17px",
                  paddingRight: "25px",
                }}
              >
                Login
              </Link>
            </li>

            <li className="nav-item">
              <Link
                to={"/signup"}
                className="nav-link"
                style={{ color: "#0092e0", fontSize: "17px" }}
              >
                Sign up
              </Link>
            </li>
          </div>
        )}
      </nav>
      <ToastContainer />
      <div className="container mt-3 col-lg-11">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route path="/view/project/:id" component={ProjectHome} />
          <ProtectedRoute
            exact={true}
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute path="/project/:id" component={ProjectHome} />
          {/* <ProtectedRoute component={Dashboard} /> */}
        </Switch>
      </div>
    </div>
  );
}