
import React from 'react';
import { Plus, MoreHorizontal } from 'lucide-react';
import { Button } from "@/components/ui/button";

interface Task {
  id: number;
  title: string;
  date: string;
  priority: string;
  priorityColor: string;
}

interface TasksWidgetProps {
  tasks: Task[];
}

const TasksWidget = ({ tasks }: TasksWidgetProps) => {
  return (
    <div className="bg-dark-card rounded-lg p-5 border border-gray-800 shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-medium text-white">Tarefas Pendentes</h3>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-blue-400 flex items-center"
        >
          <Plus size={16} className="mr-1" />
          Nova Tarefa
        </Button>
      </div>
      
      <div className="space-y-4">
        {tasks.map((task) => (
          <div key={task.id} className="flex items-center p-3 bg-gray-800 rounded-lg">
            <label className="custom-checkbox mr-3 flex-shrink-0">
              <input type="checkbox" />
              <span className="checkmark"></span>
            </label>
            <div className="flex-1">
              <p className="text-sm font-medium text-white">{task.title}</p>
              <div className="flex items-center mt-1">
                <span className="text-xs text-gray-400 mr-3">{task.date}</span>
                <span className={`px-2 py-0.5 text-xs rounded-full ${task.priorityColor}`}>
                  {task.priority}
                </span>
              </div>
            </div>
            <Button variant="ghost" size="sm" className="text-gray-400 hover:text-white ml-2">
              <MoreHorizontal size={16} />
            </Button>
          </div>
        ))}
      </div>
      
      <div className="mt-4 text-center">
        <a href="#" className="text-sm text-primary hover:text-blue-400">Ver todas as tarefas</a>
      </div>
    </div>
  );
};

export default TasksWidget;
