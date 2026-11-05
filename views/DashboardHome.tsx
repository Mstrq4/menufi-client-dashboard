import React from 'react';
import StatsCard from '../components/StatsCard';
import RecentOrders from '../components/RecentOrders';
import QRScanChart from '../components/QRScanChart';
import TutorialsWidget from '../components/TutorialsWidget';
import { StatItem, Order } from '../lib/types';
import { 
  DollarSign, 
  ShoppingBag, 
  Eye, 
  Utensils, 
  Plus, 
  Target,
  Clock,
  Activity,
  Layers
} from 'lucide-react';

const DashboardHome: React.FC = () => {
  // Mock Data
  const stats: StatItem[] = [
    {
      id: '1',
      label: 'إجمالي الإيرادات',
      value: '24,500 ر.س',
      icon: <DollarSign size={28} />,
      trend: { value: 12.5, isPositive: true }
    },
    {
      id: '2',
      label: 'الطلبات الكلية',
      value: '1,240',
      icon: <ShoppingBag size={28} />,
      trend: { value: 8.2, isPositive: true }
    },
    {
      id: '3',
      label: 'زيارات القائمة',
      value: '8,432',
      icon: <Eye size={28} />,
      trend: { value: 2.1, isPositive: false }
    },
    {
      id: '4',
      label: 'الأصناف النشطة',
      value: '48',
      icon: <Utensils size={28} />,
      trend: { value: 4.5, isPositive: true }
    },
  ];

  const recentOrders: Order[] = [
    { id: '1024', customerName: 'محمد العمري', items: ['إسكندر كباب', 'بيبسي'], total: 65, status: 'preparing', date: '14:30' },
    { id: '1023', customerName: 'سارة خالد', items: ['مشاوي مشكلة', 'سلطة خضراء'], total: 120, status: 'completed', date: '13:15' },
    { id: '1022', customerName: 'فهد السعيد', items: ['كفتة بالجبن', 'حمص', 'ماء'], total: 55, status: 'pending', date: '13:05' },
    { id: '1021', customerName: 'نورة العلي', items: ['شيش طاووق'], total: 40, status: 'cancelled', date: '12:45' },
  ];

  return (
    <div className="space-y-8 animate-fade-in">
      
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 pb-2">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white drop-shadow-sm">ملخص العمليات</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-2 text-lg font-medium">مرحباً أحمد، إليك ملخص لأداء مطعمك اليوم 🚀</p>
        </div>
        
        <div className="flex items-center gap-3">
          {/* Add Category Button */}
          <button className="flex items-center justify-center gap-2 bg-white dark:bg-white/10 text-gray-700 dark:text-white px-6 py-4 rounded-[2rem] shadow-sm hover:bg-gray-50 dark:hover:bg-white/20 transition-all active:scale-95 border border-gray-200 dark:border-white/5">
            <Layers size={20} className="text-primary dark:text-accent" />
            <span className="font-bold">إضافة فئة</span>
          </button>

          {/* Add Order Button */}
          <button className="flex items-center justify-center gap-3 bg-gradient-to-r from-primary to-primary-light hover:to-primary text-white px-8 py-4 rounded-[2rem] shadow-lg shadow-primary/30 transition-all active:scale-95 group hover:-translate-y-0.5">
            <span className="font-bold text-lg">طلب جديد</span>
            <div className="bg-white/20 p-1 rounded-full group-hover:rotate-90 transition-transform duration-300">
               <Plus size={20} />
            </div>
          </button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map(item => <StatsCard key={item.id} item={item} />)}
      </div>

      {/* Main Content Grid 1: QR Chart & Recent Orders */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-8 items-stretch">
         {/* QR Scan Chart - Takes 1 col on XL */}
         <div className="xl:col-span-1 h-[450px]">
            <QRScanChart />
         </div>

         {/* Recent Orders - Takes 2 cols on XL */}
         <div className="xl:col-span-2 h-[450px]">
            <RecentOrders orders={recentOrders} />
         </div>
      </div>

      {/* Activity Center Section */}
      <div className="pt-2">
        <h3 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">مؤشرات الأداء</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
          {/* 1. Target Widget */}
          <div className="glass rounded-[2.5rem] p-6 relative overflow-hidden group hover:shadow-xl transition-all h-full">
             <div className="absolute top-0 right-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -mr-10 -mt-10"></div>
             <div className="flex justify-between items-start mb-6">
                <div>
                  <h4 className="font-bold text-gray-700 dark:text-white">المستهدف اليومي</h4>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">المبيعات المستهدفة</p>
                </div>
                <div className="p-3 bg-accent/10 text-accent rounded-full">
                  <Target size={20} />
                </div>
             </div>
             
             <div className="flex items-end gap-2 mb-3">
               <span className="text-4xl font-bold font-mono text-primary dark:text-white">85%</span>
               <span className="text-sm text-green-500 font-bold mb-1.5">+5%</span>
             </div>
             
             <div className="w-full bg-gray-200 dark:bg-white/10 h-3 rounded-full overflow-hidden">
               <div className="bg-accent h-full rounded-full w-[85%] shadow-glow"></div>
             </div>
             <p className="text-xs text-gray-400 mt-3 font-medium">باقي 3,200 ر.س للوصول للهدف</p>
          </div>

          {/* 2. Notifications List */}
          <div className="glass rounded-[2.5rem] p-6 hover:shadow-xl transition-all h-full">
            <div className="flex items-center justify-between mb-6">
              <h4 className="font-bold text-gray-700 dark:text-white">آخر التنبيهات</h4>
              <span className="text-xs bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 px-3 py-1 rounded-full font-bold">3 جديد</span>
            </div>
            
            <div className="space-y-4">
              {[
                { title: 'طلب جديد #1025', time: 'منذ 2 دقيقة', type: 'order' },
                { title: 'انخفاض مخزون الكباب', time: 'منذ 15 دقيقة', type: 'alert' },
                { title: 'تم اكتمال طلب #1020', time: 'منذ 30 دقيقة', type: 'success' },
              ].map((notif, idx) => (
                <div key={idx} className="flex items-start gap-4 p-3 rounded-2xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors cursor-pointer group border border-transparent hover:border-gray-100 dark:hover:border-white/5">
                  <div className={`mt-1.5 w-2.5 h-2.5 rounded-full shrink-0 shadow-sm ${notif.type === 'alert' ? 'bg-red-500' : notif.type === 'success' ? 'bg-green-500' : 'bg-accent'}`}></div>
                  <div className="flex-1">
                    <p className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-accent transition-colors">{notif.title}</p>
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-gray-400">
                      <Clock size={12} />
                      <span>{notif.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 3. Kitchen Status */}
          <div className="glass rounded-[2.5rem] p-6 hover:shadow-xl transition-all flex flex-col justify-between h-full">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-700 dark:text-white flex items-center gap-2">
                ضغط المطبخ
              </h4>
              <Activity size={20} className="text-blue-500" />
            </div>
            
            <div className="flex-1 flex flex-col items-center justify-center relative min-h-[120px]">
               <div className="relative w-40 h-20 overflow-hidden">
                 <div className="absolute top-0 left-0 w-full h-full border-[16px] border-gray-200 dark:border-white/10 rounded-t-full border-b-0"></div>
                 <div className="absolute top-0 left-0 w-full h-full border-[16px] border-blue-500 rounded-t-full border-b-0 rotate-[-45deg] origin-bottom opacity-80"></div>
               </div>
               <div className="text-center mt-2">
                  <span className="text-2xl font-bold text-gray-800 dark:text-white block">متوسط</span>
                  <span className="text-xs text-gray-400 font-medium">3 طهاة متاحين</span>
               </div>
            </div>
            
            <button className="w-full mt-4 py-3 bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-300 font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-colors text-sm">
              إدارة طاقم المطبخ
            </button>
          </div>

        </div>
      </div>

      {/* Tutorials Section */}
      <div className="pt-4">
         <TutorialsWidget />
      </div>

    </div>
  );
};

export default DashboardHome;