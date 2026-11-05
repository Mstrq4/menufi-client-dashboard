import React from 'react';
import { ArrowUpRight, ArrowDownRight } from 'lucide-react';
import { StatItem } from '../lib/types';

interface StatsCardProps {
  item: StatItem;
}

const StatsCard: React.FC<StatsCardProps> = ({ item }) => {
  return (
    <div className="glass rounded-[2.5rem] p-6 relative overflow-hidden group hover:shadow-xl hover:shadow-primary/5 transition-all duration-300 hover:-translate-y-1">
      {/* Background Decorative Blob */}
      <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary/5 dark:bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/10 transition-colors duration-500"></div>
      
      <div className="relative z-10 flex justify-between items-start">
        <div className="space-y-2">
          <p className="text-gray-500 dark:text-gray-400 text-sm font-bold tracking-wide">{item.label}</p>
          <h3 className="text-3xl md:text-4xl font-extrabold text-primary dark:text-white font-mono mt-2 tracking-tight">
            {item.value}
          </h3>
        </div>
        <div className="p-4 bg-gradient-to-br from-primary/10 to-primary/5 dark:from-white/10 dark:to-white/5 rounded-2xl text-primary dark:text-accent shadow-inner group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
          {item.icon}
        </div>
      </div>
      
      {item.trend && (
        <div className="mt-6 flex items-center gap-3">
          <div className={`flex items-center px-2.5 py-1 rounded-full text-xs font-bold ${item.trend.isPositive ? 'bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400'}`}>
            {item.trend.isPositive ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span className="mx-1">{Math.abs(item.trend.value)}%</span>
          </div>
          <span className="text-gray-400 dark:text-gray-500 font-medium text-xs">مقارنة بالشهر الماضي</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;