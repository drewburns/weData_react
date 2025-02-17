import axios from "axios";
import config from "./config";
const env = process.env.NODE_ENV || "development";
const stage = config[env];
const API_URL = stage.base_url + "/table/";

const upsertQuery = (query_id, name, p_key, link, project_id, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.post(
    API_URL + "upsertQuery",
    {
      query_id,
      name,
      p_key,
      link,
      project_id,
    },
    { headers: headers }
  );
};

const newColumn = (query_id, name, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.post(
    API_URL + "createColumn",
    {
      query_id,
      name,
    },
    { headers: headers }
  );
};

const upsertDataPoint = (pKeyValue, value, columnID, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.post(
    API_URL + "upsertDataPoint",
    {
      p_key_value: pKeyValue,
      value,
      column_id: columnID,
    },
    { headers: headers }
  );
};

const dataForPKeysColumns = (pKeyValues, columnIds, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  const p_key_values = pKeyValues.join(",");
  const column_ids = columnIds.join(",");
  return axios.get(
    API_URL +
      `dataForPKeysColumns?p_key_values=${p_key_values}&column_ids=${column_ids}`,
    { headers: headers }
  );
};

const toggleHideColumn = (queryID, colName, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.post(
    API_URL + `toggleHideColumn`,
    { queryID, colName },
    { headers: headers }
  );
};

const deleteColumn = (colID, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.post(
    API_URL + `deleteColumn`,
    { column_id: colID },
    { headers: headers }
  );
};

export default {
  upsertQuery,
  newColumn,
  upsertDataPoint,
  dataForPKeysColumns,
  toggleHideColumn,
  deleteColumn,
};
