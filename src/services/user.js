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

const editUser = async (userId, data) => {
  const response = await axios.patch(`${baseUrl}/${userId}`, data);
  return response.data;
};

const editUserProfilePicture = async (userId, file) => {
  const response = await axios.patch(
    `${baseUrl}/${userId}/profilepicture`,
    file
  );
  return response.data;
};

const deleteAccount = async (userId) => {
  const response = await axios.delete(`${baseUrl}/${userId}`);
  return response;
};

export default {
  loginUser,
  signupUser,
  getLoggedInUser,
  editUser,
  editUserProfilePicture,
  deleteAccount,
};
