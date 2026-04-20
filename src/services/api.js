import axios from 'axios';

// هذا الملف الآن سيعمل كـ "سيرفر وهمي" داخلي
const api = {
  get: async (url) => {
    console.log("Mock API GET:", url);
    await new Promise(res => setTimeout(res, 500)); // محاكاة وقت التحميل

    if (url.includes('/services')) return { data: [
      { id: 1, name: 'General Consultation', price: 50, duration: '30 min' },
      { id: 2, name: 'Dental Care', price: 80, duration: '45 min' }
    ]};
    
    if (url.includes('/doctors')) return { data: [
      { id: 1, name: 'Dr. Sara Mansour', specialty: 'Dentist' },
      { id: 2, name: 'Dr. Ahmad Ali', specialty: 'General Practice' }
    ]};

    if (url.includes('/appointments')) return { data: [] };
    
    return { data: [] };
  },
  post: async (url, data) => ({ data }),
  put: async (url, data) => ({ data }),
  delete: async (url) => ({ data: {} }),
};

export default api;
