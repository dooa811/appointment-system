export const appointmentService = {
  create: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return { ...data, id: Math.random(), status: 'Pending' };
  },

  getUserAppointments: async (userId) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    // بيانات وهمية تظهر للمستخدم عند الدخول
    return [
      { id: 1, service: 'General Consultation', doctor: 'Dr. Ahmad Ali', date: '2023-12-01', time: '10:00 AM', status: 'Confirmed' }
    ];
  },

  getAll: async () => {
    await new Promise(resolve => setTimeout(resolve, 600));
    return [
      { id: 1, patientName: 'Sarah', service: 'Consultation', date: '2023-12-01', status: 'Confirmed' }
    ];
  },

  updateStatus: async (id, status) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    return { id, status };
  }
};
