import React, { useState, useEffect } from 'react';
import { ChevronDown, Store, Globe, Share2, MapPin, Code, Save, Palette, Power, Coins, Percent, Languages as LangIcon, RefreshCw, Upload, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';

const SettingsPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string | null>('store');

  // --- State for Store Settings ---
  const [storeStatus, setStoreStatus] = useState(true); // Open/Closed
  const [currency, setCurrency] = useState('SAR');
  const [vat, setVat] = useState('15');
  const [allowBranchSwitch, setAllowBranchSwitch] = useState(false);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>(['ar']);
  
  // --- State for Branding ---
  const [primaryColor, setPrimaryColor] = useState('#800000');
  const [accentColor, setAccentColor] = useState('#E6B325');

  // --- State for Welcome Page ---
  const [coverImage, setCoverImage] = useState('https://picsum.photos/id/431/1200/600'); // Mock initial image
  const [storeDescription, setStoreDescription] = useState('أفضل المأكولات التركية الأصيلة في قلب المدينة، نقدم لكم تجربة تذوق فريدة تمزج بين العراقة والحداثة.');

  // --- State for Social Links ---
  const [customLinks, setCustomLinks] = useState<{id: number, name: string, url: string}[]>([]);

  const addCustomLink = () => {
    setCustomLinks([...customLinks, { id: Date.now(), name: '', url: '' }]);
  };

  const removeCustomLink = (id: number) => {
    setCustomLinks(customLinks.filter(link => link.id !== id));
  };

  const updateCustomLink = (id: number, field: 'name' | 'url', value: string) => {
    setCustomLinks(customLinks.map(link => link.id === id ? { ...link, [field]: value } : link));
  };

  // Helper to convert Hex to RGB space separated
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? `${parseInt(result[1]!, 16)} ${parseInt(result[2]!, 16)} ${parseInt(result[3]!, 16)}` : null;
  };

  // Update CSS Variables when colors change
  useEffect(() => {
    const root = document.documentElement;
    const primaryRgb = hexToRgb(primaryColor);
    const accentRgb = hexToRgb(accentColor);

    if (primaryRgb) root.style.setProperty('--color-primary', primaryRgb);
    if (accentRgb) root.style.setProperty('--color-accent', accentRgb);
  }, [primaryColor, accentColor]);

  const toggleLanguage = (lang: string) => {
    if (selectedLanguages.includes(lang)) {
      setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
    } else {
      setSelectedLanguages([...selectedLanguages, lang]);
    }
  };

  const sections = [
    {
      id: 'store',
      title: 'إعدادات التشغيل العامة',
      icon: <Store size={20} />,
      content: (
        <div className="space-y-8">
          
          {/* Store Status Toggle */}
          <div className="bg-gray-50 dark:bg-white/5 p-5 rounded-2xl border border-gray-100 dark:border-white/5 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className={`p-3 rounded-full ${storeStatus ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'}`}>
                <Power size={24} />
              </div>
              <div>
                <h4 className="font-bold text-gray-800 dark:text-white text-lg">استقبال الطلبات</h4>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {storeStatus ? 'المتجر مفتوح ويستقبل الطلبات' : 'المتجر مغلق مؤقتاً'}
                </p>
              </div>
            </div>
            <div className="relative inline-block w-14 h-8 align-middle select-none transition duration-200 ease-in">
              <input 
                type="checkbox" 
                checked={storeStatus} 
                onChange={() => setStoreStatus(!storeStatus)}
                className="toggle-checkbox absolute block w-6 h-6 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 top-1 left-1 checked:left-7 checked:border-green-500"
              />
              <label className={`toggle-label block overflow-hidden h-8 rounded-full cursor-pointer transition-colors duration-300 ${storeStatus ? 'bg-green-500' : 'bg-gray-300 dark:bg-gray-600'}`}></label>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Basic Info */}
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">اسم المتجر</label>
              <input type="text" defaultValue="إسكندر أفندي" className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-accent outline-none dark:text-white" />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">شعار المتجر</label>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center text-2xl border border-primary/30">👨‍🍳</div>
                <button className="text-sm text-accent font-bold hover:underline">تغيير الشعار</button>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-100 dark:border-white/5 pt-6">
             <h4 className="font-bold text-gray-800 dark:text-white mb-4 text-lg">تخصيص الخصائص</h4>
             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                
                {/* Currency */}
                <div>
                   <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                     <Coins size={16} /> العملة
                   </label>
                   <div className="relative">
                      <select 
                        value={currency}
                        onChange={(e) => setCurrency(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 appearance-none outline-none focus:border-accent dark:text-white"
                      >
                        <option value="SAR">ريال سعودي (SAR)</option>
                        <option value="USD">دولار أمريكي (USD)</option>
                        <option value="EUR">يورو (EUR)</option>
                        <option value="KWD">دينار كويتي (KWD)</option>
                      </select>
                      <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={16} />
                   </div>
                </div>

                {/* VAT */}
                <div>
                   <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                     <Percent size={16} /> الضريبة المضافة
                   </label>
                   <div className="relative">
                      <input 
                        type="number" 
                        value={vat} 
                        onChange={(e) => setVat(e.target.value)}
                        className="w-full h-12 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-accent outline-none dark:text-white"
                      />
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">%</span>
                   </div>
                </div>

                {/* Languages */}
                <div>
                   <label className="flex items-center gap-2 text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
                     <LangIcon size={16} /> لغات الواجهة
                   </label>
                   <div className="flex flex-wrap gap-2">
                      {['ar', 'en'].map(lang => (
                        <button
                          key={lang}
                          onClick={() => toggleLanguage(lang)}
                          className={`px-4 py-3 rounded-xl text-sm font-bold border transition-all ${
                            selectedLanguages.includes(lang)
                              ? 'bg-primary text-white border-primary'
                              : 'bg-gray-50 dark:bg-white/5 text-gray-500 border-gray-200 dark:border-white/10'
                          }`}
                        >
                          {lang === 'ar' ? 'العربية' : 'English'}
                        </button>
                      ))}
                   </div>
                </div>

             </div>

             {/* Branch Switching Toggle */}
             <div className="mt-6 flex items-center justify-between bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                <div className="flex items-center gap-3">
                   <div className="p-2 bg-blue-100 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg">
                     <RefreshCw size={20} />
                   </div>
                   <div>
                      <p className="font-bold text-gray-800 dark:text-white text-sm">السماح بالتبديل بين الفروع</p>
                      <p className="text-xs text-gray-500">تمكين العميل من تغيير الفرع من داخل المنيو</p>
                   </div>
                </div>
                <div className="relative inline-block w-10 h-6 align-middle select-none transition duration-200 ease-in">
                  <input 
                    type="checkbox" 
                    checked={allowBranchSwitch} 
                    onChange={() => setAllowBranchSwitch(!allowBranchSwitch)}
                    className="toggle-checkbox absolute block w-4 h-4 rounded-full bg-white border-4 appearance-none cursor-pointer transition-all duration-300 top-1 left-1 checked:left-5 checked:border-primary"
                  />
                  <label className={`toggle-label block overflow-hidden h-6 rounded-full cursor-pointer transition-colors duration-300 ${allowBranchSwitch ? 'bg-primary' : 'bg-gray-300 dark:bg-gray-600'}`}></label>
                </div>
             </div>
          </div>

          {/* Branding Section (Moved inside Store Settings visually) */}
          <div className="border-t border-gray-100 dark:border-white/5 pt-6">
             <h4 className="flex items-center gap-2 font-bold text-gray-800 dark:text-white mb-4">
               <Palette size={18} className="text-accent" />
               تخصيص الهوية البصرية
             </h4>
             <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                   <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300">اللون الرئيسي</label>
                      <span className="text-xs font-mono text-gray-400">{primaryColor}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={primaryColor} 
                        onChange={(e) => setPrimaryColor(e.target.value)}
                        className="shadow-lg"
                      />
                      <p className="text-xs text-gray-500">يستخدم للعناوين، الأزرار الرئيسية، والخلفيات الداكنة.</p>
                   </div>
                </div>

                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                   <div className="flex justify-between items-center mb-2">
                      <label className="text-sm font-bold text-gray-700 dark:text-gray-300">اللون الثانوي (Accent)</label>
                      <span className="text-xs font-mono text-gray-400">{accentColor}</span>
                   </div>
                   <div className="flex items-center gap-3">
                      <input 
                        type="color" 
                        value={accentColor} 
                        onChange={(e) => setAccentColor(e.target.value)}
                        className="shadow-lg"
                      />
                      <p className="text-xs text-gray-500">يستخدم للتمييز، الأيقونات، وحالات التفاعل.</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      )
    },
    {
      id: 'welcome',
      title: 'إعدادات صفحة الترحيب',
      icon: <Globe size={20} />,
      content: (
        <div className="space-y-6">
           {/* Cover Image */}
           <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">صورة غلاف المنيو</label>
              
              <div className="relative w-full h-48 rounded-2xl overflow-hidden group border-2 border-dashed border-gray-300 dark:border-white/20 bg-gray-100 dark:bg-white/5">
                 <img src={coverImage} alt="Cover Preview" className="w-full h-full object-cover transition-opacity duration-300 group-hover:opacity-50" />
                 
                 <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10">
                    <button className="bg-white/20 backdrop-blur-md border border-white/50 text-white px-4 py-2 rounded-xl font-bold flex items-center gap-2 hover:bg-white hover:text-primary transition-all shadow-lg">
                      <Upload size={18} />
                      تغيير الغلاف
                    </button>
                    <p className="text-white text-xs mt-2 font-medium drop-shadow-md">المقاس المقترح: 1200x600</p>
                 </div>
              </div>
           </div>

           {/* Store Bio */}
           <div>
              <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">وصف المتجر (Bio)</label>
              <textarea 
                className="w-full p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-accent outline-none dark:text-white min-h-[120px] text-sm leading-relaxed" 
                value={storeDescription}
                onChange={(e) => setStoreDescription(e.target.value)}
                placeholder="اكتب وصفاً مختصراً وجذاباً للمتجر يظهر للعملاء عند فتح المنيو..."
              />
              <p className="text-left text-xs text-gray-400 mt-2">{storeDescription.length}/300</p>
           </div>
        </div>
      )
    },
    {
      id: 'social',
      title: 'روابط التواصل الاجتماعي',
      icon: <Share2 size={20} />,
      content: (
        <div className="space-y-6">
           {/* Predefined Platforms */}
           <div className="space-y-4">
             {['Instagram', 'Twitter', 'Facebook', 'TikTok', 'Snapchat', 'YouTube'].map(platform => (
               <div key={platform} className="flex items-center gap-4">
                 <span className="w-24 text-sm font-bold text-gray-600 dark:text-gray-400">{platform}</span>
                 <input type="text" placeholder={`رابط ${platform}`} className="flex-1 h-10 px-4 rounded-lg bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-accent outline-none dark:text-white text-sm" />
               </div>
             ))}
           </div>

           {/* Divider */}
           <div className="border-t border-gray-100 dark:border-white/5"></div>

           {/* Custom Links */}
           <div>
             <div className="flex items-center justify-between mb-4">
               <h4 className="font-bold text-gray-800 dark:text-white text-sm">روابط إضافية</h4>
             </div>
             
             <div className="space-y-3">
               {customLinks.map((link) => (
                 <div key={link.id} className="flex gap-3 items-center animate-fade-in">
                   <div className="w-1/3">
                     <input 
                       type="text" 
                       placeholder="اسم الرابط (مثال: الموقع الإلكتروني)"
                       value={link.name}
                       onChange={(e) => updateCustomLink(link.id, 'name', e.target.value)}
                       className="w-full h-10 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-accent outline-none text-sm dark:text-white"
                     />
                   </div>
                   <div className="flex-1">
                     <input 
                       type="text" 
                       placeholder="https://..."
                       value={link.url}
                       onChange={(e) => updateCustomLink(link.id, 'url', e.target.value)}
                       className="w-full h-10 px-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 focus:border-accent outline-none text-sm dark:text-white dir-ltr"
                     />
                   </div>
                   <button 
                     onClick={() => removeCustomLink(link.id)}
                     className="p-2.5 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-xl transition-colors"
                     title="حذف الرابط"
                   >
                     <Trash2 size={16} />
                   </button>
                 </div>
               ))}
               
               <button 
                 onClick={addCustomLink}
                 className="w-full py-3 flex items-center justify-center gap-2 text-sm font-bold text-gray-500 dark:text-gray-400 hover:text-primary dark:hover:text-accent hover:bg-gray-50 dark:hover:bg-white/5 rounded-xl border border-dashed border-gray-300 dark:border-white/20 transition-all"
               >
                 <Plus size={16} />
                 إضافة رابط جديد
               </button>
             </div>
           </div>
        </div>
      )
    },
    {
      id: 'branches',
      title: 'إدارة الفروع',
      icon: <MapPin size={20} />,
      content: (
        <div className="space-y-4">
          <div className="p-4 bg-gray-50 dark:bg-white/5 rounded-xl flex justify-between items-center border border-gray-100 dark:border-white/5">
             <div>
               <h4 className="font-bold text-gray-800 dark:text-white">الفرع الرئيسي - الرياض</h4>
               <p className="text-xs text-gray-500">شارع التحلية</p>
             </div>
             <button className="text-accent text-sm font-bold">تعديل</button>
          </div>
          <button className="w-full py-3 border border-dashed border-gray-300 dark:border-white/20 rounded-xl text-gray-500 hover:text-primary dark:hover:text-white transition-colors text-sm font-bold">
            + إضافة فرع جديد
          </button>
        </div>
      )
    },
    {
      id: 'code',
      title: 'تخصيص متقدم (CSS/JS)',
      icon: <Code size={20} />,
      content: (
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">CSS مخصص</label>
            <textarea className="w-full p-4 rounded-xl bg-gray-900 text-green-400 font-mono text-xs border border-gray-700 focus:border-accent outline-none min-h-[100px]" placeholder=".custom-class { ... }" />
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="animate-fade-in max-w-4xl mx-auto space-y-8 pb-20">
       {/* Header */}
      <div>
        <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white drop-shadow-sm">الإعدادات</h2>
        <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg font-medium">تخصيص مظهر ووظائف المتجر</p>
      </div>

      <div className="space-y-4">
        {sections.map((section) => (
          <div key={section.id} className="glass rounded-[2rem] overflow-hidden border border-gray-100 dark:border-white/5 transition-all">
            <button 
              onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              className={`w-full p-6 flex items-center justify-between text-right transition-colors ${activeSection === section.id ? 'bg-primary/5 dark:bg-white/5' : 'hover:bg-gray-50 dark:hover:bg-white/5'}`}
            >
              <div className="flex items-center gap-4">
                <div className={`p-2 rounded-xl transition-colors ${activeSection === section.id ? 'bg-primary text-white' : 'bg-gray-100 dark:bg-white/10 text-gray-500 dark:text-gray-400'}`}>
                  {section.icon}
                </div>
                <span className={`text-lg font-bold ${activeSection === section.id ? 'text-primary dark:text-accent' : 'text-gray-700 dark:text-gray-200'}`}>
                  {section.title}
                </span>
              </div>
              <div className={`${activeSection === section.id ? 'text-primary dark:text-accent rotate-180' : 'text-gray-400'} transition-transform duration-300`}>
                <ChevronDown size={20} />
              </div>
            </button>
            
            <div className={`transition-all duration-500 ease-in-out overflow-hidden ${activeSection === section.id ? 'max-h-[1500px] opacity-100' : 'max-h-0 opacity-0'}`}>
              <div className="p-6 pt-0 border-t border-gray-100 dark:border-white/5 bg-white/40 dark:bg-black/20">
                <div className="pt-6">
                  {section.content}
                </div>
                
                {/* Save Button for Section */}
                <div className="mt-8 flex justify-end">
                   <button className="flex items-center gap-2 px-8 py-3 bg-primary text-white rounded-xl font-bold hover:bg-primary-light transition-colors shadow-lg shadow-primary/20 text-sm active:scale-95">
                     <Save size={18} />
                     حفظ التغييرات
                   </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SettingsPage;