import api from './api';

export const createOrder = async (payload) => {
  const { data } = await api.post('/orders', payload);
  return data;
};

export const fetchMyOrders = async () => {
  const { data } = await api.get('/orders/my-orders');
  return data;
};

export const fetchOrderById = async (id) => {
  const { data } = await api.get(`/orders/${id}`);
  return data;
};

export const fetchAllOrders = async () => {
  const { data } = await api.get('/orders');
  return data;
};

export const updateOrderStatus = async (id, orderStatus) => {
  const { data } = await api.put(`/orders/${id}/status`, { orderStatus });
  return data;
};
