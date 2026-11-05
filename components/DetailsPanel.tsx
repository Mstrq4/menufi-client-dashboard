import React from 'react';
import { 
  Bell, 
  Activity, 
  Clock,
  Target,
} from 'lucide-react';

const DetailsPanel: React.FC = () => {
  return (
    <aside 
      className={`fixed z-40 transition-all duration-500 cubic-bezier(0.4, 0, 0.2, 1)
      /* Positioning: Floating on Left (End of RTL) */
      top-6 bottom-6 left-6
      
      /* Visual Style */
      bg-white/80 dark:bg-[#1A1616]/80
      backdrop-blur-xl border border-white/20 dark:border-white/5
      shadow-2xl shadow-black/5
      rounded-[3rem]
      
      /* Responsive Visibility: Hidden on small, Visible on XL+ */
      hidden xl:flex flex-col overflow-hidden
      w-[280px]
      `}
    >
      {/* Content Container */}
      <div className="flex-1 overflow-y-auto no-scrollbar py-8 px-6">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h3 className="text-xl font-extrabold text-gray-800 dark:text-white">مركز النشاط</h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">تحديثات فورية للأداء</p>
        </div>

        {/* Full Content Mode */}
        <div className="space-y-6">
          
          {/* Target Widget */}
          <div className="bg-gradient-to-br from-primary to-primary-dark rounded-[2.5rem] p-6 text-white relative overflow-hidden shadow-lg shadow-primary/20 group">
             <div className="absolute top-0 right-0 w-20 h-20 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10"></div>
             <div className="flex justify-between items-start mb-4">
                <span className="text-sm font-medium text-white/80">هدف اليوم</span>
                <Target size={18} className="text-accent" />
             </div>
             
             <div className="flex items-end gap-2 mb-2">
               <span className="text-3xl font-bold font-mono">85%</span>
               <span className="text-xs text-accent mb-1.5">+5%</span>
             </div>
             
             <div className="w-full bg-black/30 h-2 rounded-full overflow-hidden">
               <div className="bg-accent h-full rounded-full w-[85%] shadow-[0_0_10px_rgba(230,179,37,0.5)]"></div>
             </div>
             <p className="text-[10px] text-white/60 mt-2">باقي 3,200 ر.س للوصول للهدف</p>
          </div>

          {/* Notifications List */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-bold text-gray-700 dark:text-gray-200 text-sm">أحدث التنبيهات</h4>
              <span className="text-[10px] bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 px-2 py-0.5 rounded-full font-bold">3 جديد</span>
            </div>
            
            <div className="space-y-3">
              {[
                { title: 'طلب جديد #1025', time: 'منذ 2 دقيقة', type: 'order' },
                { title: 'انخفاض مخزون الكباب', time: 'منذ 15 دقيقة', type: 'alert' },
                { title: 'تم اكتمال طلب #1020', time: 'منذ 30 دقيقة', type: 'success' },
              ].map((notif, idx) => (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-2xl bg-white dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors cursor-pointer group">
                  <div className={`mt-0.5 w-2 h-2 rounded-full shrink-0 ${notif.type === 'alert' ? 'bg-red-500' : notif.type === 'success' ? 'bg-green-500' : 'bg-accent'}`}></div>
                  <div>
                    <p className="text-xs font-bold text-gray-800 dark:text-gray-200 group-hover:text-primary dark:group-hover:text-accent transition-colors">{notif.title}</p>
                    <div className="flex items-center gap-1 mt-1 text-[10px] text-gray-400">
                      <Clock size={10} />
                      <span>{notif.time}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Kitchen Status */}
          <div className="bg-gray-50 dark:bg-white/5 rounded-[2.5rem] p-5 border border-gray-100 dark:border-white/5">
            <h4 className="font-bold text-gray-700 dark:text-gray-200 text-sm mb-4 flex items-center gap-2">
              <Activity size={16} className="text-blue-500" />
              ضغط المطبخ
            </h4>
            <div className="flex items-center justify-center relative w-full h-24">
               {/* Simplified Speedometer Visual */}
               <div className="absolute inset-0 flex items-center justify-center">
                 <div className="w-24 h-12 border-t-8 border-l-8 border-r-8 border-gray-200 dark:border-gray-700 rounded-t-full border-b-0"></div>
                 <div className="absolute w-24 h-12 border-t-8 border-l-8 border-r-8 border-blue-500 rounded-t-full border-b-0 rotate-[-45deg] origin-bottom opacity-80"></div>
               </div>
               <div className="absolute bottom-0 text-center">
                  <span className="text-xl font-bold text-gray-800 dark:text-white block -mb-1">متوسط</span>
                  <span className="text-[10px] text-gray-400">3 طهاة متاحين</span>
               </div>
            </div>
          </div>

        </div>
      </div>
    </aside>
  );
};

export default DetailsPanel;