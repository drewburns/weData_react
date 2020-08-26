import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import projectService from "../../services/projectService";

export default function CreateProject(props) {
  const [loading, setLoading] = useState(false);
  const [companyIds, setCompanyIds] = useState("");
  const [projectName, setProjectName] = useState("");

  const form = useRef();
  const checkBtn = useRef();

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const createProject = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    projectService
      .create(projectName, companyIds.split(","), props.jwt)
      .then((response) => {
        // props.fetch
        props.fetchProjects()
        setLoading(false);
      })
      .catch((error) => {
        // TODO: do something
        setLoading(false);
        // setMessage(resMessage);
      });
  };

  const onChangeProjectName = (e) => {
    const name = e.target.value;
    setProjectName(name);
  };

  const onChangeCompanyIds = (e) => {
    const ids = e.target.value;
    setCompanyIds(ids);
  };
  return (
    <div>
      <h3>Create Project</h3>
      <Form onSubmit={createProject} ref={form}>
        <div className="form-group">
          <label htmlFor="username">Project Name</label>
          <Input
            type="text"
            className="form-control"
            name="projectName"
            value={projectName}
            onChange={onChangeProjectName}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Companies</label>
          <Input
            type="text"
            className="form-control"
            name="companyIds"
            value={companyIds}
            onChange={onChangeCompanyIds}
            validations={[required]}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Create Project</span>
          </button>
        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
}
