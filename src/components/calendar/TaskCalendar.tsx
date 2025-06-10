
import React, { useState } from 'react';
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus, Clock, User, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from "@/hooks/use-toast";
import { useAuth } from '@/contexts/AuthContext';

interface Task {
  id: string;
  title: string;
  description: string;
  date: Date;
  time: string;
  assignedTo: string;
  priority: 'low' | 'medium' | 'high';
  completed: boolean;
}

const TaskCalendar = () => {
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    time: '',
    assignedTo: '',
    priority: 'medium' as const,
  });
  const { toast } = useToast();
  const { user } = useAuth();

  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Audiência de Instrução',
      description: 'Processo 0001234-12.2023 - Cliente Maria Fernandes',
      date: new Date(),
      time: '14:30',
      assignedTo: 'Dr. Ricardo Oliveira',
      priority: 'high',
      completed: false,
    },
    {
      id: '2',
      title: 'Reunião com Cliente',
      description: 'Discussão sobre estratégia processual - Empresa XYZ',
      date: new Date(),
      time: '10:00',
      assignedTo: 'Dra. Camila Santos',
      priority: 'medium',
      completed: false,
    },
  ]);

  const selectedDateTasks = tasks.filter(
    task => task.date.toDateString() === date?.toDateString()
  );

  const handleCreateTask = () => {
    if (!newTask.title || !newTask.time) {
      toast({
        title: "Erro",
        description: "Preencha pelo menos o título e horário da tarefa.",
        variant: "destructive",
      });
      return;
    }

    const task: Task = {
      id: Date.now().toString(),
      ...newTask,
      date: date || new Date(),
      assignedTo: newTask.assignedTo || user?.name || '',
      completed: false,
    };

    setTasks(prev => [...prev, task]);
    setNewTask({
      title: '',
      description: '',
      time: '',
      assignedTo: '',
      priority: 'medium',
    });
    setShowTaskForm(false);

    toast({
      title: "Sucesso",
      description: "Tarefa criada com sucesso.",
    });
  };

  const toggleTaskCompletion = (taskId: string) => {
    setTasks(prev =>
      prev.map(task =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'border-l-red-500 bg-red-900/10';
      case 'medium':
        return 'border-l-yellow-500 bg-yellow-900/10';
      case 'low':
        return 'border-l-green-500 bg-green-900/10';
      default:
        return 'border-l-gray-500 bg-gray-900/10';
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Calendar */}
      <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-white">Calendário</h3>
          <Button
            onClick={() => setShowTaskForm(!showTaskForm)}
            className="bg-primary hover:bg-primary-hover text-white"
          >
            <Plus size={16} className="mr-2" />
            Nova Tarefa
          </Button>
        </div>
        
        <Calendar
          mode="single"
          selected={date}
          onSelect={setDate}
          className="rounded-md border border-gray-700"
        />
      </div>

      {/* Tasks for Selected Date */}
      <div className="bg-dark-card rounded-lg p-6 border border-gray-800">
        <div className="flex items-center mb-4">
          <CalendarIcon size={20} className="text-primary mr-2" />
          <h3 className="text-lg font-medium text-white">
            Tarefas - {date?.toLocaleDateString('pt-BR')}
          </h3>
        </div>

        {/* New Task Form */}
        {showTaskForm && (
          <div className="mb-6 p-4 bg-gray-800 rounded-lg space-y-4">
            <Input
              placeholder="Título da tarefa"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <Textarea
              placeholder="Descrição (opcional)"
              value={newTask.description}
              onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <div className="grid grid-cols-2 gap-4">
              <Input
                type="time"
                value={newTask.time}
                onChange={(e) => setNewTask({ ...newTask, time: e.target.value })}
                className="bg-gray-700 border-gray-600 text-white"
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as any })}
                className="bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white"
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>
            <Input
              placeholder="Responsável (opcional)"
              value={newTask.assignedTo}
              onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
              className="bg-gray-700 border-gray-600 text-white"
            />
            <div className="flex gap-2">
              <Button onClick={handleCreateTask} className="bg-primary hover:bg-primary-hover">
                Criar Tarefa
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowTaskForm(false)}
                className="border-gray-600 text-gray-300"
              >
                Cancelar
              </Button>
            </div>
          </div>
        )}

        {/* Task List */}
        <div className="space-y-3">
          {selectedDateTasks.length === 0 ? (
            <div className="text-center py-8 text-gray-400">
              Nenhuma tarefa para esta data
            </div>
          ) : (
            selectedDateTasks.map((task) => (
              <div
                key={task.id}
                className={`p-4 border-l-4 rounded-lg ${getPriorityColor(task.priority)} ${
                  task.completed ? 'opacity-60' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTaskCompletion(task.id)}
                        className="w-4 h-4 text-primary bg-gray-700 border-gray-600 rounded"
                      />
                      <h4 className={`font-medium ${
                        task.completed ? 'line-through text-gray-400' : 'text-white'
                      }`}>
                        {task.title}
                      </h4>
                    </div>
                    {task.description && (
                      <p className="text-sm text-gray-400 mb-2">{task.description}</p>
                    )}
                    <div className="flex items-center gap-4 text-xs text-gray-500">
                      <div className="flex items-center">
                        <Clock size={12} className="mr-1" />
                        {task.time}
                      </div>
                      <div className="flex items-center">
                        <User size={12} className="mr-1" />
                        {task.assignedTo}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskCalendar;
