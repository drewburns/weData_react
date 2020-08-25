"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var API_URL = "http://localhost:8080/api/auth/";

var register = function register(email, password, state, setState) {
  return _axios.default.post(API_URL + "signup", {
    email: email,
    password: password
  });
};

var login = function login(username, password, state, setState) {
  return _axios.default.post(API_URL + "signin", {
    username: username,
    password: password
  }).then(function (response) {
    if (response.data.accessToken) {
      localStorage.setItem("id_token", response.data.accessToken);
    }

    setState(_objectSpread({}, state, {
      user: response.data.user,
      currentUserID: response.data.user.id,
      jwt: response.data.accessToken,
      loading: false
    }));
    return response.data;
  });
};

var logout = function logout(state, setState) {
  localStorage.removeItem("user");
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