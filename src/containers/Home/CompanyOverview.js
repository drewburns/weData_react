import React, { useEffect, useState, useRef } from "react";
import projectService from "../../services/projectService";
import CompanyMembers from "./CompanyMembers";

import clsx from "clsx";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import PeopleIcon from "@material-ui/icons/People";
import AssignmentIcon from "@material-ui/icons/Assignment";
import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
// styles
import dashboardStyles from "../../styles/dashboard-styles";
import CompanyProjects from "./CompanyProjects";
import CreateProject from "./CreateProject";

export default function CompanyOverview(props) {
  const classes = dashboardStyles();
  const [projects, setProjects] = useState([]);
  const [showTab, setShowTab] = useState("Projects");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(true);
  const handleDrawerOpen = () => {
    setOpen(true);
  };
  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchProjects(props.jwt);
  }, []);

  const fetchProjects = (jwt) => {
    projectService
      .fetch(jwt)
      .then((response) => {
        // console.log(response.data);
        setProjects(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const refreshProjects = () => {
    fetchProjects(props.jwt);
  };
  return (
    <div className={classes.root}>
      <Drawer
        variant="permanent"
        classes={{
          paper: clsx(classes.drawerPaper, !open && classes.drawerPaperClose),
        }}
        open={open}
      >
        <div className={classes.toolbarIcon}>
          <IconButton onClick={open ? handleDrawerClose : handleDrawerOpen}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <List>
          <ListItem button onClick={() => setShowTab("Projects")}>
            <ListItemIcon>
              <DashboardIcon />
            </ListItemIcon>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button onClick={() => setShowTab("Team")}>
            <ListItemIcon>
              <PeopleIcon />
            </ListItemIcon>
            <ListItemText primary="Team" />
          </ListItem>
          <ListItem button onClick={() => setShowTab("NewProject")}>
            <ListItemIcon>
              <AssignmentIcon />
            </ListItemIcon>
            <ListItemText primary="New Project" />
          </ListItem>
        </List>
      </Drawer>
      <main className={classes.content}>
        {/* <div className={classes.appBarSpacer} /> */}
        <Container maxWidth="lg" className={classes.container}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8} lg={9}>
              <h4>{props.company.name}</h4>
              {showTab === "Projects" && (
                <CompanyProjects jwt={props.jwt} projects={projects} />
              )}
              {showTab === "Team" && (
                <CompanyMembers jwt={props.jwt} company={props.company} />
              )}
              {showTab === "NewProject" && (
                <CreateProject
                  jwt={props.jwt}
                  fetchProjects={refreshProjects}
                />
              )}
            </Grid>
          </Grid>
        </Container>
      </main>
    </div>
  );
}
