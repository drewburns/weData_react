import React, { useContext } from "react";
import { Redirect } from "react-router-dom";
import { GlobalContext } from "./GlobalContext";
const ProtectedRoute = (props) => {

  //   const { state, setState } = useContext(GlobalContext);
  //   console.log("state!");
  const jwt = localStorage.getItem("id_token");
  //   console.log(jwt);
  const Component = props.component;
  return jwt ? (
    <Component params={props.computedMatch.params} />
  ) : (
    <Redirect to={{ pathname: "/login" }} />
  );
};

export default ProtectedRoute;
