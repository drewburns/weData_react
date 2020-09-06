import React, { useEffect, useContext, useState } from "react";
import projectService from "../../services/projectService";
import { GlobalContext } from "../../utility/GlobalContext";
import ProjectSheet from "../../containers/Project/ProjectSheet";
import { Button, IconButton } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

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

  // const deleteProject = () => {
  //   if (window.confirm("Delete the project?")) {
  //     // this.removeToCollection(11);

  //   }
  // }
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
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h3>Project: {project.name}</h3>
            {/* <IconButton
              color="primary"
              style={{ marginLeft: 10, marginTop: -5 }}
              onClick={deleteProject}
            >
              <DeleteIcon />
            </IconButton> */}
          </div>
          {/* <h4>Companies:</h4> */}
          {listCompanies(project.ProjectParticipants)}
          <hr></hr>
          <ProjectSheet project={project} jwt={state.jwt} />
        </div>
      )}
    </div>
  );
}
