import React, { useEffect, useState } from "react";
import tableService from "../../services/tableService";

export default function QueryForm(props) {
  const [link, setLink] = useState(
    props.project.Query ? props.project.Query.link : ""
  );
  const [pKey, setPKey] = useState(
    props.project.Query ? props.project.Query.p_key : ""
  );
  useEffect(() => {
    // console.log(props.query);
  }, []);
  const onChangeLink = (e) => {
    const link = e.target.value;
    setLink(link);
  };

  const onChangePKey = (e) => {
    const pKey = e.target.value;
    setPKey(pKey);
  };

  const upsertQuery = (e) => {
    e.preventDefault();
    const query_id = props.project.Query ? props.project.Query.id : null;
    const name = "query";
    tableService
      .upsertQuery(query_id, name, pKey, link, props.project.id, props.jwt)
      .then((response) => {
        // TODO: make this refresh the project page maybe idk.
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <form onSubmit={upsertQuery}>
        <label>
          Link:
          <input
            type="text"
            // className="form-control"
            style={{ width: 300 }}
            name="query"
            value={link}
            onChange={onChangeLink}
          />
        </label>
        <label>
          Primary Key:
          <input
            type="text"
            // className="form-control"
            style={{ width: 300 }}
            name="query"
            value={pKey}
            onChange={onChangePKey}
          />
        </label>
        <input type="submit" value="Save" />
      </form>
    </div>
  );
}
