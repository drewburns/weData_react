import React, { useEffect, useState } from "react";
import projectService from "../../services/projectService";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";

export default function CompanyProjects(props) {
  const listCompanies = (participants) => {
    return participants.map((prt) => (
      <li key={prt.Company.id}>{prt.Company.name}</li>
    ));
  };

  const listProjects = props.projects.map((project) => (
    <Grid item xs={6} md={6} lg={6}>
      {/* <li style={{ listStyleType: "none" }} key={project.id}> */}
      <Link to={`project/${project.id}`}>
        <h5>{project.name}</h5>
      </Link>
      <p>Companies in Project:</p>
      {listCompanies(project.ProjectParticipants)}
      {/* </li> */}
    </Grid>
  ));
  return (
    <div>
      <h3>Projects</h3>
      <Grid container spacing={3}>
        {listProjects}
      </Grid>
    </div>
  );
}
