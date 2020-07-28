import axios from "axios";

const baseUrl = "http://localhost:5000/api/reviews";

const getAllReviews = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const createNewReview = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};

const getReviewsByUser = async (userId) => {
  const response = await axios.get(`${baseUrl}/${userId}/reviews`);
  return response.data;
};

export default {
  getAllReviews,
  createNewReview,
  getReviewsByUser,
};
