import React, { useEffect, useState } from "react";
import tableService from "../../services/tableService";
import { Dialog, Button } from "@material-ui/core";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";

export default function QueryForm(props) {
  const [link, setLink] = useState(
    props.project.Query ? props.project.Query.link : ""
  );
  const [pKey, setPKey] = useState(
    props.project.Query ? props.project.Query.p_key : ""
  );

  const [open, setOpen] = useState(false);
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
        window.location.reload();
        // setOpen(false);
        // props.runQuery();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div>
      <div style={{ display: "flex", marginBottom: 10 }}>
        <p style={{ marginTop: 10, marginRight: 8 }}>
          {link ? (
            <span>
              Loading: <span style={{ fontStyle: "italic" }}>{link}</span>
            </span>
          ) : (
            `No query yet`
          )}
        </p>
        <Button
          style={{
            maxWidth: "140px",
            maxHeight: "40px",
            minWidth: "140px",
            minHeight: "40px",
          }}
          size="small"
          variant="contained"
          onClick={() => setOpen(true)}
        >
          {link ? "Update Query" : "Create Query"}
        </Button>
      </div>
      <Dialog
        onClose={() => setOpen(false)}
        aria-labelledby="simple-dialog-title"
        open={open}
      >
        {/* <h4 style={{ textAlign: "center" }}>Update Query</h4> */}
        <div
          style={{
            height: 300,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            width: 450,
          }}
        >
          <Form onSubmit={upsertQuery}>
            <div>
              <label>
                Link:
                <Input
                  type="text"
                  // className="form-control"
                  style={{ width: 300 }}
                  name="query"
                  value={link}
                  onChange={onChangeLink}
                />
              </label>
            </div>
            <div>
              <label>
                Primary Key:
                <Input
                  type="text"
                  // className="form-control"
                  style={{ width: 300 }}
                  name="query"
                  value={pKey}
                  onChange={onChangePKey}
                />
              </label>
            </div>
            {/* <Button variant="contained" color="primary">
              Save
            </Button> */}
            <Input
              className={"btn btn-primary btn-block"}
              type="submit"
              value="Save"
            />
          </Form>
        </div>
      </Dialog>
    </div>
  );
}
