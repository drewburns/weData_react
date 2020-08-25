import axios from "axios";

const API_URL = "http://localhost:8080/api/auth/";

const register = (email, password, state, setState) => {
  return axios.post(API_URL + "signup", {
    email,
    password,
  });
};

const login = (username, password, state, setState) => {
  return axios
    .post(API_URL + "signin", {
      username,
      password,
    })
    .then((response) => {
      if (response.data.accessToken) {
        localStorage.setItem("id_token", response.data.accessToken);
      }
      setState({
        ...state,
        user: response.data.user,
        currentUserID: response.data.user.id,
        jwt: response.data.accessToken,
        loading: false,
      });
      return response.data;
    });
};

const logout = (state, setState) => {
  localStorage.removeItem("user");
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
  register,
  login,
  logout,
  getCurrentUser,
};
