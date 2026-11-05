import React from 'react';
import { Crown, CheckCircle2, Star, Sparkles, ArrowRight, Zap, Shield, HelpCircle } from 'lucide-react';

const SubscriptionsPage: React.FC = () => {
  const currentFeatures = [
    'عدد لا محدود من الأصناف',
    'إدارة 3 فروع',
    'تقارير ومبيعات متقدمة',
    'دعم فني عبر الواتساب 24/7',
    'نظام ولاء العملاء (النقاط)',
    'إزالة شعار MenuFi من المنيو',
    'ربط مع تطبيقات التوصيل',
  ];

  const usageStats = [
    { label: 'الطلبات الشهرية', used: 850, limit: 1000, color: 'bg-green-500' },
    { label: 'عدد الأصناف', used: 48, limit: '∞', color: 'bg-accent', isUnlimited: true },
    { label: 'حسابات الموظفين', used: 3, limit: 5, color: 'bg-blue-500' },
  ];

  return (
    <div className="animate-fade-in space-y-8 pb-10 flex flex-col items-center justify-start min-h-[80vh] pt-4">
      
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="text-4xl font-extrabold text-gray-800 dark:text-white drop-shadow-sm mb-3">اشتراكي</h2>
        <p className="text-gray-500 dark:text-gray-400 text-lg">تفاصيل الباقة الحالية وحدود الاستخدام</p>
      </div>

      {/* Main Card Container */}
      <div className="w-full max-w-5xl grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
        
        {/* Left Side: The Premium Card */}
        <div className="lg:col-span-2 relative group">
           {/* Ambient Glow */}
           <div className="absolute -inset-1 bg-gradient-to-r from-accent via-yellow-500 to-primary rounded-[2.5rem] blur opacity-25 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
           
           <div className="relative bg-[#1a1a1a] rounded-[2.5rem] overflow-hidden border border-white/10 shadow-2xl">
              {/* Decorative Background */}
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -mr-20 -mt-20"></div>
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -ml-20 -mb-20"></div>
              
              <div className="p-8 md:p-10 relative z-10">
                 <div className="flex justify-between items-start mb-8">
                    <div>
                       <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-400 to-accent rounded-full text-black font-bold text-xs mb-3 shadow-lg shadow-yellow-400/20">
                          <Crown size={14} fill="currentColor" />
                          <span>الباقة الذهبية</span>
                       </div>
                       <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">وصول كامل، بلا حدود.</h3>
                    </div>
                    <div className="w-16 h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center backdrop-blur-md">
                       <Sparkles size={32} className="text-accent" />
                    </div>
                 </div>

                 {/* Price & Renewal */}
                 <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-white/10">
                    <div>
                       <p className="text-gray-400 text-sm mb-1">سعر التجديد</p>
                       <div className="flex items-baseline gap-1">
                          <span className="text-4xl font-bold text-white font-mono">299</span>
                          <span className="text-sm text-gray-400">ر.س / شهرياً</span>
                       </div>
                    </div>
                    <div className="text-left md:text-right">
                       <p className="text-gray-400 text-sm mb-1">التجديد القادم</p>
                       <p className="text-xl font-bold text-white font-mono flex items-center gap-2">
                         25 نوفمبر 2023
                         <span className="w-2 h-2 rounded-full bg-green-500"></span>
                       </p>
                    </div>
                 </div>

                 {/* Features Grid */}
                 <div className="pt-8">
                    <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                       <Star size={18} className="text-accent" />
                       مميزات باقتك
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                       {currentFeatures.map((feature, idx) => (
                          <div key={idx} className="flex items-center gap-3 text-gray-300 text-sm p-2 rounded-lg hover:bg-white/5 transition-colors">
                             <CheckCircle2 size={16} className="text-accent shrink-0" />
                             {feature}
                          </div>
                       ))}
                    </div>
                 </div>
              </div>
           </div>
        </div>

        {/* Right Side: Usage & Actions */}
        <div className="space-y-6">
           
           {/* Usage Stats Card */}
           <div className="bg-white dark:bg-[#1a1a1a] rounded-[2rem] p-6 border border-gray-100 dark:border-white/5 shadow-xl shadow-black/5">
              <h4 className="font-bold text-gray-800 dark:text-white mb-6 flex items-center gap-2">
                 <Zap size={20} className="text-yellow-500" />
                 استهلاك الموارد
              </h4>
              
              <div className="space-y-6">
                 {usageStats.map((stat, idx) => (
                    <div key={idx}>
                       <div className="flex justify-between text-xs font-bold mb-2">
                          <span className="text-gray-600 dark:text-gray-300">{stat.label}</span>
                          <span className="text-gray-500 dark:text-gray-400 font-mono">
                             {stat.used} <span className="text-gray-300">/</span> {stat.limit}
                          </span>
                       </div>
                       <div className="w-full bg-gray-100 dark:bg-white/10 h-2.5 rounded-full overflow-hidden">
                          <div 
                             className={`h-full rounded-full ${stat.color} transition-all duration-1000`}
                             style={{ width: stat.isUnlimited ? '10%' : `${(stat.used / (stat.limit as number)) * 100}%` }}
                          ></div>
                       </div>
                    </div>
                 ))}
              </div>
           </div>

           {/* Support Card */}
           <div className="bg-gradient-to-br from-blue-600 to-blue-800 rounded-[2rem] p-6 text-white shadow-lg shadow-blue-900/20 relative overflow-hidden group cursor-pointer hover:scale-[1.02] transition-transform">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-10 -mt-10 group-hover:bg-white/20 transition-colors"></div>
              <div className="relative z-10">
                 <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-4 backdrop-blur-sm">
                    <Shield size={20} />
                 </div>
                 <h4 className="font-bold text-lg mb-1">ضمان استعادة الأموال</h4>
                 <p className="text-blue-100 text-xs leading-relaxed mb-4">
                    غير راضٍ عن الخدمة؟ يمكنك استرداد المبلغ خلال 14 يوم.
                 </p>
                 <button className="text-xs font-bold bg-white text-blue-800 px-4 py-2 rounded-lg hover:bg-blue-50 transition-colors">
                    تواصل مع الدعم
                 </button>
              </div>
           </div>

           {/* Actions */}
           <button className="w-full py-4 rounded-2xl border-2 border-dashed border-gray-300 dark:border-white/10 text-gray-500 dark:text-gray-400 font-bold hover:border-primary hover:text-primary dark:hover:border-accent dark:hover:text-accent transition-all flex items-center justify-center gap-2 group">
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform rtl:rotate-180" />
              ترقية الباقة
           </button>

        </div>

      </div>

      <div className="mt-8 flex items-center gap-2 text-xs text-gray-400">
         <HelpCircle size={14} />
         <span>هل تحتاج مساعدة في اختيار الباقة المناسبة؟</span>
         <a href="#" className="underline hover:text-primary">تواصل معنا</a>
      </div>

    </div>
  );
};

export default SubscriptionsPage;