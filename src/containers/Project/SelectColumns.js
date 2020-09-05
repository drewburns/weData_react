import React from "react";
import tableService from "../../services/tableService";

export default function SelectColumns(props) {
  const updateHideCols = (e) => {
    const colID = e.target.name;
    const index = props.hideCols.findIndex((c) => c.id === colID);
    if (index === -1) {
      const newHide = [...props.hideCols];
      newHide.push({ id: colID });
      props.setHideCols(newHide);
    } else {
      var newHide = [...props.hideCols];
      newHide = newHide.filter((c) => c.id !== colID);
      props.setHideCols(newHide);
    }
    tableService
      .toggleHideColumn(props.project.Query.id, colID, props.jwt)
      .then((response) => {
        // console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log(columns);
  };

  const isChecked = (c) => {
    const index = props.hideCols.findIndex((c2) => c.id === c2.id);
    return index === -1;
  };

  const listItems = props.columns.map((c) => (
    <div>
      <label>
        {c.id !== props.project.Query.p_key && (
          <input
            name={c.id}
            type="checkbox"
            checked={isChecked(c)}
            onChange={updateHideCols}
          />
        )}
        {c.title()}
      </label>
    </div>
  ));
  return (
    <div>
      <h5>Select Columns</h5>
      {listItems}
    </div>
  );
}
