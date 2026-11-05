import React from 'react';
import { Order } from '../lib/types';
import { MoreHorizontal, Clock, CheckCircle2, XCircle, ChefHat } from 'lucide-react';

interface RecentOrdersProps {
  orders: Order[];
}

const StatusBadge: React.FC<{ status: Order['status'] }> = ({ status }) => {
  const styles = {
    pending: 'bg-orange-100/80 text-orange-700 border border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700/30',
    completed: 'bg-green-100/80 text-green-700 border border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/30',
    cancelled: 'bg-red-100/80 text-red-700 border border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700/30',
    preparing: 'bg-blue-100/80 text-blue-700 border border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/30',
  };

  const icons = {
    pending: <Clock size={14} />,
    completed: <CheckCircle2 size={14} />,
    cancelled: <XCircle size={14} />,
    preparing: <ChefHat size={14} />,
  };

  const labels = {
    pending: 'قيد الانتظار',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    preparing: 'جاري التحضير',
  };

  return (
    <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-bold shadow-sm ${styles[status]}`}>
      {icons[status]}
      {labels[status]}
    </span>
  );
};

const RecentOrders: React.FC<RecentOrdersProps> = ({ orders }) => {
  return (
    <div className="glass rounded-[3rem] p-1 shadow-glass overflow-hidden h-full flex flex-col">
      <div className="p-8 flex justify-between items-center pb-6">
        <div>
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">أحدث الطلبات</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">سجل العمليات الحديثة</p>
        </div>
        <button className="px-5 py-2.5 bg-gray-100 dark:bg-white/5 text-gray-700 dark:text-white text-sm font-bold rounded-xl hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-all duration-300">
          عرض السجل
        </button>
      </div>
      
      <div className="overflow-x-auto px-4 pb-4">
        <table className="w-full text-right border-separate border-spacing-y-3">
          <thead className="text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider">
            <tr>
              <th className="px-6 py-2">رقم الطلب</th>
              <th className="px-6 py-2">العميل</th>
              <th className="px-6 py-2">العناصر</th>
              <th className="px-6 py-2">المجموع</th>
              <th className="px-6 py-2">الحالة</th>
              <th className="px-6 py-2">التاريخ</th>
              <th className="px-6 py-2"></th>
            </tr>
          </thead>
          <tbody className="">
            {orders.map((order) => (
              <tr key={order.id} className="group hover:scale-[1.01] transition-transform duration-200">
                <td className="bg-white/60 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 first:rounded-r-2xl last:rounded-l-2xl px-6 py-5 font-mono text-sm text-primary dark:text-accent font-bold shadow-sm backdrop-blur-sm">
                  #{order.id}
                </td>
                <td className="bg-white/60 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 px-6 py-5 text-sm font-bold text-gray-800 dark:text-gray-200 shadow-sm backdrop-blur-sm">
                  {order.customerName}
                </td>
                <td className="bg-white/60 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 px-6 py-5 text-sm text-gray-600 dark:text-gray-400 shadow-sm backdrop-blur-sm">
                  <span className="truncate max-w-[150px] block" title={order.items.join(', ')}>
                    {order.items.join(', ')}
                  </span>
                </td>
                <td className="bg-white/60 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 px-6 py-5 text-sm font-bold text-gray-800 dark:text-white shadow-sm backdrop-blur-sm">
                  {order.total} ر.س
                </td>
                <td className="bg-white/60 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 px-6 py-5 shadow-sm backdrop-blur-sm">
                  <StatusBadge status={order.status} />
                </td>
                <td className="bg-white/60 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 px-6 py-5 text-sm text-gray-500 dark:text-gray-400 dir-ltr text-right shadow-sm backdrop-blur-sm">
                  {order.date}
                </td>
                <td className="bg-white/60 dark:bg-white/5 group-hover:bg-white dark:group-hover:bg-white/10 first:rounded-r-2xl last:rounded-l-2xl px-6 py-5 text-left shadow-sm backdrop-blur-sm">
                  <button className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 dark:hover:bg-white/20 text-gray-400 hover:text-primary dark:hover:text-accent transition-all">
                    <MoreHorizontal size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentOrders;