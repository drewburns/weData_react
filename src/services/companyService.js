import axios from "axios";
import config from './config';
const env = process.env.NODE_ENV || 'development';
const stage = config[env];
const API_URL = stage.base_url+"/company/";

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
