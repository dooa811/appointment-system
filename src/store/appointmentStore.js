import { create } from 'zustand';
import { appointmentService } from '../services/appointmentService';

const useAppointmentStore = create((set) => ({
  appointments: [],
  loading: false,
  error: null,

  fetchAll: async () => {
    set({ loading: true, error: null });
    try {
      const data = await appointmentService.getAll();
      set({ appointments: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  fetchByUser: async (userId) => {
    set({ loading: true, error: null });
    try {
      const data = await appointmentService.getByUser(userId);
      set({ appointments: data, loading: false });
    } catch (err) {
      set({ error: err.message, loading: false });
    }
  },

  updateStatus: async (id, status) => {
    const updated = await appointmentService.updateStatus(id, status);
    set((state) => ({
      appointments: state.appointments.map((a) =>
        a.id === id ? { ...a, status } : a
      ),
    }));
    return updated;
  },
}));

export default useAppointmentStore;