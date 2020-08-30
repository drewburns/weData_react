import axios from "axios";

const API_URL = "http://localhost:8080/table/";

const upsertQuery = (query_id, name, p_key, link, project_id) => {
  return axios.post(API_URL + "upsertQuery", {
    query_id,
    name,
    p_key,
    link,
    project_id,
  });
};

const newColumn = (query_id, name) => {
  return axios.post(API_URL + "createColumn", {
    query_id,
    name,
  });
};

export default {
  upsertQuery,
  newColumn,
};
