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

import Collapse from '@material-ui/core/Collapse';
import Alert from '@material-ui/lab/Alert';


export default function App() {
  const { state, setState } = useContext(GlobalContext);

  // console.log(state);
  const logOut = () => {
    AuthService.logout();
  };
  return (
    <React.Fragment>
        {state.currentUserID ? (
          <DashboardHeader/>
        ) : (
          <HomeHeader/>
        )}
        <Collapse in={state.alert.isAlert} exit={1000} style={{position:'absolute', width:'100%'}}>
          <Alert severity={state.alert.type} >{state.alert.message}</Alert>
        </Collapse>
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
        </Switch>
    </React.Fragment>
  );
}
