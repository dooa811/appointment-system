import api from './api';

export const appointmentService = {
  getAll: async () => {
    const res = await api.get('/appointments');
    return res.data;
  },

  getByUser: async (userId) => {
    const res = await api.get(`/appointments?userId=${userId}`);
    return res.data;
  },

  create: async (data) => {
    const res = await api.post('/appointments', {
      ...data,
      status: 'pending',
      createdAt: new Date().toISOString().split('T')[0],
    });
    return res.data;
  },

  updateStatus: async (id, status) => {
    const res = await api.patch(`/appointments/${id}`, { status });
    return res.data;
  },

  delete: async (id) => {
    await api.delete(`/appointments/${id}`);
  },
};