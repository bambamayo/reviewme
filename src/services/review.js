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

const getReviewById = async (reviewId) => {
  const response = await axios.get(`${baseUrl}/${reviewId}`);
  return response.data;
};

const addReviewImages = async (reviewId, files) => {
  const response = await axios.patch(`${baseUrl}/${reviewId}/images`, files);
  return response.data;
};

const getReviewCount = async (reviewName) => {
  const response = await axios.get(`${baseUrl}/${reviewName}/count`);
  return response.data;
};

const deleteReview = async (reviewId) => {
  const response = await axios.delete(`${baseUrl}/${reviewId}`);
  return response;
};

const editReview = async (reviewId, data) => {
  const response = await axios.patch(`${baseUrl}/${reviewId}`, data);
  return response.data;
};

export default {
  getAllReviews,
  createNewReview,
  getReviewsByUser,
  getReviewById,
  deleteReview,
  editReview,
  getReviewCount,
  addReviewImages,
};
