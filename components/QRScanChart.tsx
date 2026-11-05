import React from 'react';
import { QrCode, TrendingUp, Calendar, Users, ArrowUpRight } from 'lucide-react';

const QRScanChart: React.FC = () => {
  // Mock Data for 30 days with slightly more variance for visual interest
  const data = Array.from({ length: 15 }, (_, i) => ({
    day: i * 2 + 1,
    value: Math.floor(Math.random() * (120 - 40 + 1)) + 40, 
  }));

  const totalScans = 3450;
  const maxValue = Math.max(...data.map(d => d.value));

  return (
    <div className="glass rounded-[2.5rem] p-8 relative overflow-hidden h-full flex flex-col group">
      {/* Decorative Background */}
      <div className="absolute -right-20 -top-20 w-64 h-64 bg-primary/10 dark:bg-accent/5 rounded-full blur-3xl pointer-events-none transition-all duration-700 group-hover:bg-primary/20"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white flex items-center gap-2">
            <div className="p-2 bg-primary/10 dark:bg-white/10 rounded-xl text-primary dark:text-accent">
               <QrCode size={18} />
            </div>
            تحليلات الباركود
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1 pr-11">نشاط المسح لهذا الشهر</p>
        </div>
        <div className="flex items-center gap-2 bg-white dark:bg-white/5 px-3 py-1.5 rounded-xl text-xs font-bold text-gray-600 dark:text-gray-300 border border-gray-100 dark:border-white/10 shadow-sm">
          <Calendar size={14} />
          <span>أكتوبر 2023</span>
        </div>
      </div>

      {/* Main Stats Row */}
      <div className="flex items-center gap-6 mb-8 relative z-10">
         <div>
            <p className="text-xs text-gray-400 font-medium mb-1">إجمالي المسحات</p>
            <div className="flex items-end gap-2">
               <span className="text-4xl font-extrabold text-gray-800 dark:text-white font-mono tracking-tighter">
               {totalScans.toLocaleString()}
               </span>
               <div className="flex items-center gap-0.5 text-green-500 text-xs font-bold mb-1.5 bg-green-500/10 px-1.5 py-0.5 rounded-md">
                  <ArrowUpRight size={12} />
                  <span>12%</span>
               </div>
            </div>
         </div>
         <div className="w-px h-10 bg-gray-200 dark:bg-white/10"></div>
         <div>
            <p className="text-xs text-gray-400 font-medium mb-1">أعلى يوم</p>
            <div className="flex items-end gap-2">
               <span className="text-2xl font-bold text-gray-800 dark:text-white font-mono">
               142
               </span>
               <span className="text-xs text-gray-500 mb-1">مسحة</span>
            </div>
         </div>
      </div>

      {/* Chart Visualization */}
      <div className="flex-1 flex items-end gap-2 sm:gap-3 min-h-[180px] relative z-10 pb-2">
        {data.map((item, index) => {
          const heightPercentage = (item.value / maxValue) * 100;
          const isPeak = item.value === maxValue;
          
          return (
            <div key={index} className="flex-1 flex flex-col justify-end group/bar relative h-full">
              {/* Tooltip */}
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 opacity-0 group-hover/bar:opacity-100 transition-all duration-300 transform translate-y-2 group-hover/bar:translate-y-0 z-20">
                 <div className="bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-[10px] font-bold py-1.5 px-3 rounded-lg shadow-xl whitespace-nowrap relative">
                    {item.value} مسحة
                    <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-gray-900 dark:border-t-white"></div>
                 </div>
              </div>
              
              {/* Bar */}
              <div 
                style={{ height: `${heightPercentage}%` }} 
                className={`
                  w-full rounded-t-lg transition-all duration-500 ease-out relative overflow-hidden
                  ${isPeak 
                     ? 'bg-gradient-to-t from-accent to-yellow-300 shadow-[0_0_15px_rgba(230,179,37,0.4)]' 
                     : 'bg-gradient-to-t from-primary/40 to-primary dark:from-white/10 dark:to-white/30'}
                  group-hover/bar:opacity-90
                `}
              >
                 {/* Shine Effect */}
                 <div className="absolute inset-0 bg-gradient-to-b from-white/20 to-transparent opacity-0 group-hover/bar:opacity-100 transition-opacity"></div>
              </div>
              
              {/* X-Axis Label (Every 3rd item) */}
              <div className="mt-2 text-center">
                 <span className={`text-[10px] font-medium ${isPeak ? 'text-accent' : 'text-gray-400'} opacity-0 group-hover/bar:opacity-100 transition-opacity`}>
                    {item.day}
                 </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default QRScanChart;