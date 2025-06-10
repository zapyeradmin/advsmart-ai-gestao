
import React from 'react';
import { CheckCircle, FileText } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Deadline {
  id: number;
  type: string;
  process: string;
  client: string;
  date: string;
  time: string;
  status: 'critical' | 'warning' | 'normal';
}

interface DeadlinesWidgetProps {
  deadlines: Deadline[];
}

const DeadlinesWidget = ({ deadlines }: DeadlinesWidgetProps) => {
  return (
    <div className="bg-dark-card rounded-lg p-5 border border-gray-800 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Próximos Prazos</h3>
        <div className="flex space-x-2">
          <Button variant="outline" size="sm" className="text-xs border-gray-600">Esta Semana</Button>
          <Button variant="ghost" size="sm" className="text-xs">Próxima Semana</Button>
        </div>
      </div>
      
      <div className="relative pl-8 before:content-[''] before:absolute before:left-3 before:top-0 before:bottom-0 before:w-0.5 before:bg-gray-700">
        {deadlines.map((deadline, index) => (
          <div key={deadline.id} className="mb-6 relative">
            <div className={`absolute left-[-29px] top-0 w-6 h-6 rounded-full border-4 border-dark-card z-10 ${
              deadline.status === 'critical' ? 'bg-red-500' :
              deadline.status === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
            }`}></div>
            
            <div className="bg-gray-800 p-4 rounded-lg">
              <div className="flex justify-between items-start">
                <div>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full mb-2 inline-block ${
                    deadline.status === 'critical' ? 'bg-red-900/50 text-red-400' :
                    deadline.status === 'warning' ? 'bg-yellow-900/50 text-yellow-400' :
                    'bg-blue-900/50 text-blue-400'
                  }`}>
                    {deadline.date}
                  </span>
                  <h4 className="text-white font-medium">{deadline.type}</h4>
                  <p className="text-sm text-gray-400 mt-1">{deadline.process}</p>
                  <p className="text-sm text-gray-400">Cliente: {deadline.client}</p>
                </div>
                <span className="text-sm font-medium text-white">{deadline.time}</span>
              </div>
              
              <div className="flex items-center mt-3">
                <Button size="sm" className="bg-primary hover:bg-primary-hover text-white mr-2">
                  <CheckCircle size={12} className="mr-1" />
                  Confirmar
                </Button>
                <Button variant="outline" size="sm" className="text-gray-200 border-gray-600">
                  <FileText size={12} className="mr-1" />
                  Ver detalhes
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DeadlinesWidget;
