import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import projectService from "../../services/projectService";
import AddCompanies from "./AddCompanies";
import Autocomplete from "@material-ui/lab/Autocomplete";
import TextField from "@material-ui/core/TextField";
import templateService from "../../services/templateService";

export default function CreateProject(props) {
  const [loading, setLoading] = useState(false);
  const [companyTags, setCompanyTags] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [templates, setTemplates] = useState([]);
  const [templateValue, setTemplateValue] = useState({});
  //   const [tags, setTags] = useState([]);
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

  const createProject = (e) => {
    e.preventDefault();
    const companyIds = companyTags.map((c) => c.id);
    if (companyIds.length === 0) {
      setLoading(false);
    }
    setLoading(true);
    form.current.validateAll();
    projectService
      .create(projectName, companyIds, templateValue, props.jwt)
      .then((response) => {
        // props.fetch
        props.fetchProjects();
        setLoading(false);
        props.refreshProjects();
        props.setShowTab("Projects");
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

  //   const onChangeCompanyIds = (e) => {
  //     const ids = e.target.value;
  //     setCompanyIds(ids);
  //   };
  return (
    <div>
      <h4>Create Project</h4>
      <Form onSubmit={createProject} ref={form}>
        <div className="form-group">
          <label htmlFor="username">Project Name</label>
          <Input
            type="text"
            className="form-control"
            name="projectName"
            placeholder={"Project name"}
            value={projectName}
            onChange={onChangeProjectName}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="tags">Companies</label>
          <AddCompanies
            tags={companyTags}
            setTags={setCompanyTags}
            jwt={props.jwt}
          />
        </div>

        <div className="form-group">
          <label htmlFor="template">Template</label>
          <Autocomplete
            id="combo-box-demo"
            options={templates}
            getOptionLabel={(template) => template.name}
            renderOption={(template) => (
              <div>
                <div>
                  <span>{template.name}:</span>
                </div>
                <div>
                  <span style={{ fontStyle: "italic", fontSize: 12 }}>
                    {template.description}
                  </span>
                </div>
              </div>
            )}
            value={templateValue}
            onChange={(event, newValue) => {
              setTemplateValue(newValue);
            }}
            // inputValue={inputValue}
            // onInputChange={(event, newInputValue) => {
            //   setInputValue(newInputValue);
            // }}
            style={{ width: 300 }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Select Template"
                variant="outlined"
              />
            )}
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
