import React, { useEffect, useState, useRef } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import TextArea from "react-validation/build/textarea";
import CheckButton from "react-validation/build/button";
import templateService from "../../../services/templateService";

export default function CreateTemplate(props) {
  const [loading, setLoading] = useState(false);
  const [projectName, setProjectName] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [primaryKey, setPrimaryKey] = useState("");
  const [link, setLink] = useState("");
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

  const createTemplate = (e) => {
    e.preventDefault();
    setLoading(true);
    form.current.validateAll();
    templateService
      .create(name, description, link, primaryKey, props.jwt)
      .then((response) => {
        // props.fetch
        props.fetchTemplates();
        setLoading(false);
        props.setOpen(false);
      })
      .catch((error) => {
        // TODO: do something
        setLoading(false);
        // setMessage(resMessage);
      });
  };

  const onChangeName = (e) => {
    const name = e.target.value;
    setName(name);
  };

  const onChangeDescription = (e) => {
    const desc = e.target.value;
    setDescription(desc);
  };

  const onChangeLink = (e) => {
    const link = e.target.value;
    setLink(link);
  };
  const onChangePKey = (e) => {
    const pKey = e.target.value;
    setPrimaryKey(pKey);
  };

  return (
    <div style={{ width: 500, padding: 20 }}>
      <h4>Create Template</h4>
      <Form onSubmit={createTemplate} ref={form}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <Input
            type="text"
            className="form-control"
            name="name"
            placeholder={"Template name"}
            value={name}
            onChange={onChangeName}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <TextArea
            // type="text"
            className="form-control"
            name="description"
            placeholder={"Description for team members"}
            value={description}
            onChange={onChangeDescription}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Link (this is your API endpoint)</label>
          <Input
            type="text"
            className="form-control"
            name="link"
            placeholder={"https://api.test.com/all"}
            value={link}
            onChange={onChangeLink}
            validations={[required]}
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">
            Primary Key (the primary key that will be associated with your data)
          </label>
          <Input
            type="text"
            className="form-control"
            name="name"
            placeholder={"userID"}
            value={primaryKey}
            onChange={onChangePKey}
            validations={[required]}
          />
        </div>

        <div className="form-group">
          <button className="btn btn-primary btn-block" disabled={loading}>
            {loading && (
              <span className="spinner-border spinner-border-sm"></span>
            )}
            <span>Create Template</span>
          </button>
        </div>
        <CheckButton style={{ display: "none" }} ref={checkBtn} />
      </Form>
    </div>
  );
}
