import React, { useState } from 'react';
import { Upload, Plus, X, Check, ImagePlus, ChevronLeft, Trash2, Settings2, ToggleRight, ToggleLeft, MapPin, Grid, QrCode } from 'lucide-react';
import { DietaryOption, AllergenOption } from '../lib/types';

// --- Components for Input Styling ---
const Label = ({ children, required }: { children?: React.ReactNode, required?: boolean }) => (
  <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2 flex justify-between">
    <span>{children}</span>
    {required && <span className="text-red-500 text-xs">* مطلوب</span>}
  </label>
);

const Input = (props: React.InputHTMLAttributes<HTMLInputElement>) => (
  <input 
    {...props} 
    className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-[#404040] border border-gray-200 dark:border-white/5 focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400 text-sm"
  />
);

const TextArea = (props: React.TextareaHTMLAttributes<HTMLTextAreaElement>) => (
  <textarea 
    {...props} 
    className="w-full p-4 rounded-xl bg-gray-50 dark:bg-[#404040] border border-gray-200 dark:border-white/5 focus:border-accent focus:ring-1 focus:ring-accent/50 outline-none transition-all text-gray-800 dark:text-white placeholder-gray-400 min-h-[80px] resize-none text-sm"
  />
);

// --- Helper Component: Section Builder ---
interface OptionItem {
  id: string;
  name: string;
  price: string;
}

const OptionsBuilder: React.FC<{
  title: string;
  subtitle: string;
  items: OptionItem[];
  setItems: (items: OptionItem[]) => void;
  type: 'single' | 'multi'; // Visual indicator mostly
}> = ({ title, subtitle, items, setItems, type }) => {
  
  const addItem = () => {
    setItems([...items, { id: Date.now().toString(), name: '', price: '0' }]);
  };

  const updateItem = (id: string, field: 'name' | 'price', value: string) => {
    setItems(items.map(item => item.id === id ? { ...item, [field]: value } : item));
  };

  const removeItem = (id: string) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div className="bg-gray-100 dark:bg-[#252525] rounded-2xl p-4 border border-gray-200 dark:border-white/5 animate-fade-in">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h4 className="font-bold text-gray-800 dark:text-white text-base">{title}</h4>
          <p className="text-xs text-gray-500">{subtitle}</p>
        </div>
        <span className="text-[10px] px-2 py-1 rounded bg-gray-200 dark:bg-white/10 text-gray-500 font-mono">
          {type === 'single' ? 'اختيار واحد' : 'تحديد متعدد'}
        </span>
      </div>

      <div className="space-y-3">
        {items.map((item, idx) => (
          <div key={item.id} className="flex gap-3 items-center">
             <div className="flex-1">
               <input 
                 type="text" 
                 placeholder={`الخيار ${idx + 1}`}
                 value={item.name}
                 onChange={(e) => updateItem(item.id, 'name', e.target.value)}
                 className="w-full h-10 px-3 rounded-lg bg-white dark:bg-[#333] border border-transparent focus:border-accent outline-none text-sm dark:text-white"
               />
             </div>
             <div className="w-24 relative">
               <input 
                 type="number" 
                 placeholder="0"
                 value={item.price}
                 onChange={(e) => updateItem(item.id, 'price', e.target.value)}
                 className="w-full h-10 px-3 pl-8 rounded-lg bg-white dark:bg-[#333] border border-transparent focus:border-accent outline-none text-sm dark:text-white"
               />
               <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs text-gray-500">+ر.س</span>
             </div>
             <button 
               onClick={() => removeItem(item.id)}
               className="p-2 text-red-400 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors"
             >
               <Trash2 size={16} />
             </button>
          </div>
        ))}

        <button 
          onClick={addItem}
          className="w-full py-2 flex items-center justify-center gap-2 text-sm font-bold text-primary dark:text-accent hover:bg-primary/5 dark:hover:bg-accent/5 rounded-lg border border-dashed border-primary/20 dark:border-accent/20 transition-colors"
        >
          <Plus size={14} />
          إضافة خيار جديد
        </button>
      </div>
    </div>
  );
};

// --- Add Category Form ---
export const AddCategoryForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="space-y-6">
      <div>
        <Label>اسم الفئة</Label>
        <Input placeholder="مثال: المقبلات، الأطباق الرئيسية..." autoFocus />
      </div>
      <button 
        onClick={onClose}
        className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-colors shadow-lg hover:shadow-primary/30 active:scale-95 transform duration-150"
      >
        حفظ الفئة
      </button>
    </div>
  );
};

// --- Manage Tables Form ---
export const ManageTablesForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [zones, setZones] = useState([{ id: 1, name: 'الصالة الداخلية', tables: 12 }]);

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl flex items-start gap-3 border border-blue-100 dark:border-blue-900/30">
        <QrCode className="text-blue-600 dark:text-blue-400 mt-1 shrink-0" size={20} />
        <div>
          <p className="text-sm font-bold text-blue-800 dark:text-blue-300">نظام الطاولات والباركود</p>
          <p className="text-xs text-blue-600 dark:text-blue-400 mt-1">عند تحديث عدد الطاولات، سيقوم النظام تلقائياً بتوليد باركود QR فريد لكل طاولة لتسهيل الطلب.</p>
        </div>
      </div>

      <div className="space-y-4">
        {zones.map((zone, idx) => (
          <div key={zone.id} className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-200 dark:border-white/10">
            <div className="flex justify-between items-center mb-4">
               <h4 className="font-bold text-gray-800 dark:text-white">منطقة #{idx + 1}</h4>
               <button className="text-red-500 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"><Trash2 size={16}/></button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>اسم المنطقة</Label>
                <Input defaultValue={zone.name} />
              </div>
              <div>
                <Label>عدد الطاولات</Label>
                <Input type="number" defaultValue={zone.tables} />
              </div>
            </div>
          </div>
        ))}
        
        <button 
          onClick={() => setZones([...zones, { id: Date.now(), name: '', tables: 0 }])}
          className="w-full py-3 border border-dashed border-gray-300 dark:border-white/20 rounded-xl text-gray-500 hover:text-primary dark:hover:text-white transition-colors text-sm font-bold flex items-center justify-center gap-2"
        >
          <Plus size={16} />
          إضافة منطقة جديدة
        </button>
      </div>

      <div className="pt-4 border-t border-gray-100 dark:border-white/5">
        <button 
          onClick={onClose}
          className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-colors shadow-lg shadow-primary/20"
        >
          حفظ وتحديث الباركود
        </button>
      </div>
    </div>
  );
};

// --- Manage Branches Form ---
export const ManageBranchesForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {[
          { name: 'الفرع الرئيسي - الرياض', address: 'شارع التحلية', active: true },
          { name: 'فرع جدة', address: 'حي الروضة', active: false },
        ].map((branch, idx) => (
          <div key={idx} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-white/5 rounded-xl border border-gray-200 dark:border-white/10">
             <div className="flex items-center gap-4">
               <div className="p-3 bg-white dark:bg-white/10 rounded-full text-primary dark:text-accent shadow-sm">
                 <MapPin size={20} />
               </div>
               <div>
                 <h4 className="font-bold text-gray-800 dark:text-white">{branch.name}</h4>
                 <p className="text-xs text-gray-500">{branch.address}</p>
               </div>
             </div>
             <div className="flex items-center gap-2">
                <span className={`text-[10px] px-2 py-1 rounded-full font-bold ${branch.active ? 'bg-green-100 text-green-600' : 'bg-gray-200 text-gray-500'}`}>
                  {branch.active ? 'نشط' : 'غير نشط'}
                </span>
                <button className="p-2 text-gray-400 hover:text-primary"><Settings2 size={18} /></button>
             </div>
          </div>
        ))}
      </div>

      <button className="w-full py-3 bg-gray-100 dark:bg-white/10 text-gray-700 dark:text-white font-bold rounded-xl hover:bg-gray-200 dark:hover:bg-white/20 transition-colors flex items-center justify-center gap-2">
        <Plus size={18} />
        إضافة فرع جديد
      </button>
      
      <div className="pt-4 border-t border-gray-100 dark:border-white/5">
         <button onClick={onClose} className="w-full py-3 text-gray-500 font-bold hover:text-gray-700 dark:hover:text-gray-300">إغلاق</button>
      </div>
    </div>
  );
};

// --- Add Product Form ---
export const AddProductForm: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  const [dietary, setDietary] = useState<DietaryOption>('None');
  const [allergens, setAllergens] = useState<AllergenOption[]>([]);
  const [isAvailable, setIsAvailable] = useState(true);

  // Configuration Toggles
  const [config, setConfig] = useState({
    sizes: false,
    sides: false,
    drinks: false,
    preferences: false,
    addons: false,
  });

  // Data States
  const [sizes, setSizes] = useState<OptionItem[]>([{ id: '1', name: 'وسط', price: '0' }]);
  const [sides, setSides] = useState<OptionItem[]>([]);
  const [drinks, setDrinks] = useState<OptionItem[]>([]);
  const [preferences, setPreferences] = useState<OptionItem[]>([]);
  const [addons, setAddons] = useState<OptionItem[]>([]);

  const toggleAllergen = (option: AllergenOption) => {
    if (allergens.includes(option)) {
      setAllergens(allergens.filter(a => a !== option));
    } else {
      setAllergens([...allergens, option]);
    }
  };

  const allergenOptions: AllergenOption[] = ['Nuts', 'Dairy', 'Gluten', 'Eggs', 'Soy'];

  return (
    <div className="space-y-6 text-right">
      
      {/* 1. Basic Info & Image */}
      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Left: Image Upload */}
        <div className="w-full lg:w-1/3">
           <div className="w-full aspect-square border-2 border-dashed border-gray-300 dark:border-white/10 rounded-2xl flex flex-col items-center justify-center text-gray-400 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 hover:border-accent transition-all group relative overflow-hidden bg-[#404040]/30">
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative z-10 flex flex-col items-center">
              <div className="p-4 bg-gray-100 dark:bg-white/10 rounded-full mb-3 group-hover:scale-110 group-hover:bg-accent group-hover:text-primary transition-all duration-300">
                <ImagePlus size={32} />
              </div>
              <span className="text-sm font-bold group-hover:text-white transition-colors">صورة المنتج</span>
            </div>
          </div>
        </div>

        {/* Right: Basic Fields */}
        <div className="w-full lg:w-2/3 space-y-4">
           <div>
              <Label required>اسم المنتج</Label>
              <Input placeholder="مثال: وجبة شاورما عربي" />
           </div>
           <div>
              <Label>الوصف</Label>
              <TextArea placeholder="وصف المكونات..." />
           </div>
           <div className="flex gap-4">
              <div className="flex-1">
                 <Label required>السعر الأساسي</Label>
                 <Input type="number" placeholder="0.00" />
              </div>
              <div className="flex-1">
                 <Label>حالة التوفر</Label>
                 <div className="h-11 flex items-center bg-gray-50 dark:bg-[#404040] rounded-xl px-4 justify-between cursor-pointer" onClick={() => setIsAvailable(!isAvailable)}>
                    <span className={`text-sm font-bold ${isAvailable ? 'text-green-500' : 'text-gray-500'}`}>
                      {isAvailable ? 'متاح' : 'غير متاح'}
                    </span>
                    <div className={`w-10 h-6 rounded-full relative transition-colors ${isAvailable ? 'bg-green-500' : 'bg-gray-500'}`}>
                        <div className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-all ${isAvailable ? 'left-1' : 'left-5'}`}></div>
                    </div>
                 </div>
              </div>
           </div>
        </div>
      </div>

      <div className="border-t border-gray-200 dark:border-white/10 my-2"></div>

      {/* 2. Configuration Toggles (Show/Hide Sections) */}
      <div className="bg-gray-50 dark:bg-[#333]/50 rounded-2xl p-5 border border-gray-200 dark:border-white/5">
        <div className="flex items-center gap-2 mb-4 text-primary dark:text-accent">
          <Settings2 size={20} />
          <h3 className="font-bold">تخصيص المنتج (الإضافات والخيارات)</h3>
        </div>
        
        <div className="flex flex-wrap gap-3">
           {[
             { id: 'sizes', label: 'أحجام' },
             { id: 'sides', label: 'أصناف جانبية' },
             { id: 'drinks', label: 'مشروبات' },
             { id: 'preferences', label: 'تفضيلات (مجاناً)' },
             { id: 'addons', label: 'إضافات مدفوعة' },
           ].map((opt) => (
             <button
               key={opt.id}
               onClick={() => setConfig({ ...config, [opt.id]: !config[opt.id as keyof typeof config] })}
               className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                 config[opt.id as keyof typeof config]
                   ? 'bg-primary dark:bg-white text-white dark:text-primary border-transparent shadow-lg shadow-primary/20'
                   : 'bg-white dark:bg-[#252525] text-gray-500 border-gray-200 dark:border-white/10 hover:border-primary/50'
               }`}
             >
               {config[opt.id as keyof typeof config] ? <Check size={14} /> : <Plus size={14} />}
               {opt.label}
             </button>
           ))}
        </div>
      </div>

      {/* 3. Dynamic Sections Based on Toggles */}
      <div className="space-y-4">
        {config.sizes && (
          <OptionsBuilder 
             title="اختيار الحجم" 
             subtitle="حدد الأحجام المتاحة وفارق السعر عن الأساسي" 
             type="single"
             items={sizes}
             setItems={setSizes}
          />
        )}

        {config.sides && (
          <OptionsBuilder 
             title="اختيار الصنف الجانبي" 
             subtitle="مثل: بطاطس، ويدجز، سلطة..." 
             type="single"
             items={sides}
             setItems={setSides}
          />
        )}

        {config.drinks && (
          <OptionsBuilder 
             title="اختيار المشروب" 
             subtitle="مثل: بيبسي، سفن، ماء..." 
             type="single"
             items={drinks}
             setItems={setDrinks}
          />
        )}

        {config.preferences && (
          <OptionsBuilder 
             title="تفضيلات (مجاناً)" 
             subtitle="خيارات بدون سعر إضافي (مثل: بدون ثوم، خبز محمص)" 
             type="multi"
             items={preferences}
             setItems={setPreferences}
          />
        )}

        {config.addons && (
          <OptionsBuilder 
             title="إضافات وصوصات" 
             subtitle="خيارات بسعر إضافي (مثل: زيادة جبن، صوص حار)" 
             type="multi"
             items={addons}
             setItems={setAddons}
          />
        )}
      </div>

      <div className="border-t border-gray-200 dark:border-white/10 my-2"></div>

      {/* 4. Dietary & Allergens (Re-styled) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <Label>نظام غذائي</Label>
          <div className="relative">
             <select 
               className="w-full h-11 px-4 rounded-xl bg-gray-50 dark:bg-[#404040] border border-gray-200 dark:border-white/5 appearance-none outline-none focus:border-accent text-gray-800 dark:text-white cursor-pointer text-sm"
               value={dietary}
               onChange={(e) => setDietary(e.target.value as DietaryOption)}
             >
               <option value="None">لا يوجد</option>
               <option value="Vegetarian">نباتي (Vegetarian)</option>
               <option value="Vegan">نباتي صرف (Vegan)</option>
             </select>
             <div className="absolute left-4 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500">
               <ChevronLeft size={16} className="-rotate-90" />
             </div>
          </div>
        </div>

        <div>
          <Label>مسببات الحساسية</Label>
          <div className="flex flex-wrap gap-2 mt-1">
            {allergenOptions.map((opt) => (
              <button
                key={opt}
                onClick={() => toggleAllergen(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold border transition-all flex items-center gap-1 ${
                  allergens.includes(opt) 
                    ? 'bg-red-500/10 text-red-500 border-red-500' 
                    : 'bg-transparent text-gray-500 dark:text-gray-400 border-gray-300 dark:border-white/10 hover:border-gray-400'
                }`}
              >
                {allergens.includes(opt) && <Check size={12} />}
                {opt}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Action Button */}
      <div className="pt-4 sticky bottom-0 bg-white dark:bg-[#2e2e2e] pb-2 border-t border-gray-100 dark:border-white/5 mt-4">
        <button 
          onClick={onClose}
          className="w-full py-4 bg-primary hover:bg-primary-light text-white font-bold rounded-xl transition-all shadow-lg hover:shadow-primary/30 active:scale-95 flex items-center justify-center gap-2"
        >
          <Check size={20} />
          حفظ المنتج وتحديث القائمة
        </button>
      </div>
    </div>
  );
};