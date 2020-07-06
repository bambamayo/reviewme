import axios from "axios";

const baseUrl = "http://localhost:5000/api/users";

const loginUser = async (data) => {
  const response = await axios.post(`${baseUrl}/login`, data);
  return response.data;
};

const signupUser = async (data) => {
  const response = await axios.post(`${baseUrl}/signup`, data);
  return response.data;
};

export default {
  loginUser,
  signupUser,
};
