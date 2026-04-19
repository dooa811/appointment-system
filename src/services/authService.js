import api from './api';

export const authService = {
  login: async (email, password) => {
    const res = await api.get(`/users?email=${email}&password=${password}`);
    if (res.data.length === 0) throw new Error('Invalid email or password');
    return res.data[0];
  },

  register: async (userData) => {
    // Check if email exists
    const check = await api.get(`/users?email=${userData.email}`);
    if (check.data.length > 0) throw new Error('Email already registered');
    const res = await api.post('/users', {
      ...userData,
      role: 'user',
      createdAt: new Date().toISOString().split('T')[0],
    });
    return res.data;
  },

  getAllUsers: async () => {
    const res = await api.get('/users');
    return res.data;
  },

  deleteUser: async (id) => {
    await api.delete(`/users/${id}`);
  },
};