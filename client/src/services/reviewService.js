import api from './api';

export const fetchProductReviews = async (productId) => {
  const { data } = await api.get(`/reviews/${productId}`);
  return data;
};

export const createReview = async (productId, payload) => {
  const { data } = await api.post(`/reviews/${productId}`, payload);
  return data;
};
