import React, { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import tableService from "../../services/tableService";
import { toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

export default function NewColumn(props) {
  const [newColName, setNewColName] = useState("");

  const onChangeNewColName = (e) => {
    const name = e.target.value;
    setNewColName(name);
  };
  const addColumn = () => {
    if (!props.jwt) {
      toast.error("Error, must sign in.", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
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
