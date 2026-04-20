// قمنا بتعطيل api لأنه يسبب الخطأ أونلاين
// import api from './api'; 

export const serviceService = {
  getAll: async () => {
    // محاكاة تأخير بسيط لراحة المستخدم
    await new Promise(resolve => setTimeout(resolve, 500));
    // بيانات تجريبية للخدمات
    return [
      { id: 1, name: 'General Consultation', price: 50, duration: '30 min', description: 'Basic checkup' },
      { id: 2, name: 'Dental Care', price: 80, duration: '45 min', description: 'Teeth cleaning' },
      { id: 3, name: 'Cardiology', price: 120, duration: '60 min', description: 'Heart health' }
    ];
  },

  create: async (data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...data, id: Math.random() };
  },

  update: async (id, data) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return { ...data, id };
  },

  delete: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Service ${id} deleted (Demo Mode)`);
  },

  getAllDoctors: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    // بيانات تجريبية للأطباء لكي تظهر في القوائم
    return [
      { id: 1, name: 'Dr. Ahmad Ali', specialty: 'General Practice' },
      { id: 2, name: 'Dr. Sara Mansour', specialty: 'Dentist' },
      { id: 3, name: 'Dr. John Doe', specialty: 'Cardiologist' }
    ];
  },
};
