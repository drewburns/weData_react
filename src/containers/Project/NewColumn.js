import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import tableService from "../../services/tableService";

export default function NewColumn(props) {
  const [newColName, setNewColName] = useState("");

  const onChangeNewColName = (e) => {
    const name = e.target.value;
    setNewColName(name);
  };
  const addColumn = () => {
    if (!props.project.Query) {
      return;
    }
    tableService
      .newColumn(props.project.Query.id, newColName, props.jwt)
      .then((response) => {
        window.location.reload();
        // runQuery();
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-end",
        marginBottom: 5,
      }}
    >
      <TextField
        variant="outlined"
        size="small"
        placeholder="New column name"
        type="text"
        // className="form-control"
        style={{ width: 300, marginRight: 5 }}
        name="query"
        value={newColName}
        onChange={onChangeNewColName}
      />
      <Button
        size="small"
        variant="contained"
        // color="primary"
        onClick={() => addColumn()}
      >
        Add Column
      </Button>
    </div>
  );
}
