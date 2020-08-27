import axios from "axios";

const API_URL = "http://localhost:8080/company/";

const create = (name, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.post(
    API_URL + "create",
    {
      name,
    },
    { headers: headers }
  );
};

const getAllCompanies = (jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.get(API_URL + "all", { headers: headers });
};
const addMember = (email, company_id, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.post(
    API_URL + "addMember",
    {
      email,
      company_id,
    },
    { headers: headers }
  );
};

const fetch = (jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.get(API_URL + "", { headers: headers });
};

const members = (id, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.get(API_URL + `members/${id}`, { headers: headers });
};
export default {
  create,
  fetch,
  members,
  addMember,
  getAllCompanies
};
