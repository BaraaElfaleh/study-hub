// apps/admin-app/src/shared/components/ui/StatCard.tsx
import React from 'react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  change?: string;
  changeColor?: 'green' | 'red';
}

export const StatCard: React.FC<StatCardProps> = ({ title, value, icon, change, changeColor = 'green' }) => {
  return (
    <div className="bg-slate-900 border border-slate-700 rounded-2xl p-5 flex items-center gap-4">
      <div className="w-12 h-12 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-400">
        {icon}
      </div>
      <div>
        <p className="text-slate-400 text-sm">{title}</p>
        <p className="text-2xl font-bold text-white">{value}</p>
        {change && (
          <p className={`text-xs ${changeColor === 'green' ? 'text-green-400' : 'text-red-400'}`}>
            {change}
          </p>
        )}
      </div>
    </div>
  );
};