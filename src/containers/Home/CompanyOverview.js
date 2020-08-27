import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import companyService from "../../services/companyService";
import projectService from "../../services/projectService";
import CreateProject from "./CreateProject";

export default function CompanyOverview(props) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState([]);
  const [email, setEmail] = useState("");
  //   const [message, setMessage] = useState("");

  const form = useRef();
  const checkBtn = useRef();

  const fetchMembers = (id, jwt) => {
    companyService
      .members(id, jwt)
      .then((response) => {
        setMembers(response.data.members);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

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
  useEffect(() => {
    fetchMembers(props.company.id, props.jwt);
    fetchProjects(props.jwt);
  }, []);

  const refreshProjects = () => {
    fetchProjects(props.jwt);
  };
  const listItems = members.map((d) => <li key={d.id}>{d.email}</li>);
  const listCompanies = (participants) => {
    return participants.map((prt) => (
      <li key={prt.Company.id}>{prt.Company.name}</li>
    ));
  };

  const listProjects = projects.map((project) => (
    <li style={{listStyleType:"none"}} key={project.id}>
      <h5>{project.name}</h5>
      <p>Companies in Project:</p>
      {listCompanies(project.ProjectParticipants)}
    </li>
  ));

  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };

  const addTeamMember = (e) => {
    e.preventDefault();
    setLoading(true);

    form.current.validateAll();
    companyService
      .addMember(email, props.company.id, props.jwt)
      .then((response) => {
        fetchMembers(props.company.id, props.jwt);
        setLoading(false);
      })
      .catch((error) => {
        // TODO: do something
        setLoading(false);
        // setMessage(resMessage);
      });
  };

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
  };
  return (
    <div>
      <h4>{props.company.name}</h4>
      <h4>Current members:</h4>
      {listItems}
      <hr></hr>
      <h5>Add Team Member</h5>
      <Form onSubmit={addTeamMember} ref={form}>
        <div className="form-group">
          <label htmlFor="username">Company Name</label>
          <Input
            type="text"
            className="form-control"
            name="email"
            value={email}
            onChange={onChangeEmail}
            validations={[required]}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Add User</span>
          </button>
        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
      <hr></hr>
      <h3>Projects</h3>
      {listProjects}
      <CreateProject jwt={props.jwt} fetchProjects={refreshProjects} />
    </div>
  );
}
