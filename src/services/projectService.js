import axios from "axios";
import config from './config';
const env = process.env.NODE_ENV || 'development';
const stage = config[env];
const API_URL = stage.base_url+"/project/";

const create = (name, company_ids, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.post(
    API_URL + "create",
    {
      name,
      company_ids,
    },
    { headers: headers }
  );
};

const runQuery = (route) => {
  return axios.get(route);
}

const getProject = (id, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.get(API_URL + id, { headers: headers });
};


const fetch = (jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.get(API_URL + "", { headers: headers });
};
export default {
  fetch,
  create,
  getProject,
  runQuery
};
