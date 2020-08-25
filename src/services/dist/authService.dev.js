"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var API_URL = "http://localhost:8080/auth/";

var register = function register(email, password) {
  return _axios.default.post(API_URL + "signup", {
    email: email,
    password: password
  });
};

var login = function login(email, password) {
  return _axios.default.post(API_URL + "login", {
    email: email,
    password: password
  });
};

var logout = function logout(state, setState) {
  localStorage.removeItem("id_token");
  setState({
    jwt: "",
    user: {},
    loading: false
  });
};

var getCurrentUser = function getCurrentUser() {
  return JSON.parse(localStorage.getItem("user"));
};

var _default = {
  register: register,
  login: login,
  logout: logout,
  getCurrentUser: getCurrentUser
};
exports.default = _default;