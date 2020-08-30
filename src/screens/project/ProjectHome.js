import React, { useEffect, useContext, useState } from "react";
import projectService from "../../services/projectService";
import { GlobalContext } from "../../utility/GlobalContext";
import ProjectTable from "../../containers/Project/ProjectTable";
import ProjectSheet from "../../containers/Project/ProjectSheet";

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
      <li key={prt.Company.id}>{prt.Company.name}</li>
    ));
  };
  return (
    <div>
      {/* <h1>ProjectID: {props.params.id}</h1> */}
      {project && (
        <div>
          <h1>Project: {project.name}</h1>
          <h3>Companies:</h3>
          {listCompanies(project.ProjectParticipants)}
          <hr></hr>
          {/* <ProjectTable /> */}
          <ProjectSheet project={project} />
        </div>
      )}
    </div>
  );
}
