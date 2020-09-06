import React, { useState, useEffect } from "react";
import { Dialog, Button, Grid, Paper, Card } from "@material-ui/core";
import CreateTemplate from "./CreateTemplate";
import templateService from "../../../services/templateService";
import { Link } from "react-router-dom";

export default function ListTemplates(props) {
  const [open, setOpen] = useState(false);
  const [templates, setTemplates] = useState([]);

  const fetchTemplates = () => {
    templateService
      .fetch(props.jwt)
      .then((response) => {
        setTemplates(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    fetchTemplates();
  }, []);

  const listTemplates = templates.map((template) => (
    <Grid item xs={6} md={6} lg={6}>
      <Paper elevation={2} style={{ textAlign: "center" }}>
        <Card style={{ backgroundColor: "#F5F5F5", padding: 10 }}>
          {/* <li style={{ listStyleType: "none" }} key={project.id}> */}
          <h5>{template.name}:</h5>
          <p>{template.description}</p>
          <hr></hr>
          <p style={{ wordWrap: "break-word" }}>API URL: {template.link}</p>
          <p>PrimaryKey: {template.primary_key}</p>
          {/* <p style={{ margin: 0 }}>Companies in project:</p> */}
          {/* </li> */}
        </Card>
      </Paper>
    </Grid>
  ));

  return (
    <div>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Create new template
      </Button>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        <CreateTemplate
          jwt={props.jwt}
          company={props.company}
          setOpen={setOpen}
          fetchTemplates={fetchTemplates}
        />
      </Dialog>
      <hr></hr>
      <Grid container spacing={3}>
        {listTemplates}
      </Grid>
    </div>
  );
}
