import doc1 from '../assets/images/doc1.avif';
import doc2 from '../assets/images/doc2.avif';
import doc3 from '../assets/images/doc3.avif';

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
    return [
      { 
        id: 1, 
        name: 'Dr. Ahmad Ali', 
        specialty: 'General Practice', 
        avatar: doc1, // استخدام الصورة المحلية هنا
        rating: 4.9, 
        reviews: 120 
      },
      { 
        id: 2, 
        name: 'Dr. Sara Mansour', 
        specialty: 'Dentist', 
        avatar: doc2, 
        rating: 4.8, 
        reviews: 95 
      },
      { 
        id: 3, 
        name: 'Dr. John Doe', 
        specialty: 'Cardiologist', 
        avatar: doc3, 
        rating: 5.0, 
        reviews: 150 
      }
    ];
  },
};
