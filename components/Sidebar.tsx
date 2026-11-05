import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  UtensilsCrossed, 
  ShoppingBag, 
  Settings, 
  LogOut,
  Target,
  ChevronLeft,
  Sparkles,
  Search,
  QrCode,
  Copy,
  Check,
  Download,
  CreditCard
} from 'lucide-react';
import { NavItem } from '../lib/types';

interface SidebarProps {
  isOpen: boolean;
  toggleSidebar: () => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenAccountSettings: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ 
  isOpen, 
  toggleSidebar, 
  activeTab, 
  setActiveTab,
  onOpenAccountSettings
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  
  const navItems: NavItem[] = [
    { id: 'dashboard', label: 'الرئيسية', icon: <LayoutDashboard size={20} /> },
    { id: 'menu', label: 'قائمة الطعام', icon: <UtensilsCrossed size={20} /> },
    { id: 'orders', label: 'الطلبات', icon: <ShoppingBag size={20} /> },
    { id: 'subscriptions', label: 'الباقات والاشتراك', icon: <CreditCard size={20} /> },
    { id: 'settings', label: 'الإعدادات', icon: <Settings size={20} /> },
  ];

  const filteredNavItems = navItems.filter(item => 
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleCopyLink = () => {
    navigator.clipboard.writeText('https://menufi.com/menu/iskandar-efendi');
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Mobile Overlay */}
      <div 
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden transition-opacity duration-500 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        onClick={toggleSidebar}
      />

      {/* Sidebar Container */}
      <aside 
        className={`fixed z-50 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
        /* Dimensions & Position */
        top-4 bottom-4 right-4 w-[260px]
        ${isOpen ? 'translate-x-0' : 'translate-x-[120%] lg:translate-x-0'}
        
        /* Visual Style: Modern Glassmorphic Gradient */
        bg-gradient-to-b from-[#900000] via-[#800000] to-[#5a0000]
        text-white shadow-[0_20px_50px_rgba(0,0,0,0.3)]
        border border-white/10
        
        /* Shape: Fully Rounded Floating Panel */
        rounded-[2.5rem]
        
        /* Layout */
        flex flex-col overflow-hidden
        `}
      >
        {/* Background Ambient Glow */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-white/10 to-transparent pointer-events-none"></div>
        <div className="absolute bottom-0 right-0 w-32 h-32 bg-accent/20 rounded-full blur-3xl pointer-events-none -mb-10 -mr-10"></div>

        {/* 1. Header & Logo (Fixed at Top) */}
        <div className="pt-8 pb-4 px-6 text-center relative z-10 shrink-0">
          <div className="relative inline-block group">
            <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-lg group-hover:blur-xl transition-all duration-500"></div>
            <div className="relative w-16 h-16 mx-auto bg-gradient-to-br from-white/20 to-white/5 rounded-2xl flex items-center justify-center mb-3 backdrop-blur-md border border-white/20 shadow-inner group-hover:scale-105 transition-transform duration-300">
              <span className="text-3xl drop-shadow-md">👨‍🍳</span>
            </div>
          </div>
          <h1 className="text-2xl font-extrabold tracking-wide text-white drop-shadow-md font-sans mt-2">MenuFi</h1>
          <div className="flex items-center justify-center gap-1 opacity-70">
             <div className="w-1 h-1 rounded-full bg-accent"></div>
             <p className="text-[10px] font-bold tracking-[0.2em] uppercase text-gray-300">لوحة الإدارة</p>
             <div className="w-1 h-1 rounded-full bg-accent"></div>
          </div>
        </div>

        {/* Scrollable Middle Section containing Widgets and Nav */}
        <div className="flex-1 overflow-y-auto px-4 pb-2 space-y-3 relative z-10 custom-scrollbar">
          
          {/* 2. Activity Center (Daily Goal) */}
          <div>
            <div className="bg-black/20 backdrop-blur-md rounded-[1.5rem] p-4 border border-white/10 relative overflow-hidden group hover:bg-black/30 transition-colors">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
              
              <div className="flex justify-between items-start mb-2 relative z-10">
                <div className="flex items-center gap-1.5">
                  <div className="p-1 bg-accent/20 rounded-lg text-accent"><Sparkles size={12} /></div>
                  <span className="text-xs font-bold text-gray-100">المستهدف اليومي</span>
                </div>
                <Target size={14} className="text-accent/80" />
              </div>
              
              <div className="flex items-end gap-2 mb-2 relative z-10">
                <span className="text-2xl font-mono font-bold text-white tracking-tighter">85%</span>
                <span className="text-[9px] text-black font-bold bg-green-400 px-1.5 py-0.5 rounded-full shadow-lg shadow-green-400/20">+5%</span>
              </div>
              
              <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden mb-2 relative z-10">
                <div className="bg-gradient-to-r from-accent to-yellow-300 h-full w-[85%] shadow-[0_0_12px_rgba(230,179,37,0.5)] rounded-full"></div>
              </div>
            </div>
          </div>

          {/* 3. Search Input */}
          <div>
            <div className="relative group">
              <div className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 group-focus-within:text-accent transition-colors">
                <Search size={14} />
              </div>
              <input 
                type="text" 
                placeholder="بحث سريع..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 border border-white/10 rounded-xl py-2.5 pr-9 pl-3 text-xs text-white placeholder-white/30 focus:outline-none focus:bg-white/15 focus:border-accent/30 transition-all"
              />
            </div>
          </div>

          {/* 4. Menu Quick Access (New Widget) */}
          <div>
            <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-2xl p-3 border border-white/10">
              <div className="flex items-center gap-2 mb-3 px-1">
                <QrCode size={14} className="text-accent" />
                <span className="text-xs font-bold text-white">القائمة الرقمية</span>
              </div>
              <div className="grid grid-cols-2 gap-2">
                <button 
                  onClick={handleCopyLink}
                  className="flex flex-col items-center justify-center gap-1 bg-black/20 hover:bg-black/40 py-2 rounded-xl border border-white/5 transition-colors group"
                  title="نسخ الرابط"
                >
                  {copied ? <Check size={16} className="text-green-400" /> : <Copy size={16} className="text-gray-300 group-hover:text-white" />}
                  <span className="text-[10px] text-gray-300">{copied ? 'تم النسخ' : 'نسخ الرابط'}</span>
                </button>
                <button 
                  className="flex flex-col items-center justify-center gap-1 bg-black/20 hover:bg-black/40 py-2 rounded-xl border border-white/5 transition-colors group"
                  title="تنزيل QR"
                >
                  <Download size={16} className="text-gray-300 group-hover:text-accent" />
                  <span className="text-[10px] text-gray-300">تنزيل QR</span>
                </button>
              </div>
            </div>
          </div>

          {/* 5. Navigation Links */}
          <nav className="space-y-2">
            {filteredNavItems.length > 0 ? (
              filteredNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    if (window.innerWidth < 1024) toggleSidebar();
                  }}
                  className={`w-full flex items-center justify-between px-4 py-3.5 rounded-2xl transition-all duration-300 group relative overflow-hidden
                    ${activeTab === item.id 
                      ? 'bg-gradient-to-r from-accent to-[#F5C84C] text-[#5a0000] font-bold shadow-[0_4px_20px_rgba(230,179,37,0.3)] scale-[1.02]' 
                      : 'text-gray-200 hover:bg-white/10 hover:text-white hover:pl-5'
                    }
                  `}
                >
                  <div className="flex items-center gap-3 relative z-10">
                    <span className={`${activeTab === item.id ? 'scale-110 rotate-3' : 'group-hover:scale-110'} transition-transform duration-300`}>
                      {item.icon}
                    </span>
                    <span className="text-sm">{item.label}</span>
                  </div>
                  
                  {activeTab === item.id && (
                    <div className="bg-white/20 p-1 rounded-full animate-pulse">
                       <ChevronLeft size={12} className="text-[#5a0000]" />
                    </div>
                  )}
                </button>
              ))
            ) : (
              <div className="text-center py-4 text-white/40 text-xs">
                لا توجد نتائج
              </div>
            )}
          </nav>

        </div>

        {/* 6. User Profile (Bottom Fixed) */}
        <div className="p-4 mt-auto relative z-10 shrink-0">
          <div className="bg-gradient-to-r from-white/10 to-transparent rounded-[1.5rem] p-3 border border-white/5 flex items-center gap-3 hover:bg-white/10 transition-all group hover:border-white/20 hover:shadow-lg">
            <div className="relative cursor-pointer" onClick={onOpenAccountSettings}>
               <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-accent to-yellow-600 p-[2px] shadow-lg">
                 <img 
                   src="https://ui-avatars.com/api/?name=Hazem+Alderay&background=random" 
                   alt="Profile" 
                   className="w-full h-full rounded-full object-cover border-2 border-[#800000]" 
                 />
               </div>
               <div className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-[#800000] rounded-full"></div>
            </div>
            
            <div className="flex-1 min-w-0 cursor-pointer" onClick={onOpenAccountSettings}>
              <p className="text-sm font-bold text-white truncate group-hover:text-accent transition-colors">حازم الدريعي</p>
              <p className="text-[10px] text-gray-300 truncate opacity-70">hazemalderay1@gmail.com</p>
            </div>
            
            <div className="flex items-center gap-1">
              <button 
                onClick={onOpenAccountSettings}
                className="text-gray-400 hover:text-white transition-colors p-1.5 hover:bg-white/10 rounded-full"
                title="إعدادات الحساب"
              >
                <Settings size={16} />
              </button>
              <button 
                className="text-gray-400 hover:text-red-300 transition-colors p-1.5 hover:bg-white/10 rounded-full"
                title="تسجيل الخروج"
              >
                <LogOut size={16} />
              </button>
            </div>
          </div>
          <div className="text-center mt-3 opacity-30 hover:opacity-100 transition-opacity">
             <p className="text-[8px] text-white font-mono uppercase tracking-widest">v2.5.0 • Systems</p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;