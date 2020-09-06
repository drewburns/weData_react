import React, { useEffect, useState } from "react";
import projectService from "../../services/projectService";

import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import { Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import { Card, Typography, List, Button, Avatar } from "@material-ui/core";

const ColorButton = withStyles((theme) => ({
  root: {
    color: theme.palette.getContrastText(blue[700]),
    backgroundColor: blue[500],
    "&:hover": {
      backgroundColor: blue[700],
    },
  },
}))(Button);

export default function CompanyProjects(props) {
  const listCompanies = (participants) => {
    return participants.map((prt) => (
      <Grid item>
        <li
          style={{ listStyleType: "none", marginBottom: 10 }}
          key={prt.Company.id}
        >
          <ColorButton variant="contained" color="primary" size="small">
            {prt.Company.name}
          </ColorButton>
        </li>
      </Grid>
    ));
  };

  const listProjects = props.projects.map((project) => (
    <Grid item xs={6} md={6} lg={6}>
      <Paper elevation={2} style={{ textAlign: "center" }}>
        <Card style={{ backgroundColor: "#F5F5F5", padding: 10 }}>
          {/* <li style={{ listStyleType: "none" }} key={project.id}> */}
          <Link style={{ color: "black" }} to={`project/${project.id}`}>
            <h5 style={{ textAlign: "center" }}>{project.name}</h5>
          </Link>
          {/* <p style={{ margin: 0 }}>Companies in project:</p> */}
          <Grid spacing={3}>{listCompanies(project.ProjectParticipants)}</Grid>
          {/* </li> */}
        </Card>
      </Paper>
    </Grid>
  ));
  return (
    <div>
      <Button
        variant="contained"
        onClick={() => props.setShowTab("NewProject")}
      >
        Create a new project
      </Button>
      <hr></hr>
      <h4>Projects</h4>
      <Grid container spacing={3}>
        {listProjects}
      </Grid>
    </div>
  );
}
