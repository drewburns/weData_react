import React, { useEffect, useState } from "react";

import { Grid, Input as GridInput, Select } from "react-spreadsheet-grid";
import projectService from "../../services/projectService";

const data = [
  { shipmentID: 1, arrivalDate: "June 3,2020 4:40PM EST", port: "Los Angeles" },
  { shipmentID: 2, arrivalDate: "June 3,2020 4:40PM EST", port: "Newark" },
  { shipmentID: 3, arrivalDate: "June 3,2020 4:40PM EST", port: "Busan" },
];
export default function ProjectSheet() {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [apiColumns, setApiColumns] = useState([]);
  const [query, setQuery] = useState("http://localhost:8080/fakeData1");

  const onFieldChange = (row, field) => (value) => {
    // console.log(row, field);
    // Find the row that is being changed
    console.log("shit changed");
    // console.log(value);
    console.log(rows);
    // console.log(field);
    // console.log("rows:  ", rows);
    // console.log(row.shipmentID);
    // console.log();
    // const theRow = rows.find((r) => r.shipmentID === 1);
    // console.log(theRow);
    // Change a value of a field
    // row[field] = value;
    // setRows([].concat(rows))
  };

  // const onFieldChange = (row, field) => {
  //   console.log(rows);
  // };

  const transformData = (data) => {
    var columnData = [];
    var columnNames = [];
    for (var key in data[0]) {
      // check if the property/key is defined in the object itself, not in parent
      if (data[0].hasOwnProperty(key)) {
        // console.log(key, data[0][key]);
        const newKey = `${key}`;
        columnNames.push(key);
        // console.log(symbol);
        columnData.push({
          title: newKey,
          id: newKey,
          value: (row, { focus }) => {
            // console.log(newKey);
            // console.log(row);
            return (
              <GridInput
                value={row[newKey]}
                onChange={onFieldChange(row, newKey)}
                focus={focus}
              />
            );
          },
        });
      }
    }

    console.log("here!");
    setRows(data);
    setColumns(columnData);
    setApiColumns(columnNames);
    // runQuery();
  };

  const addColumn = () => {
    setColumns(
      columns.concat({
        title: "New",
        value: (row, { focus }) => {
          return (
            <GridInput
              value={row["New"]}
              onChange={onFieldChange(row, "New")}
              focus={focus}
            />
          );
        },
      })
    );
  };

  useEffect(() => {
    runQuery();
  }, []);

  const runQuery = () => {
    // setRows(data);
    // transformData(data);
    projectService
      .runQuery(query)
      .then((response) => {
        // console.log(response.data);
        transformData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const onChangeQuery = (e) => {
    const query = e.target.value;
    setQuery(query);
  };
  return (
    <div>
      <div>
        <input
          type="text"
          // className="form-control"
          style={{ width: 300 }}
          name="query"
          value={query}
          onChange={onChangeQuery}
        />
        <button onClick={runQuery}>Run Query</button>
      </div>
      {rows.length > 0 && (
        <div>
          <Grid
            columns={columns}
            rowHeight={60}
            rows={rows}
            // disabledCellChecker={(row, columnId) => {
            //   // console.log(columnId);
            //   return apiColumns.includes(columnId);
            // }}
            // isColumnsResizable
            getRowKey={(row) => row.id}
          />
          <hr></hr>
          <button onClick={() => addColumn()}>Add Column</button>
        </div>
      )}
    </div>
  );
}
