import axios from "axios";
import config from "./config";
const env = process.env.NODE_ENV || "development";
const stage = config[env];
const API_URL = stage.base_url + "/template/";

const create = (name, description, link, primaryKey, jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.post(
    API_URL + "create",
    {
      name,
      description,
      link,
      primary_key: primaryKey
    },
    { headers: headers }
  );
};

const fetch = (jwt) => {
  const headers = { Authorization: "bearer " + jwt };
  return axios.get(API_URL + "", { headers: headers });
};

export default {
  create,
  fetch,
};
