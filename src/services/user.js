import axios from "axios";
import setAuthToken from "../shared/utils/setAuthToken";

const baseUrl = "http://localhost:5000/api/users";

const loginUser = async (data) => {
  const response = await axios.post(`${baseUrl}/login`, data);
  return response.data;
};

const signupUser = async (data) => {
  const response = await axios.post(`${baseUrl}/signup`, data);
  return response.data;
};

const getLoggedInUser = async () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }
  const response = await axios.get(baseUrl);
  return response.data;
};

export default {
  loginUser,
  signupUser,
  getLoggedInUser,
};
