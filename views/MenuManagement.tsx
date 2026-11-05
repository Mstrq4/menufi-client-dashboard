import React, { useState } from 'react';
import { 
  Plus, 
  ChevronDown, 
  ChevronUp, 
  Edit3, 
  Trash2, 
  Eye, 
  EyeOff,
  GripVertical,
  Image as ImageIcon,
  Grid,
  MapPin,
  List
} from 'lucide-react';
import { MenuCategory, MenuItem } from '../lib/types';
import Modal from '../components/Modal';
import { AddProductForm, AddCategoryForm, ManageTablesForm, ManageBranchesForm } from '../components/MenuModals';

const MenuManagement: React.FC = () => {
  // Mock Data
  const [categories, setCategories] = useState<MenuCategory[]>([
    {
      id: 'cat1',
      name: 'الأطباق الرئيسية',
      isOpen: true,
      items: [
        {
          id: 'item1',
          name: 'إسكندر كباب ملكي',
          description: 'شرائح لحم الضأن المشوية مع صلصة الطماطم والزبدة',
          price: 65,
          image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=400&q=80',
          available: true,
          dietary: 'None',
          allergens: ['Dairy', 'Gluten']
        },
        {
          id: 'item2',
          name: 'مشاوي مشكلة',
          description: 'تشكيلة من الكباب والشيش طاووق والريش',
          price: 85,
          image: 'https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=400&q=80',
          available: true,
          dietary: 'None',
          allergens: []
        }
      ]
    },
    {
      id: 'cat2',
      name: 'المقبلات',
      isOpen: false,
      items: [
        {
          id: 'item3',
          name: 'حمص بالصنوبر',
          description: 'حمص كريمي مع زيت زيتون بكر وصنوبر محمص',
          price: 25,
          image: 'https://images.unsplash.com/photo-1637806930600-37fa8892069d?auto=format&fit=crop&w=400&q=80',
          available: true,
          dietary: 'Vegan',
          allergens: ['Nuts']
        }
      ]
    },
    {
      id: 'cat3',
      name: 'المشروبات والعصائر',
      isOpen: false,
      items: []
    }
  ]);

  const [activeModal, setActiveModal] = useState<'none' | 'addProduct' | 'addCategory' | 'manageTables' | 'manageBranches'>('none');

  const toggleCategory = (id: string) => {
    setCategories(categories.map(cat => 
      cat.id === id ? { ...cat, isOpen: !cat.isOpen } : cat
    ));
  };

  const toggleItemAvailability = (catId: string, itemId: string) => {
    setCategories(categories.map(cat => {
      if (cat.id !== catId) return cat;
      return {
        ...cat,
        items: cat.items.map(item => 
          item.id === itemId ? { ...item, available: !item.available } : item
        )
      };
    }));
  };

  // Reusable Action Button Component
  const ActionButton = ({ icon, onClick, variant = 'default', title }: any) => {
    const baseClass = "w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 transform active:scale-95 shadow-md";
    const variants: any = {
      default: "bg-[#404040] text-gray-300 hover:bg-primary hover:text-white hover:shadow-glow",
      danger: "bg-[#404040] text-gray-300 hover:bg-red-600 hover:text-white",
      active: "bg-primary text-white hover:bg-primary-light",
    };

    return (
      <button 
        onClick={(e) => { e.stopPropagation(); onClick && onClick(); }} 
        className={`${baseClass} ${variants[variant]}`}
        title={title}
      >
        {icon}
      </button>
    );
  };

  return (
    <div className="animate-fade-in space-y-8">
      
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white drop-shadow-sm">إدارة القائمة</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg font-medium">تنظيم الأصناف والفئات</p>
        </div>
        <button 
          onClick={() => setActiveModal('addCategory')}
          className="px-6 py-3 bg-[#2e2e2e] text-white font-bold rounded-[2rem] hover:bg-[#3d3d3d] transition-colors border border-white/5 shadow-lg flex items-center gap-2"
        >
          <List size={20} />
          إضافة فئة
        </button>
      </div>

      {/* Quick Actions Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Manage Tables Card */}
        <button 
          onClick={() => setActiveModal('manageTables')}
          className="group flex items-center justify-between p-5 bg-blue-50 dark:bg-[#1e1e24] border border-blue-100 dark:border-white/5 rounded-[1.5rem] hover:shadow-lg transition-all text-right"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-2xl flex items-center justify-center text-blue-600 dark:text-blue-400 group-hover:scale-110 transition-transform">
              <Grid size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">إدارة الطاولات</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تحديد العدد وطباعة الباركود</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-blue-500 group-hover:text-white transition-colors">
            <Plus size={16} />
          </div>
        </button>

        {/* Manage Branches Card */}
        <button 
          onClick={() => setActiveModal('manageBranches')}
          className="group flex items-center justify-between p-5 bg-purple-50 dark:bg-[#1e1e24] border border-purple-100 dark:border-white/5 rounded-[1.5rem] hover:shadow-lg transition-all text-right"
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-2xl flex items-center justify-center text-purple-600 dark:text-purple-400 group-hover:scale-110 transition-transform">
              <MapPin size={24} />
            </div>
            <div>
              <h3 className="font-bold text-gray-800 dark:text-white text-lg">إدارة الفروع</h3>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">تعديل العناوين والمواقع</p>
            </div>
          </div>
          <div className="w-8 h-8 rounded-full bg-white dark:bg-white/5 flex items-center justify-center text-gray-400 group-hover:bg-purple-500 group-hover:text-white transition-colors">
            <Plus size={16} />
          </div>
        </button>
      </div>

      <div className="border-t border-gray-200 dark:border-white/5 my-6"></div>

      {/* Menu Management List Container */}
      <div className="menu-management-list space-y-4">
        
        {categories.map((category) => (
          <div key={category.id} className="animate-fade-in">
            
            {/* Category Row */}
            <div 
              onClick={() => toggleCategory(category.id)}
              className={`
                group relative flex items-center justify-between p-4 rounded-[1.5rem] 
                bg-[#2e2e2e] border border-white/5 
                hover:border-accent/30 hover:shadow-lg transition-all cursor-pointer
                ${category.isOpen ? 'ring-2 ring-primary/20 mb-4' : 'mb-4'}
              `}
            >
              {/* Right Side: Sort & Info */}
              <div className="flex items-center gap-5">
                {/* Sort Arrows */}
                <div className="flex flex-col -space-y-1 text-gray-500">
                  <ChevronUp size={16} className="hover:text-accent cursor-pointer transition-colors" />
                  <ChevronDown size={16} className="hover:text-accent cursor-pointer transition-colors" />
                </div>

                <div className="w-12 h-12 rounded-xl bg-[#404040] flex items-center justify-center text-accent shadow-inner">
                  <GripVertical size={20} />
                </div>
                
                <div>
                  <h3 className="text-xl font-bold text-white tracking-wide">{category.name}</h3>
                  <p className="text-xs text-gray-400 mt-0.5 font-medium">{category.items.length} منتجات</p>
                </div>
              </div>

              {/* Left Side: Actions */}
              <div className="flex items-center gap-2 pl-2">
                <ActionButton 
                  icon={<Eye size={18} />} 
                  title="عرض/إخفاء"
                />
                
                <ActionButton 
                  icon={<Plus size={18} />} 
                  onClick={() => setActiveModal('addProduct')}
                  title="إضافة منتج"
                />

                <ActionButton 
                  icon={<Edit3 size={18} />} 
                  title="تعديل"
                />

                <ActionButton 
                  icon={<Trash2 size={18} />} 
                  variant="danger"
                  title="حذف"
                />
                
                <div className="border-r border-white/10 h-8 mx-2"></div>
                
                <div className="text-gray-500 transform transition-transform duration-300">
                  {category.isOpen ? <ChevronUp size={24} /> : <ChevronDown size={24} />}
                </div>
              </div>
            </div>

            {/* Items List (Collapsible) */}
            {category.isOpen && (
              <div className="pr-12 pl-4 space-y-3 mb-8 animate-zoom-in">
                {category.items.map((item) => (
                  <div 
                    key={item.id} 
                    className="flex items-center justify-between p-3 rounded-[1.2rem] bg-[#252525] border border-white/5 hover:bg-[#2a2a2a] transition-colors group"
                  >
                    {/* Item Info */}
                    <div className="flex items-center gap-4">
                      <div className="flex flex-col -space-y-1 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChevronUp size={14} className="hover:text-accent cursor-pointer" />
                        <ChevronDown size={14} className="hover:text-accent cursor-pointer" />
                      </div>

                      <div className="w-12 h-12 rounded-lg bg-gray-800 overflow-hidden relative">
                         <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                         {!item.available && <div className="absolute inset-0 bg-black/60 flex items-center justify-center"><EyeOff size={14} className="text-white"/></div>}
                      </div>

                      <div>
                        <h4 className={`text-base font-bold ${item.available ? 'text-gray-200' : 'text-gray-500 line-through'}`}>
                          {item.name}
                        </h4>
                        <span className="text-sm font-mono text-accent">{item.price} ر.س</span>
                      </div>
                    </div>

                    {/* Item Actions */}
                    <div className="flex items-center gap-2 opacity-60 group-hover:opacity-100 transition-opacity">
                      <button 
                        onClick={() => toggleItemAvailability(category.id, item.id)}
                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-colors ${item.available ? 'bg-[#333] text-gray-400 hover:text-white' : 'bg-red-900/30 text-red-500'}`}
                        title="توفر المنتج"
                      >
                         {item.available ? <Eye size={14} /> : <EyeOff size={14} />}
                      </button>
                      <button className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-gray-400 hover:bg-blue-600 hover:text-white transition-colors">
                        <Edit3 size={14} />
                      </button>
                      <button className="w-8 h-8 rounded-full bg-[#333] flex items-center justify-center text-gray-400 hover:bg-red-600 hover:text-white transition-colors">
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                
                {category.items.length === 0 && (
                   <div className="text-center py-6 border-2 border-dashed border-[#333] rounded-xl text-gray-500 text-sm">
                     لا توجد منتجات في هذه الفئة
                   </div>
                )}
                
                <button 
                  onClick={() => setActiveModal('addProduct')}
                  className="w-full py-3 flex items-center justify-center gap-2 rounded-xl border border-dashed border-white/10 text-gray-400 hover:bg-white/5 hover:text-accent transition-colors text-sm font-bold"
                >
                  <Plus size={16} />
                  إضافة منتج جديد لـ {category.name}
                </button>
              </div>
            )}

          </div>
        ))}
      </div>

      {/* Modals */}
      <Modal 
        isOpen={activeModal === 'addCategory'} 
        onClose={() => setActiveModal('none')} 
        title="إضافة فئة جديدة"
      >
        <AddCategoryForm onClose={() => setActiveModal('none')} />
      </Modal>

      <Modal 
        isOpen={activeModal === 'addProduct'} 
        onClose={() => setActiveModal('none')} 
        title="إضافة منتج جديد"
        maxWidth="max-w-4xl"
      >
        <AddProductForm onClose={() => setActiveModal('none')} />
      </Modal>

      <Modal 
        isOpen={activeModal === 'manageTables'} 
        onClose={() => setActiveModal('none')} 
        title="إدارة الطاولات"
      >
        <ManageTablesForm onClose={() => setActiveModal('none')} />
      </Modal>

      <Modal 
        isOpen={activeModal === 'manageBranches'} 
        onClose={() => setActiveModal('none')} 
        title="إدارة الفروع"
      >
        <ManageBranchesForm onClose={() => setActiveModal('none')} />
      </Modal>

    </div>
  );
};

export default MenuManagement;