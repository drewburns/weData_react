import React, { useEffect, useState, useRef } from "react";

import {
  Grid as Spreadsheet,
  Input as GridInput,
  Select,
} from "react-spreadsheet-grid";
import projectService from "../../services/projectService";
import QueryForm from "./QueryForm";
import tableService from "../../services/tableService";
import {
  TextField,
  Button,
  Grid,
  MenuItem,
  Menu,
  IconButton,
} from "@material-ui/core";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SelectColumns from "./SelectColumns";

var _ = require("lodash");

export default function ProjectSheet(props) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [apiColumns, setApiColumns] = useState([]);
  const [newColName, setNewColName] = useState("");
  const [rawRowData, setRawRowData] = useState(null);
  const [hideCols, setHideCols] = useState([]);
  const [userEntryColumnNames, setUserEntryColumnNames] = useState([]);
  const [openColMenu, setOpenColMenu] = useState({});

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
        const newRows = [...rows];
        newRows[theRowIndex][field] = value;
        setRows(newRows);
        // gridRef.current.focusCell({ x: 0, y: 0 });
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
            return (
              <Grid container>
                <Grid item xs={8}>
                  <p style={{ marginTop: 15 }}>{newKey}</p>
                </Grid>
                {/* <button onClick={() => deleteCol(c.id.toString())}>
                    Delete
                  </button> */}
                <Grid item xs={4}>
                  {colMenu(newKey, false)}
                </Grid>
              </Grid>
            );
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

  const deleteCol = async (columnID) => {
    // TODO: try not to refresh the whole page again

    await tableService
      .deleteColumn(columnID, props.jwt)
      .then((response) => {
        console.log(response.data);
        // then run query for now
        window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const colMenu = (id, canDelete) => {
    return (
      <div>
        <IconButton
          // style={{height: 20}}
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onClick={(e) => setOpenColMenu({ id, anchor: e.currentTarget })}
        >
          <MoreVertIcon />
        </IconButton>
        <Menu
          id="simple-menu"
          keepMounted
          anchorEl={openColMenu.anchor}
          open={openColMenu.id === id.toString()}
          onClose={() => setOpenColMenu({})}
        >
          <MenuItem
            onClick={() => {
              sortRows(id, "ASC");
              setOpenColMenu({});
            }}
          >
            Sort ASC
          </MenuItem>
          <MenuItem
            onClick={() => {
              sortRows(id, "DESC");
              setOpenColMenu({});
            }}
          >
            Sort DESC
          </MenuItem>
          {canDelete && (
            <MenuItem
              onClick={() => {
                deleteCol(id.toString());
                setOpenColMenu({});
              }}
            >
              Delete
            </MenuItem>
          )}
        </Menu>
      </div>
    );
  };

  const generateAdditonalColumns = () => {
    if (!props.project.Query || !props.project.Query.Columns) {
      return;
    }
    const additonalColumns = [];
    props.project.Query.Columns.forEach((c) => {
      additonalColumns.push({
        title: () => {
          return (
            <Grid container>
              <Grid item xs={8}>
                <p style={{ marginTop: 15 }}>{c.name}</p>
              </Grid>
              {/* <button onClick={() => deleteCol(c.id.toString())}>
                  Delete
                </button> */}
              <Grid item xs={4}>
                {colMenu(c.id.toString(), true)}
              </Grid>
            </Grid>
          );
        },
        id: c.id.toString(),
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
      .newColumn(props.project.Query.id, newColName, props.jwt)
      .then((response) => {
        window.location.reload();
        // setColumns(
        //   columns.concat({
        //     title: () => {
        //       return (
        //         <Grid container>
        //           <Grid item xs={8}>
        //             <p style={{ marginTop: 15 }}>{newColName}</p>
        //           </Grid>
        //           {/* <button onClick={() => deleteCol(c.id.toString())}>
        //             Delete
        //           </button> */}
        //           <Grid item xs={4}>
        //             {colMenu(response.data.id.toString(), true)}
        //           </Grid>
        //         </Grid>
        //       );
        //     },
        //     name: newColName,
        //     id: response.data.id.toString(),
        //     value: (row, { focus }) => {
        //       return (
        //         <GridInput
        //           value={row[newColName]}
        //           onChange={onFieldChange(row, response.data.id)}
        //           focus={focus}
        //         />
        //       );
        //     },
        //   })
        // );
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
      newData[theRowIndex][point.column_id] = point.value;
    });
    return newData;
  };

  const runQuery = () => {
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
  };
  useEffect(() => {
    // runQuery();
    if (!props.project.Query) {
      return;
    }
    runQuery();
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
      const hiddens_cols = props.project.Query.hidden_columns;
      if (!hiddens_cols) {
        setHideCols([]);
      } else {
        var colArray = [];
        hiddens_cols
          .split(",")
          .forEach((i) => colArray.push({ id: i.toString() }));
        setHideCols(colArray);
      }
    }
  }, [rawRowData, rows, openColMenu]);

  const onChangeNewColName = (e) => {
    const name = e.target.value;
    setNewColName(name);
  };

  const sortRows = (id, direction) => {
    var rowCopy = [...rows];
    console.log(rows);
    rowCopy = _.sortBy(rowCopy, id);
    if (direction === "ASC") {
      setRawRowData(rowCopy.reverse());
    } else {
      setRawRowData(rowCopy);
    }
  };

  return (
    <div style={{ marginBottom: 40 }}>
      <Button
        // size="small"
        variant="contained"
        // color="primary"
        onClick={() => runQuery()}
      >
        Refresh
      </Button>
      {rows.length > 0 && (
        <div>
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
          <Grid container>
            <Grid item xs={3}>
              <SelectColumns
                columns={columns}
                hideCols={hideCols}
                setHideCols={setHideCols}
                project={props.project}
                jwt={props.jwt}
              />
            </Grid>
            <Grid item xs={9}>
              {columns && (
                <Spreadsheet
                  ref={gridRef}
                  columns={_.differenceBy(columns, hideCols, "id")}
                  rowHeight={60}
                  rows={rows}
                  // disabledCellChecker={(row, columnId) => {
                  //   // console.log(columnId);
                  //   return apiColumns.includes(columnId);
                  // }}
                  // isColumnsResizable
                  // focusOnSingleClick
                  getRowKey={(row) => row[props.project.Query.p_key]}
                />
              )}
            </Grid>
          </Grid>
          <hr></hr>
        </div>
      )}
      <QueryForm project={props.project} jwt={props.jwt} />
    </div>
  );
}
