import React from "react";

export default function ProjectHome(props) {
    console.log(props.params);
  return (
    <div>
      <h1>ProjectID: {props.params.id}</h1>
    </div>
  );
}
