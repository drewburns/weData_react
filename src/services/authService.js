import axios from "axios";

const API_URL = "http://localhost:5000/auth/";

const signup = (email, password) => {
  return axios.post(API_URL + "signup", {
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
