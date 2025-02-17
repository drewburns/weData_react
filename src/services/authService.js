import axios from "axios";
import config from './config';

const env = process.env.NODE_ENV || 'development';
const stage = config[env];
console.log(stage)
const API_URL = stage.base_url+"/auth/";

const signup = (name, email, password) => {
  return axios.post(API_URL + "signup", {
    name,
    email,
    password,
  });
};

const login = (email, password) => {
  return axios.post(API_URL + "login", {
    email,
    password,
  });
};

const logout = (state, setState) => {
  localStorage.removeItem("id_token");
  setState({
    jwt: "",
    user: {},
    loading: false,
  });
};

const getCurrentUser = () => {
  return JSON.parse(localStorage.getItem("user"));
};

export default {
  signup,
  login,
  logout,
};
