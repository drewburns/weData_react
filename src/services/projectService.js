import axios from "axios";

const API_URL = "http://localhost:8080/project/";

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
