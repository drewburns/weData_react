var _ = require("lodash");

export const sortRows = (id, direction, rows, setRawRowData) => {
  var rowCopy = [...rows];
  console.log(rows);
  rowCopy = _.sortBy(rowCopy, id);
  if (direction === "ASC") {
    setRawRowData(rowCopy.reverse());
  } else {
    setRawRowData(rowCopy);
  }
};

export const mergeRowData = (defaultData, additonalData, p_key) => {
  var newData = [...defaultData];
  const pKey = p_key;
  additonalData.forEach((point) => {
    const theRowIndex = newData.findIndex(
      (r) => r[pKey].toString() === point.p_key_value
    );
    newData[theRowIndex][point.column_id] = point.value;
  });
  return newData;
};

