import React, { useState } from 'react';
import { Camera, Save, CreditCard, Mail, User, Globe, Settings } from 'lucide-react';
import Modal from './Modal';

// Reusing consistent input styles
const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
    {children} {required && <span className="text-red-500">*</span>}
  </label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input
    {...props}
    className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400 text-sm"
  />
);

interface AccountSettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AccountSettingsModal: React.FC<AccountSettingsModalProps> = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    username: 'hazemalderay1',
    email: 'hazemalderay1@gmail.com',
    password: '',
    confirmPassword: '',
    billingType: 'personal',
    fullName: '',
    address: '',
    city: '',
    state: '',
    postalCode: '',
    country: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="إعداد الحساب" maxWidth="max-w-3xl">
      <div className="space-y-8 animate-fade-in text-right" dir="rtl">

        {/* Header Section */}
        <div className="flex items-center justify-between">
           <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
              <Settings size={20} />
              <span className="text-sm font-bold">تعديل الملف الشخصي</span>
           </div>
        </div>

        {/* Profile Image Section */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 border-b border-gray-100 dark:border-white/5 pb-8">
          <div className="flex items-center gap-5">
            <div className="relative group">
              <div className="w-24 h-24 rounded-full bg-gray-200 dark:bg-white/5 overflow-hidden border-4 border-white dark:border-[#2e2e2e] shadow-xl">
                <img src="https://ui-avatars.com/api/?name=Hazem+Alderay&background=random&size=150" alt="Profile" className="w-full h-full object-cover" />
              </div>
              <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary-light transition-colors border-2 border-[#2e2e2e] cursor-pointer">
                <Camera size={14} />
              </button>
            </div>
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white text-lg">الصورة الرمزية</h4>
              <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">استخدم 150 × 150 بكسل لاستخدام أفضل</p>
            </div>
          </div>
          <button className="px-5 py-2.5 border border-primary/30 text-primary hover:bg-primary hover:text-white rounded-xl text-sm font-bold transition-all shadow-sm">
            تحميل الصورة الرمزية
          </button>
        </div>

        {/* User Info & Password */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label required>اسم المستخدم</Label>
            <div className="relative">
               <Input name="username" value={formData.username} onChange={handleChange} />
               <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
            </div>
          </div>
          <div>
            <Label required>عنوان البريد الإلكتروني</Label>
             <div className="relative">
               <Input name="email" value={formData.email} onChange={handleChange} />
               <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
             </div>
          </div>
          <div>
            <Label>كلمة المرور الجديدة</Label>
            <Input type="password" name="password" value={formData.password} onChange={handleChange} placeholder="••••••••" />
          </div>
          <div>
            <Label>تأكيد كلمة المرور الجديدة</Label>
            <Input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} placeholder="••••••••" />
          </div>
        </div>

        {/* Billing Details Section */}
        <div className="bg-gray-50 dark:bg-[#252525] rounded-2xl p-6 border border-gray-100 dark:border-white/5 mt-4">
          <div className="flex items-center gap-3 mb-6">
            <CreditCard className="text-gray-400" size={24} />
            <div>
              <h4 className="font-bold text-gray-800 dark:text-white">تفاصيل الفوترة</h4>
              <p className="text-xs text-gray-500">سيتم استخدام هذه التفاصيل في الفاتورة والمدفوعات.</p>
            </div>
          </div>

          <div className="space-y-5">
             {/* Type Selection */}
             <div>
                <Label>النوع</Label>
                <select
                  name="billingType"
                  value={formData.billingType}
                  onChange={handleChange}
                  className="w-full h-11 px-4 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 outline-none focus:border-accent text-gray-800 dark:text-white text-sm cursor-pointer"
                >
                  <option value="personal">شخصي</option>
                  <option value="company">شركة</option>
                </select>
             </div>

             <div>
               <Label required>الإسم</Label>
               <Input name="fullName" value={formData.fullName} onChange={handleChange} />
             </div>

             <div>
               <Label required>العنوان</Label>
               <Input name="address" value={formData.address} onChange={handleChange} />
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                 <Label required>المدينة</Label>
                 <Input name="city" value={formData.city} onChange={handleChange} />
               </div>
               <div>
                 <Label required>الولاية/المنطقة</Label>
                 <Input name="state" value={formData.state} onChange={handleChange} />
               </div>
             </div>

             <div className="grid grid-cols-2 gap-4">
               <div>
                 <Label required>الرمز البريدي</Label>
                 <Input name="postalCode" value={formData.postalCode} onChange={handleChange} />
               </div>
               <div>
                 <Label required>الدولة</Label>
                  <div className="relative">
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      className="w-full h-11 px-4 rounded-xl bg-white dark:bg-[#1a1a1a] border border-gray-200 dark:border-white/10 outline-none focus:border-accent text-gray-800 dark:text-white text-sm appearance-none cursor-pointer"
                    >
                      <option value="">الإختيار</option>
                      <option value="SA">المملكة العربية السعودية</option>
                      <option value="AE">الإمارات العربية المتحدة</option>
                      <option value="EG">مصر</option>
                    </select>
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-end pt-4 border-t border-gray-100 dark:border-white/5">
          <button
            onClick={onClose}
            className="px-8 py-3 bg-[#E11D48] text-white font-bold rounded-xl shadow-lg hover:bg-[#be123c] transition-all flex items-center gap-2 active:scale-95"
          >
            <Save size={18} />
            حفظ التغييرات
          </button>
        </div>

      </div>
    </Modal>
  );
};

export default AccountSettingsModal;