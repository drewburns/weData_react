import React, { useEffect, useState, useRef } from "react";

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
  const [rawRowData, setRawRowData] = useState(null);
  const [userEntryColumnNames, setUserEntryColumnNames] = useState([]);

  const gridRef = useRef();

  const onFieldChange = (row, field) => (value) => {
    // Find the row that is being changed
    const pKey = props.project.Query.p_key;
    const theRowIndex = rows.findIndex((r) => r[pKey] === row[pKey]);
    // console.log(theRow);
    // TODO: make API CALL
    tableService
      .upsertDataPoint(row[pKey], value, field, props.jwt)
      .then((response) => {
        // console.log("update: ", rows);
        rows[theRowIndex][field] = value;
        setRows(rows);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const makeColumns = (rawData) => {
    var columnData = [];
    var columnNames = [];
    for (var key in rawData[0]) {
      if (
        rawData[0].hasOwnProperty(key) &&
        !userEntryColumnNames.includes(parseInt(key))
      ) {
        const newKey = `${key}`;
        columnNames.push(key);
        columnData.push({
          title: () => {
            return <span>{newKey}</span>;
          },
          id: newKey,
          value: (row, { focus }) => {
            // console.log("this: ", row[newKey]);
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

    const additionalColumns = generateAdditonalColumns();
    return { columnData, columnNames, additionalColumns };
  };

  const generateAdditonalColumns = () => {
    if (!props.project.Query || !props.project.Query.Columns) {
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
              value={row[c.id]}
              onChange={onFieldChange(row, c.id, rows, columns)}
              focus={focus}
            />
          );
        },
      });
    });

    return additonalColumns;
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

  // TODO: not very effiecent
  const mergeRowData = (defaultData, additonalData) => {
    var newData = [...defaultData];
    const pKey = props.project.Query.p_key;
    additonalData.forEach((point) => {
      const theRowIndex = newData.findIndex(
        (r) => r[pKey].toString() === point.p_key_value
      );
      // detheRowIndex);
      // Object.assign(newData[theRowIndex], { [point.column_id]: point.value });
      newData[theRowIndex][point.column_id] = point.value;
      // defaultData[column_id.toString()] =
    });
    return newData;
  };

  useEffect(() => {
    // runQuery();
    if (!props.project.Query) {
      return;
    }
    const pKey = props.project.Query.p_key;
    projectService
      .runQuery(props.project.Query.link, props.jwt)
      .then((response) => {
        const columnIDs = props.project.Query.Columns.map((c) => c.id);
        const pKeyValues = response.data.map((r) => r[pKey]);
        tableService
          .dataForPKeysColumns(pKeyValues, columnIDs, props.jwt)
          .then((res2) => {
            setUserEntryColumnNames(columnIDs);
            const mergedData = mergeRowData(response.data, res2.data);
            setRawRowData(mergedData);
            // gridRef.current.focusCell({ x: 0, y: 0 });
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  useEffect(() => {
    if (rawRowData) {
      setRows(rawRowData);
      // console.log("rowData[0]: ", rawRowData[0]);
      // console.log("Object.keys(rawRowData[0]): ", Object.keys(rawRowData[0]));
      const { columnData, columnNames, additionalColumns } = makeColumns(
        rawRowData
      );

      setColumns(columnData.concat(additionalColumns));
      setApiColumns(columnNames);
    }
  }, [rawRowData, rows]);

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
            ref={gridRef}
            columns={columns}
            rowHeight={60}
            rows={rows} // <== HERE IT LOADS ROWS FINE
            // disabledCellChecker={(row, columnId) => {
            //   // console.log(columnId);
            //   return apiColumns.includes(columnId);
            // }}
            // isColumnsResizable
            // focusOnSingleClick
            getRowKey={(row) => row[props.project.Query.p_key]}
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
