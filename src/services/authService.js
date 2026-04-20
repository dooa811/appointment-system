// ملاحظة: قمنا بتعطيل استيراد api لأنه لن نحتاجه في نسخة العرض (Demo)
// import api from './api'; 

export const authService = {
  // 1. تسجيل الدخول باستخدام البيانات التجريبية
  login: async (email, password) => {
    // محاكاة تأخير بسيط ليعطي شعور حقيقياً (نصف ثانية)
    await new Promise(resolve => setTimeout(resolve, 500));

    // البيانات المسموح لها بالدخول (التي تظهر في الصورة عندك)
    const demoUsers = [
      { id: 1, email: 'sarah@example.com', password: 'password123', name: 'Sarah', role: 'admin' },
      { id: 2, email: 'michael@example.com', password: 'password123', name: 'Michael', role: 'user' }
    ];

    const user = demoUsers.find(u => u.email === email && u.password === password);

    if (!user) {
      throw new Error('الايميل أو كلمة المرور غير صحيحة');
    }

    // حفظ المستخدم في الـ localStorage ليبقى مسجلاً عند تحديث الصفحة
    localStorage.setItem('user', JSON.stringify(user));
    
    // إرجاع بيانات المستخدم (بدون كلمة المرور لأسباب أمنية حتى في الديمو)
    const { password: _, ...userWithoutPassword } = user;
    return userWithoutPassword;
  },

  // 2. تسجيل مستخدم جديد (محاكاة)
  register: async (userData) => {
    await new Promise(resolve => setTimeout(resolve, 800));

    // فحص بسيط إذا كان الايميل مستخدم في الديمو
    if (userData.email === 'sarah@example.com') {
      throw new Error('هذا الايميل مسجل مسبقاً');
    }

    const newUser = {
      ...userData,
      id: Math.floor(Math.random() * 1000),
      role: 'user',
      createdAt: new Date().toISOString().split('T')[0],
    };

    console.log('تم التسجيل بنجاح (وضع العرض):', newUser);
    return newUser;
  },

  // 3. جلب كل المستخدمين (لعرضهم في لوحة التحكم مثلاً)
  getAllUsers: async () => {
    await new Promise(resolve => setTimeout(resolve, 300));
    return [
      { id: 1, name: 'Sarah', email: 'sarah@example.com', role: 'admin', createdAt: '2023-01-01' },
      { id: 2, name: 'Michael', email: 'michael@example.com', role: 'user', createdAt: '2023-02-15' },
      { id: 3, name: 'Guest User', email: 'guest@example.com', role: 'user', createdAt: '2023-03-10' }
    ];
  },

  // 4. محاكاة حذف مستخدم
  deleteUser: async (id) => {
    await new Promise(resolve => setTimeout(resolve, 400));
    console.log(`تم حذف المستخدم صاحب الرقم ${id} بنجاح (Demo Mode)`);
    return { success: true };
  },

  // 5. تسجيل الخروج
  logout: () => {
    localStorage.removeItem('user');
  },

  
    // جلب الخدمات (لحل مشكلة تعليق صفحة الخدمات)
  getServices: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 1, name: 'General Consultation', price: 50, duration: '30 min' },
      { id: 2, name: 'Dental Checkup', price: 80, duration: '45 min' },
      { id: 3, name: 'Cardiology', price: 120, duration: '60 min' }
    ];
  },

  // جلب المواعيد (لحل مشكلة صفحة المواعيد)
  getAppointments: async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    return [
      { id: 1, service: 'General Consultation', date: '2023-10-25', time: '10:00 AM', status: 'Confirmed' }
    ];
  }

};
