import React from 'react';
import { Play, BookOpen, MonitorPlay } from 'lucide-react';

const TutorialsWidget: React.FC = () => {
  // Exactly 6 tutorials as requested
  const tutorials = [
    { id: 1, title: 'إضافة صنف جديد للقائمة', duration: '2:30' },
    { id: 2, title: 'إدارة الطاولات والباركود', duration: '1:45' },
    { id: 3, title: 'التعامل مع الطلبات الجديدة', duration: '3:15' },
    { id: 4, title: 'تخصيص واجهة المتجر', duration: '2:10' },
    { id: 5, title: 'شرح التقارير المالية', duration: '5:20' },
    { id: 6, title: 'نظام ولاء العملاء', duration: '3:45' },
  ];

  return (
    <div className="glass rounded-[2.5rem] p-8 relative overflow-hidden">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 bg-red-100 dark:bg-red-500/10 rounded-2xl text-red-600 dark:text-red-400">
          <MonitorPlay size={24} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">شروحات المنصة</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">فيديوهات تعليمية لمساعدتك في إدارة مطعمك</p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {tutorials.map((tutorial) => (
          <div 
            key={tutorial.id}
            className="group flex flex-col gap-3 p-3 rounded-[1.5rem] bg-gray-50 dark:bg-white/5 border border-transparent hover:border-primary/20 dark:hover:border-accent/30 hover:bg-white dark:hover:bg-white/10 transition-all cursor-pointer hover:shadow-xl hover:-translate-y-1"
          >
            {/* Thumbnail Container */}
            <div className="relative w-full aspect-video rounded-2xl overflow-hidden shadow-sm bg-gray-800">
               <img 
                 src={`https://picsum.photos/seed/${tutorial.id + 100}/500/300`} 
                 alt={tutorial.title} 
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-90" 
               />
               
               {/* Overlay */}
               <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors flex items-center justify-center">
                  <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white border border-white/30 group-hover:scale-110 group-hover:bg-primary group-hover:border-primary transition-all duration-300">
                    <Play size={20} fill="currentColor" className="ml-1" />
                  </div>
               </div>

               {/* Duration Badge */}
               <div className="absolute bottom-2 right-2 px-2 py-1 bg-black/60 backdrop-blur-sm rounded-lg text-[10px] font-mono text-white border border-white/10">
                 {tutorial.duration}
               </div>
            </div>
            
            {/* Info */}
            <div className="px-1 pb-1">
              <h4 className="text-sm font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-accent transition-colors line-clamp-1">
                {tutorial.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1">
                خطوات سهلة وبسيطة لإتقان هذه الميزة.
              </p>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-8 text-center">
         <button className="px-6 py-3 rounded-xl bg-gray-100 dark:bg-white/5 text-sm font-bold text-gray-600 dark:text-gray-300 hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-all flex items-center justify-center gap-2 mx-auto">
            <BookOpen size={18} />
            عرض جميع الشروحات
         </button>
      </div>
    </div>
  );
};

export default TutorialsWidget;