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

import DashboardHeader from './containers/DashboardHeader';
import HomeHeader from './containers/HomeHeader';

import DashboardHeader from './containers/DashboardHeader';
import HomeHeader from './containers/HomeHeader';

export default function App() {
  const { state, setState } = useContext(GlobalContext);

  // console.log(state);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <div>
      {/* <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to={"/"} className="navbar-brand">
          WeData
        </Link>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/home"} className="nav-link">
              Home
            </Link>
          </li>

          {state.currentUserID && (
            <li className="nav-item">
              <Link to={"/user"} className="nav-link">
                User
              </Link>
            </li>
          )}
        </div> */}

        {state.currentUserID ? (
          <DashboardHeader/>
        ) : (
          <HomeHeader/>
        )}
      {/* </nav> */}
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={SignUp} />
          <Route
            exact={true}
            path="/dashboard"
            component={Dashboard}
          />
          <ProtectedRoute path="/project/:id" component={ProjectHome}/>
          {/* <ProtectedRoute component={Dashboard} /> */}
        </Switch>
    </div>
  );
}
