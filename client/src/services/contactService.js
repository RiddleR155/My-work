import api from './api';

export const submitContactMessage = async (payload) => {
  const { data } = await api.post('/contact', payload);
  return data;
};
