import axios from "axios";

const API_URL = "http://localhost:5000/project/";

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

const fetch = (jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.get(API_URL + "", { headers: headers });
};
export default {
  fetch,
  create,
};
