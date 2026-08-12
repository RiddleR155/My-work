import api from './api';

export const fetchDashboardStats = async () => {
  const { data } = await api.get('/admin/stats');
  return data;
};

export const fetchCustomers = async () => {
  const { data } = await api.get('/users');
  return data;
};
