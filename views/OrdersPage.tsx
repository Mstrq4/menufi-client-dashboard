import React, { useState } from 'react';
import { 
  Search, 
  Clock, 
  CheckCircle2, 
  XCircle, 
  ChefHat, 
  MoreVertical, 
  Printer, 
  Download,
  ShoppingBag,
  ChevronDown,
  Eye,
  FileText,
  Share2
} from 'lucide-react';
import { Order } from '../lib/types';
import Modal from '../components/Modal';

const OrdersPage: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  // State for Print Modal
  const [printingOrder, setPrintingOrder] = useState<Order | null>(null);

  // Mock Data
  const [orders, setOrders] = useState<Order[]>([
    { id: '1028', customerName: 'عبدالله السالم', items: ['شاورما دجاج كبير', 'بيبسي', 'بطاطس'], total: 45, status: 'pending', date: '14:45' },
    { id: '1027', customerName: 'منى الشمري', items: ['مشاوي مشكلة (نفرين)', 'حمص', 'تبولة'], total: 140, status: 'preparing', date: '14:30' },
    { id: '1026', customerName: 'خالد العنزي', items: ['إسكندر كباب', 'عيران'], total: 70, status: 'preparing', date: '14:25' },
    { id: '1025', customerName: 'محمد العمري', items: ['إسكندر كباب', 'بيبسي'], total: 65, status: 'completed', date: '14:10' },
    { id: '1024', customerName: 'سارة خالد', items: ['كفتة بالجبن'], total: 55, status: 'completed', date: '13:55' },
    { id: '1023', customerName: 'ضيف غير مسجل', items: ['شيش طاووق', 'سلطة خضراء'], total: 48, status: 'cancelled', date: '13:40' },
  ]);

  const filters = [
    { id: 'all', label: 'الكل' },
    { id: 'pending', label: 'قيد الانتظار' },
    { id: 'preparing', label: 'جاري التحضير' },
    { id: 'completed', label: 'مكتمل' },
    { id: 'cancelled', label: 'ملغي' },
  ];

  const filteredOrders = orders.filter(order => {
    const matchesFilter = activeFilter === 'all' || order.status === activeFilter;
    const matchesSearch = 
      order.customerName.includes(searchQuery) || 
      order.id.includes(searchQuery) ||
      order.items.some(item => item.includes(searchQuery));
    return matchesFilter && matchesSearch;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-orange-100 text-orange-600 border-orange-200 dark:bg-orange-900/30 dark:text-orange-400 dark:border-orange-700/30';
      case 'preparing': return 'bg-blue-100 text-blue-600 border-blue-200 dark:bg-blue-900/30 dark:text-blue-400 dark:border-blue-700/30';
      case 'completed': return 'bg-green-100 text-green-600 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-700/30';
      case 'cancelled': return 'bg-red-100 text-red-600 border-red-200 dark:bg-red-900/30 dark:text-red-400 dark:border-red-700/30';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending': return <Clock size={14} />;
      case 'preparing': return <ChefHat size={14} />;
      case 'completed': return <CheckCircle2 size={14} />;
      case 'cancelled': return <XCircle size={14} />;
      default: return null;
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'pending': return 'انتظار';
      case 'preparing': return 'تحضير';
      case 'completed': return 'مكتمل';
      case 'cancelled': return 'ملغي';
      default: return status;
    }
  };

  const updateStatus = (id: string, newStatus: string) => {
    setOrders(orders.map(o => o.id === id ? { ...o, status: newStatus as Order['status'] } : o));
  };

  const handlePrintOrder = (orderId: string) => {
    const order = orders.find(o => o.id === orderId);
    if (order) setPrintingOrder(order);
  };

  const handleViewDetails = (orderId: string) => {
    alert(`فتح تفاصيل الطلب رقم #${orderId}`);
  };

  return (
    <div className="space-y-6 animate-fade-in pb-20">
      
      {/* Header & Stats */}
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
        <div>
          <h2 className="text-3xl font-extrabold text-gray-800 dark:text-white drop-shadow-sm">مركز الطلبات</h2>
          <p className="text-gray-500 dark:text-gray-400 mt-1 text-lg font-medium">متابعة ومعالجة الطلبات الواردة</p>
        </div>
        
        <div className="flex gap-3">
           <button className="flex items-center gap-2 px-5 py-3 bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/10 transition-colors font-bold text-sm">
             <Printer size={18} />
             التقرير اليومي
           </button>
           <button className="flex items-center gap-2 px-5 py-3 bg-primary text-white rounded-xl hover:bg-primary-light transition-colors shadow-lg shadow-primary/20 font-bold text-sm">
             <Download size={18} />
             تصدير Excel
           </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="glass rounded-[2rem] p-2 flex flex-col md:flex-row items-center justify-between gap-4 shadow-sm">
        <div className="flex items-center gap-1 bg-gray-100 dark:bg-black/20 p-1 rounded-[1.5rem] w-full md:w-auto overflow-x-auto no-scrollbar">
          {filters.map(filter => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id)}
              className={`px-5 py-2.5 rounded-[1.2rem] text-sm font-bold transition-all whitespace-nowrap ${
                activeFilter === filter.id 
                  ? 'bg-white dark:bg-white/10 text-primary dark:text-accent shadow-sm' 
                  : 'text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200'
              }`}
            >
              {filter.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-80 px-2">
          <input 
            type="text" 
            placeholder="بحث برقم الطلب أو اسم العميل..." 
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-11 pl-4 pr-11 rounded-xl bg-gray-50 dark:bg-white/5 border border-transparent focus:border-accent/30 focus:bg-white dark:focus:bg-black/40 outline-none text-sm dark:text-white transition-all"
          />
          <div className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-400">
            <Search size={18} />
          </div>
        </div>
      </div>

      {/* Orders Table */}
      <div className="glass rounded-[2.5rem] overflow-hidden shadow-glass min-h-[400px]">
        <div className="overflow-x-auto">
          <table className="w-full text-right border-separate border-spacing-0">
            <thead className="bg-gray-50/50 dark:bg-white/5 text-gray-500 dark:text-gray-400 text-xs uppercase font-bold tracking-wider">
              <tr>
                <th className="px-6 py-5 first:rounded-tr-2xl">رقم الطلب</th>
                <th className="px-6 py-5">العميل</th>
                <th className="px-6 py-5 w-1/3">التفاصيل</th>
                <th className="px-6 py-5">الوقت</th>
                <th className="px-6 py-5">المجموع</th>
                <th className="px-6 py-5">الحالة</th>
                <th className="px-6 py-5 last:rounded-tl-2xl text-center">إجراءات</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((order) => (
                  <tr key={order.id} className="group hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors">
                    <td className="px-6 py-5 font-mono text-sm font-bold text-primary dark:text-accent">
                      #{order.id}
                    </td>
                    <td className="px-6 py-5">
                      <div className="font-bold text-gray-800 dark:text-white text-sm">{order.customerName}</div>
                      <div className="text-[10px] text-gray-400">عميل جديد</div>
                    </td>
                    <td className="px-6 py-5">
                      <p className="text-sm text-gray-600 dark:text-gray-300 line-clamp-2 leading-relaxed">
                        {order.items.join('، ')}
                      </p>
                      <span className="text-[10px] text-gray-400 mt-1 block">{order.items.length} عناصر</span>
                    </td>
                    <td className="px-6 py-5 text-sm font-mono text-gray-500 dir-ltr text-right">
                      {order.date}
                    </td>
                    <td className="px-6 py-5 text-sm font-bold text-gray-800 dark:text-white">
                      {order.total} ر.س
                    </td>
                    <td className="px-6 py-5">
                       <div className="relative group/status">
                          <button className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold border transition-all w-full justify-between ${getStatusColor(order.status)}`}>
                             <div className="flex items-center gap-1.5">
                                {getStatusIcon(order.status)}
                                {getStatusLabel(order.status)}
                             </div>
                             <ChevronDown size={12} className="opacity-50" />
                          </button>
                          
                          {/* Status Dropdown */}
                          <div className="absolute top-full right-0 mt-1 w-40 bg-white dark:bg-[#2e2e2e] rounded-xl shadow-xl border border-gray-100 dark:border-white/10 overflow-hidden z-20 hidden group-hover/status:block animate-in fade-in zoom-in duration-100">
                             {['pending', 'preparing', 'completed', 'cancelled'].map((status) => (
                                <button
                                   key={status}
                                   onClick={() => updateStatus(order.id, status)}
                                   className={`w-full text-right px-4 py-2 text-xs font-bold hover:bg-gray-50 dark:hover:bg-white/5 flex items-center gap-2 ${order.status === status ? 'text-primary dark:text-accent bg-gray-50 dark:bg-white/5' : 'text-gray-600 dark:text-gray-300'}`}
                                >
                                   {getStatusIcon(status)}
                                   {getStatusLabel(status)}
                                </button>
                             ))}
                          </div>
                       </div>
                    </td>
                    <td className="px-6 py-5">
                      <div className="flex items-center justify-center gap-2">
                        
                        {/* View Details Button */}
                        <button 
                          onClick={() => handleViewDetails(order.id)}
                          className="p-2 bg-blue-50 text-blue-600 dark:bg-blue-900/20 dark:text-blue-400 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/40 transition-colors"
                          title="تفاصيل الطلب"
                        >
                           <FileText size={16} />
                        </button>

                        {/* Print Button */}
                        <button 
                          onClick={() => handlePrintOrder(order.id)}
                          className="p-2 bg-gray-100 text-gray-600 dark:bg-white/5 dark:text-gray-300 rounded-lg hover:bg-primary hover:text-white dark:hover:bg-accent dark:hover:text-primary transition-colors"
                          title="طباعة السند"
                        >
                           <Printer size={16} />
                        </button>

                        <button className="p-2 hover:bg-gray-200 dark:hover:bg-white/10 rounded-lg text-gray-400 transition-colors">
                          <MoreVertical size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-12 text-gray-500 dark:text-gray-400">
                    <div className="flex flex-col items-center justify-center gap-3 opacity-60">
                      <ShoppingBag size={40} />
                      <p>لا توجد طلبات تطابق بحثك</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Print Modal */}
      <Modal 
        isOpen={!!printingOrder} 
        onClose={() => setPrintingOrder(null)} 
        title="معاينة الفاتورة"
        maxWidth="max-w-md"
      >
        {printingOrder && (
          <div className="flex flex-col h-full">
             {/* Receipt Preview */}
             <div className="bg-white text-gray-900 p-6 rounded-xl shadow-inner border border-gray-100 font-mono text-sm relative overflow-hidden">
                {/* Torn Paper Effect Top */}
                <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-b from-gray-200 to-transparent opacity-20"></div>

                {/* Header */}
                <div className="text-center border-b border-dashed border-gray-300 pb-4 mb-4">
                    <div className="w-12 h-12 bg-gray-900 text-white rounded-full flex items-center justify-center mx-auto mb-2 text-xl">👨‍🍳</div>
                    <h2 className="text-xl font-bold mb-1 text-gray-900">مطعم إسكندر أفندي</h2>
                    <p className="text-xs text-gray-500">شارع التحلية، الرياض</p>
                    <p className="text-xs text-gray-500 mt-1">الرقم الضريبي: 300123456789003</p>
                    
                    <div className="flex justify-center items-center gap-4 mt-3 text-xs text-gray-500">
                       <div className="flex flex-col items-center">
                          <span className="font-bold text-gray-700">التاريخ</span>
                          <span>{printingOrder.date}</span>
                       </div>
                       <div className="w-px h-6 bg-gray-200"></div>
                       <div className="flex flex-col items-center">
                          <span className="font-bold text-gray-700">رقم الفاتورة</span>
                          <span>#{printingOrder.id}</span>
                       </div>
                    </div>
                </div>

                {/* Customer Info */}
                <div className="mb-4 text-xs">
                   <p className="flex justify-between text-gray-600 mb-1">
                      <span>العميل:</span>
                      <span className="font-bold text-gray-800">{printingOrder.customerName}</span>
                   </p>
                   <p className="flex justify-between text-gray-600">
                      <span>نوع الطلب:</span>
                      <span className="font-bold text-gray-800">محلي (Dine-in)</span>
                   </p>
                </div>

                {/* Items */}
                <div className="mb-4">
                   <div className="border-b border-gray-800 mb-2 pb-1 font-bold flex justify-between text-xs">
                      <span>الصنف</span>
                      <span>السعر</span>
                   </div>
                   <div className="space-y-2">
                      {printingOrder.items.map((item, i) => (
                        <div key={i} className="flex justify-between text-xs items-start">
                           <span className="flex-1">{item}</span>
                           <span className="text-gray-500 mx-2">1x</span>
                           <span className="font-bold">--</span>
                        </div>
                      ))}
                   </div>
                </div>

                {/* Totals */}
                <div className="border-t border-dashed border-gray-300 pt-2 space-y-1 text-xs">
                    <div className="flex justify-between text-gray-600">
                        <span>المجموع (شامل الضريبة)</span>
                        <span>{printingOrder.total} ر.س</span>
                    </div>
                    <div className="flex justify-between text-gray-500">
                        <span>الضريبة (15%)</span>
                        <span>{(printingOrder.total * 0.15).toFixed(2)} ر.س</span>
                    </div>
                    <div className="flex justify-between font-bold text-xl mt-3 pt-3 border-t-2 border-gray-900">
                        <span>الإجمالي</span>
                        <span>{printingOrder.total} ر.س</span>
                    </div>
                </div>

                {/* Footer */}
                <div className="text-center mt-6 text-xs text-gray-400 space-y-2">
                    <div className="w-32 h-10 bg-gray-200 mx-auto rounded flex items-center justify-center text-gray-500 font-bold tracking-widest text-[10px]">BARCODE</div>
                    <p>شكراً لزيارتكم! نتمنى لكم يوماً سعيداً</p>
                </div>
             </div>

             {/* Actions */}
             <div className="grid grid-cols-3 gap-3 mt-6">
                <button className="flex flex-col items-center justify-center gap-1 p-3 bg-primary text-white rounded-xl hover:bg-primary-light transition-colors font-bold text-sm shadow-lg shadow-primary/20">
                   <Printer size={20} />
                   طباعة
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-3 bg-white dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/20 transition-colors font-bold text-sm">
                   <Download size={20} />
                   تنزيل
                </button>
                <button className="flex flex-col items-center justify-center gap-1 p-3 bg-white dark:bg-white/10 text-gray-700 dark:text-white border border-gray-200 dark:border-white/10 rounded-xl hover:bg-gray-50 dark:hover:bg-white/20 transition-colors font-bold text-sm">
                   <Share2 size={20} />
                   مشاركة
                </button>
             </div>
          </div>
        )}
      </Modal>

    </div>
  );
};

export default OrdersPage;