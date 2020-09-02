import React, { useEffect, useContext, useState } from "react";
import projectService from "../../services/projectService";
import { GlobalContext } from "../../utility/GlobalContext";
import ProjectSheet from "../../containers/Project/ProjectSheet";
import { Button } from "@material-ui/core";

import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[700]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  },
}))(Button);

export default function ProjectHome(props) {
  const { state, setState } = useContext(GlobalContext);
  const [project, setProject] = useState(null);
  // console.log(props.params);

  useEffect(() => {
    fetchProject();
  }, [state.jwt]);

  const fetchProject = () => {
    projectService
      .getProject(props.params.id, state.jwt)
      .then((response) => {
        setProject(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const listCompanies = (participants) => {
    return participants.map((prt) => (
      <li style={{ display: "inline", marginLeft: 10 }} key={prt.Company.id}>
        <ColorButton variant="contained">{prt.Company.name}</ColorButton>
      </li>
    ));
  };
  return (
    <div>
      {/* <h1>ProjectID: {props.params.id}</h1> */}
      {project && (
        <div>
          <h3>Project: {project.name}</h3>
          {/* <h4>Companies:</h4> */}
          {listCompanies(project.ProjectParticipants)}
          <hr></hr>
          <ProjectSheet project={project} jwt={state.jwt} />
        </div>
      )}
    </div>
  );
}
