import React, { useEffect, useState, useRef, useCallback } from "react";

import {
  Grid as Spreadsheet,
  Input as GridInput,
  Select,
} from "react-spreadsheet-grid";
import projectService from "../../services/projectService";
import QueryForm from "./QueryForm";
import tableService from "../../services/tableService";
import {
  Button,
  Grid,
  MenuItem,
  Menu,
  IconButton,
  Popover,
} from "@material-ui/core";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import SelectColumns from "./SelectColumns";
import NewColumn from "./NewColumn";
import InfoPopover from "./InfoPopover";
import { sortRows, mergeRowData } from "./dataHelpers";
import { deleteCol } from "./sheetHelpers";

var _ = require("lodash");

export default function ProjectSheet(props) {
  const [rows, setRows] = useState([]);
  const [columns, setColumns] = useState([]);
  const [apiColumns, setApiColumns] = useState([]);
  const [rawRowData, setRawRowData] = useState(null);
  const [hideCols, setHideCols] = useState([]);
  const [userEntryColumnNames, setUserEntryColumnNames] = useState([]);
  const [openColMenu, setOpenColMenu] = useState({});
  const [popoverContent, setPopoverContent] = useState(null);
  const [showSelect, setShowSelect] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleOpenPopover = (event, value) => {
    // alert("yolo!");
    setAnchorEl(event.currentTarget);
    setPopoverContent(value);
  };

  const handleClosePopover = () => {
    setAnchorEl(null);
  };

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
            const isObject = typeof row[newKey] === "object";
            const isArray = isObject && row[newKey].length > 0;
            if (isObject) {
              return (
                <div onMouseEnter={(e) => handleOpenPopover(e, row[newKey])}>
                  <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={(e) => handleOpenPopover(e, row[newKey])}
                  >
                    View Data
                  </Button>
                </div>
              );
            }
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
              sortRows(id, "ASC", rows, setRawRowData);
              setOpenColMenu({});
            }}
          >
            Sort ASC
          </MenuItem>
          <MenuItem
            onClick={() => {
              sortRows(id, "DESC", rows, setRawRowData);
              setOpenColMenu({});
            }}
          >
            Sort DESC
          </MenuItem>
          {canDelete && (
            <MenuItem
              onClick={() => {
                deleteCol(id.toString(), props.jwt);
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
            const mergedData = mergeRowData(response.data, res2.data, pKey);
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

  const onColumnResize = (widthValues) => {
    const newColumns = [].concat(columns);
    Object.keys(widthValues).forEach((columnId) => {
      const theColIndex = newColumns.findIndex((c) => c.id === columnId);
      newColumns[theColIndex].width = widthValues[columnId];
    });
    setColumns(newColumns);
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
          <InfoPopover
            anchorEl={anchorEl}
            handleClosePopover={handleClosePopover}
            popoverContent={popoverContent}
          />
          <NewColumn jwt={props.jwt} project={props.project} />
          <IconButton
            size="small"
            // variant="contained"
            onClick={() => setShowSelect(!showSelect)}
          >
            {showSelect ? "Close" : "Open"}
            {showSelect ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
          <Grid container>
            <Grid item xs={3}>
              {showSelect && (
                <SelectColumns
                  columns={columns}
                  hideCols={hideCols}
                  setHideCols={setHideCols}
                  project={props.project}
                  jwt={props.jwt}
                />
              )}
            </Grid>
            <Grid item xs={showSelect ? 9 : 12}>
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
                  isColumnsResizable
                  onColumnResize={onColumnResize}
                  getRowKey={(row) => row[props.project.Query.p_key]}
                />
              )}
            </Grid>
          </Grid>
          <hr></hr>
        </div>
      )}
      <QueryForm runQuery={runQuery} project={props.project} jwt={props.jwt} />
    </div>
  );
}
