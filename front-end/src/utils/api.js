import axios from 'axios';

const API_BASE_URL = process.env.NODE_ENV === 'production'
  ? 'https://bill-buddy-7lpl.onrender.com/api'
  : 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
});

export const auth = {
  register: (data) => api.post('/auth/register', data),
  login: (data) => api.post('/auth/login', data),
};

export const contacts = {
  getAll: (userId) => api.get(`/contacts/${userId}`),
  create: (data) => api.post('/contacts', data),
  delete: (contactId) => api.delete(`/contacts/${contactId}`),
};

export const transactions = {
  getByContact: (contactId) => api.get(`/transactions/${contactId}`),
  create: (data) => api.post('/transactions', data),
  delete: (transactionId) => api.delete(`/transactions/${transactionId}`),
};

export default api;