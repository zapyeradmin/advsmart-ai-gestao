
import React from 'react';
import { FileText, DollarSign, RefreshCw } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Activity {
  id: number;
  type: string;
  description: string;
  client: string;
  responsible: string;
  time: string;
  icon: 'file' | 'dollar';
  color: string;
}

interface RecentActivityWidgetProps {
  activities: Activity[];
}

const RecentActivityWidget = ({ activities }: RecentActivityWidgetProps) => {
  return (
    <div className="bg-dark-card rounded-lg p-5 border border-gray-800 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Atividades Recentes</h3>
        <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white">
          <RefreshCw size={16} />
        </Button>
      </div>
      
      <div className="space-y-4">
        {activities.map((activity) => (
          <div key={activity.id} className="flex p-3 bg-gray-800 rounded-lg">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center mr-3 flex-shrink-0 ${activity.color}`}>
              {activity.icon === 'file' ? <FileText size={16} /> : <DollarSign size={16} />}
            </div>
            <div className="flex-1">
              <p className="text-sm text-white">
                {activity.type}: <span className="text-primary">{activity.description}</span>
              </p>
              <div className="flex items-center justify-between mt-1">
                <div className="flex items-center">
                  <span className="text-xs text-gray-400 mr-2">Cliente: {activity.client}</span>
                  <span className="text-xs text-gray-400">{activity.responsible}</span>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-primary hover:text-blue-400">Ver todas as atividades</a>
      </div>
    </div>
  );
};

export default RecentActivityWidget;
