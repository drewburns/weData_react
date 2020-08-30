import React, { useEffect, useState } from "react";

import { Grid, Input as GridInput, Select } from "react-spreadsheet-grid";
import projectService from "../../services/projectService";
import QueryForm from "./QueryForm";
import tableService from "../../services/tableService";

// const data = [
//   { shipmentID: 1, arrivalDate: "June 3,2020 4:40PM EST", port: "Los Angeles" },
//   { shipmentID: 2, arrivalDate: "June 3,2020 4:40PM EST", port: "Newark" },
//   { shipmentID: 3, arrivalDate: "June 3,2020 4:40PM EST", port: "Busan" },
// ];
export default function ProjectSheet(props) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [apiColumns, setApiColumns] = useState([]);
  const [newColName, setNewColName] = useState("");

  const onFieldChange = (row, field) => (value) => {
    // console.log(row, field);
    // Find the row that is being changed
    console.log("shit changed");
    // console.log(value);
    console.log(row);
    console.log(field);
    console.log(rows);
    console.log(columns);
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
          title: () => {
            return <span>{newKey}</span>;
          },
          id: newKey,
          value: (row, { focus }) => {
            // console.log(newKey);
            // console.log(row);
            return (
              <GridInput
                value={row[newKey]}
                // onChange={onFieldChange(row, newKey)}
                focus={focus}
              />
            );
          },
        });
      }
    }

    setRows(data);
    setAllColumns(columnData);
    setApiColumns(columnNames);
    // runQuery();
  };

  const setAllColumns = (dataColumns) => {
    if (!props.project.Query || !props.project.Query.Columns) {
      console.log("HERE!");
      return;
    }
    const additonalColumns = [];
    props.project.Query.Columns.forEach((c) => {
      additonalColumns.push({
        title: () => {
          return <span>{c.name}</span>;
        },
        id: c.id,
        value: (row, { focus }) => {
          return (
            <GridInput
              value={row[newColName]}
              onChange={onFieldChange(row, c.id)}
              focus={focus}
            />
          );
        },
      });
    });
    setColumns(dataColumns.concat(additonalColumns));
  };

  const addColumn = () => {
    if (!props.project.Query) {
      return;
    }
    tableService
      .newColumn(props.project.Query.id, newColName)
      .then((response) => {
        setColumns(
          columns.concat({
            title: () => {
              return <span>{newColName}</span>;
            },
            id: response.data.id,
            value: (row, { focus }) => {
              return (
                <GridInput
                  value={row[newColName]}
                  onChange={onFieldChange(row, response.data.id)}
                  focus={focus}
                />
              );
            },
          })
        );
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const runQuery = () => {
    // setRows(data);
    // transformData(data);
    if (!props.project.Query) {
      return;
    }
    projectService
      .runQuery(props.project.Query.link)
      .then((response) => { 
        // console.log(response.data);
        transformData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // useEffect(() => {
  //   console.log(props);
  //   runQuery();
  // }, []);

  useEffect(() => {
    runQuery();
  }, []);

  const onChangeNewColName = (e) => {
    const name = e.target.value;
    setNewColName(name);
  };
  return (
    <div style={{ marginBottom: 40 }}>
      <QueryForm project={props.project} />
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
          <input
            type="text"
            // className="form-control"
            style={{ width: 300 }}
            name="query"
            value={newColName}
            onChange={onChangeNewColName}
          />
          <button onClick={() => addColumn()}>Add Column</button>
        </div>
      )}
    </div>
  );
}
