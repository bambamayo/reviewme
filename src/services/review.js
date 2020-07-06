import axios from "axios";

const baseUrl = "http://localhost:5000/api/reviews";

const createNewReview = async (data) => {
  const response = await axios.post(baseUrl, data);
  return response.data;
};

export default {
  createNewReview,
};
