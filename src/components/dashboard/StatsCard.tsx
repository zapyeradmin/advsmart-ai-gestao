
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  change: {
    value: string;
    type: 'increase' | 'decrease' | 'neutral';
    label: string;
  };
  iconColor: string;
}

const StatsCard = ({ title, value, icon: Icon, change, iconColor }: StatsCardProps) => {
  const changeColor = change.type === 'increase' ? 'text-green-500' : 
                     change.type === 'decrease' ? 'text-red-500' : 'text-yellow-500';

  return (
    <div className="bg-dark-card rounded-lg p-5 border border-gray-800 shadow-lg">
      <div className="flex justify-between items-start mb-4">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-2xl font-semibold text-white mt-1">{value}</h3>
        </div>
        <div className={`w-10 h-10 rounded-full bg-opacity-30 flex items-center justify-center ${iconColor}`}>
          <Icon size={20} />
        </div>
      </div>
      <div className="flex items-center">
        <span className={`flex items-center text-sm ${changeColor}`}>
          {change.value}
        </span>
        <span className="text-gray-400 text-xs ml-2">{change.label}</span>
      </div>
    </div>
  );
};

export default StatsCard;
