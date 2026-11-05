import React from 'react';
import { Search, Bell, Moon, Sun, Menu, User, ChevronDown } from 'lucide-react';
import { ThemeMode } from '../lib/types';

interface TopNavProps {
  toggleSidebar: () => void;
  theme: ThemeMode;
  toggleTheme: () => void;
}

const TopNav: React.FC<TopNavProps> = ({ toggleSidebar, theme, toggleTheme }) => {
  return (
    <header className="sticky top-6 z-30 mx-4 lg:mx-0 mb-8">
      <div className="glass rounded-[2.5rem] p-3 pl-4 shadow-glass flex items-center justify-between transition-all duration-300">
        
        {/* Right Side: Hamburger & Search */}
        <div className="flex items-center gap-4 flex-1">
          <button 
            onClick={toggleSidebar} 
            className="p-3 text-primary dark:text-white lg:hidden hover:bg-black/5 dark:hover:bg-white/10 rounded-full transition-colors"
          >
            <Menu size={24} />
          </button>

          <div className="hidden sm:flex items-center w-full max-w-lg relative group">
            <div className="absolute right-4 text-gray-400 group-focus-within:text-accent transition-colors">
              <Search size={20} />
            </div>
            <input 
              type="text" 
              placeholder="ابحث عن طلبات، عملاء، أو عناصر القائمة..." 
              className="w-full h-12 pr-12 pl-6 rounded-[2rem] bg-gray-100/50 dark:bg-black/20 text-gray-700 dark:text-gray-200 border border-transparent focus:border-accent/30 focus:bg-white dark:focus:bg-black/40 focus:ring-4 focus:ring-accent/10 transition-all outline-none placeholder-gray-400/80 text-sm font-medium"
            />
          </div>
        </div>

        {/* Left Side: Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          
          {/* Theme Toggle */}
          <button 
            onClick={toggleTheme}
            className="w-12 h-12 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 transition-all active:scale-95"
            title="تبديل المظهر"
          >
            {theme === 'light' ? <Moon size={22} /> : <Sun size={22} className="text-accent" />}
          </button>

          {/* Notifications */}
          <button className="relative w-12 h-12 flex items-center justify-center rounded-full text-gray-500 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10 transition-all active:scale-95">
            <Bell size={22} />
            <span className="absolute top-3 left-3 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white dark:border-darkbg animate-pulse"></span>
          </button>

          {/* Profile Dropdown Trigger */}
          <div className="flex items-center gap-3 mr-2 pl-2 cursor-pointer group">
            <div className="hidden md:block text-left transition-opacity group-hover:opacity-80">
              <p className="text-sm font-bold text-gray-800 dark:text-white">أحمد المدير</p>
              <p className="text-[10px] text-gray-500 dark:text-gray-400 font-medium uppercase tracking-wider">المالك</p>
            </div>
            
            <div className="relative">
              <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-primary-light p-0.5 shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform duration-300">
                <div className="w-full h-full rounded-full bg-white dark:bg-darkbg flex items-center justify-center overflow-hidden">
                  <img src="https://ui-avatars.com/api/?name=Ahmed+Manager&background=random" alt="Avatar" className="w-full h-full object-cover opacity-90 hover:opacity-100" />
                </div>
              </div>
              <div className="absolute bottom-0 right-0 w-4 h-4 bg-green-500 border-2 border-white dark:border-darkbg rounded-full"></div>
            </div>
          </div>

        </div>
      </div>
    </header>
  );
};

export default TopNav;