import axios from "axios";
const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

export const API_URL = `${BACKEND_URL}/api/users/`;
export const API_URL_P = `${BACKEND_URL}/api/product/`;

// Register User
const register = async (userData) => {
  const res = await axios.post(API_URL + "register", userData);
  return res.data;
};

// login User
const login = async (userData) => {
  const res = await axios.post(API_URL + "login", userData);
  const token = res.data.token;
  localStorage.setItem("token", token);
  return res.data;
};
// logout User
const logout = async () => {
  const res = await axios.get(API_URL + "logout");

  localStorage.removeItem("token");
  return res.data.message;
};
// get login status
const getLoginStatus = async () => {
  const res = await axios.get(API_URL + "getLoginStatus");
  return res.data;
};
// get user
const getUser = async (token) => {
  axios.interceptors.response.use(
    (axios.defaults.headers.common["Authorization"] = "Bearer " + token)
  );
  if (token !== "undefined") {
    const res = await axios.get(API_URL + "getUser");
    return res.data;
  }
};
// update profile
const updateUser = async (userData) => {
  const res = await axios.patch(API_URL + "updateUser", userData);
  return res.data;
};
// update profile
const updatePhoto = async (userData) => {
  const res = await axios.patch(API_URL + "updatePhoto", userData);
  return res.data;
};
///////////// PRODUTOS /////////



const autService = {
  register,
  login,
  logout,
  getLoginStatus,
  getUser,
  updateUser,
  updatePhoto,
};
export default autService;
