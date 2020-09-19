import React, { useEffect, useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import projectService from "../../services/projectService";
import { GlobalContext } from "../../utility/GlobalContext";
import ProjectSheet from "../../containers/Project/ProjectSheet";
import {
  Button,
  IconButton,
  FormControlLabel,
  Switch,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";

import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { useParams } from "react-router-dom";
import config from "../../config";

const env = process.env.NODE_ENV || "development";
const stage = config[env];
const API_URL = stage.base_url;

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
  const history = useHistory();

  const { state, setState } = useContext(GlobalContext);
  const [project, setProject] = useState(null);
  // console.log(props.params);
  const { id } = useParams();

  const mode = id ? "view" : "edit";

  useEffect(() => {
    fetchProject();
  }, [state.jwt]);

  const fetchProject = () => {
    if (state.jwt) {
      projectService
        .getProject(id || props.params.id, state.jwt, mode)
        .then((response) => {
          if (!response.data.shared) {
            history.push(`/project/${response.data.id}`);
          }
          setProject(response.data);
        })
        .catch((err) => {
          history.push(`/`);
        });
    } else {
      projectService
        .getProjectPublic(id || props.params.id)
        .then((response) => {
          if (!response.data.shared) {
            history.push("/login");
            return;
          }
          setProject(response.data);
        })
        .catch((err) => {
          history.push(`/`);
          console.log(err);
        });
    }
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

  const handleChangeShare = () => {
    projectService
      .toggleShareSettings(id || props.params.id, state.jwt)
      .then((response) => {
        // console.log(response);
        setProject(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      {/* <h1>ProjectID: {props.params.id}</h1> */}
      {project && (
        <div>
          <div style={{ display: "flex", flexDirection: "row" }}>
            <h3>Project: {project.name}</h3>
          </div>
          {listCompanies(project.ProjectParticipants)}
          <hr></hr>
          {mode === "edit" ? (
            <div style={{ display: "flex", flexDirection: "row" }}>
              <h6 style={{ marginTop: 8, marginRight: 10 }}>Share to web:</h6>
              <FormControlLabel
                control={
                  <Switch
                    checked={project.shared}
                    onChange={handleChangeShare}
                    name="checkedB"
                    color="primary"
                  />
                }
                // label="Share"
              />
              {project.shared && (
                <i
                  style={{ marginTop: 7 }}
                >{`${API_URL}/#/view/project/${project.share_uuid}`}</i>
              )}
            </div>
          ) : (
            <p>
              Public link: {`${API_URL}/#/view/project/${project.share_uuid}`}{" "}
            </p>
          )}
          <ProjectSheet project={project} jwt={state.jwt} mode={mode} />
        </div>
      )}
    </div>
  );
}
