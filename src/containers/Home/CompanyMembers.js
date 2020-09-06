import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import companyService from "../../services/companyService";

export default function CompanyMembers(props) {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  useEffect(() => {
    fetchMembers(props.company.id, props.jwt);
  }, []);
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
  const required = (value) => {
    if (!value) {
      return (
        <div className="alert alert-danger" role="alert">
          This field is required!
        </div>
      );
    }
  };
  const listItems = members.map((d) => (
    <li key={d.id}>
      {d.name ? `${d.name}: ` : ""}
      {d.email}
    </li>
  ));

  const onChangeEmail = (e) => {
    const email = e.target.value;
    setEmail(email);
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
  return (
    <div>
      {" "}
      <h4>Current members:</h4>
      {listItems}
      <hr></hr>
      <h5>Add Team Member</h5>
      <Form onSubmit={addTeamMember} ref={form}>
        <div className="form-group">
          <label htmlFor="username">Email for user</label>
          <Input
            type="text"
            className="form-control"
            name="email"
            placeholder={"joe@smith.com"}
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
    </div>
  );
}
