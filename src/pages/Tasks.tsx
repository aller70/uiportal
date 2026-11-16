import { motion } from 'framer-motion';
import { Plus, Filter, Clock, AlertTriangle, CheckCircle2, Circle } from 'lucide-react';
import { tasks } from '../data/mockData';
import { useState } from 'react';

type Status = 'todo' | 'in_progress' | 'review' | 'done';

const statusConfig: Record<Status, { label: string; color: string; bgColor: string }> = {
  todo: { label: 'К выполнению', color: 'text-gray-600', bgColor: 'bg-gray-100' },
  in_progress: { label: 'В работе', color: 'text-blue-600', bgColor: 'bg-blue-100' },
  review: { label: 'На проверке', color: 'text-yellow-600', bgColor: 'bg-yellow-100' },
  done: { label: 'Готово', color: 'text-green-600', bgColor: 'bg-green-100' },
};

const priorityConfig = {
  low: { label: 'Низкий', color: 'text-gray-500', icon: Circle },
  medium: { label: 'Средний', color: 'text-blue-500', icon: Clock },
  high: { label: 'Высокий', color: 'text-orange-500', icon: AlertTriangle },
  critical: { label: 'Критический', color: 'text-red-500', icon: AlertTriangle },
};

export default function Tasks() {
  const [view, setView] = useState<'board' | 'list'>('board');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterProject, setFilterProject] = useState<string>('all');

  const projects = ['all', ...Array.from(new Set(tasks.map((t) => t.project)))];

  const filteredTasks = tasks.filter((t) => {
    const matchPriority = filterPriority === 'all' || t.priority === filterPriority;
    const matchProject = filterProject === 'all' || t.project === filterProject;
    return matchPriority && matchProject;
  });

  const columns: Status[] = ['todo', 'in_progress', 'review', 'done'];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Управление задачами</h1>
          <p className="text-gray-500 mt-1">Отслеживайте прогресс по проектам</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <Plus size={16} className="mr-2" />
          Новая задача
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={filterPriority}
            onChange={(e) => setFilterPriority(e.target.value)}
            className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">Все приоритеты</option>
            <option value="critical">Критический</option>
            <option value="high">Высокий</option>
            <option value="medium">Средний</option>
            <option value="low">Низкий</option>
          </select>
        </div>
        <select
          value={filterProject}
          onChange={(e) => setFilterProject(e.target.value)}
          className="px-3 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="all">Все проекты</option>
          {projects.filter(p => p !== 'all').map((p) => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
        <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
          <button
            onClick={() => setView('board')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === 'board' ? 'bg-white shadow text-gray-800' : 'text-gray-500'
            }`}
          >
            Доска
          </button>
          <button
            onClick={() => setView('list')}
            className={`px-3 py-1.5 rounded-md text-sm font-medium transition-colors ${
              view === 'list' ? 'bg-white shadow text-gray-800' : 'text-gray-500'
            }`}
          >
            Список
          </button>
        </div>
      </div>

      {/* Board View */}
      {view === 'board' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {columns.map((status) => {
            const columnTasks = filteredTasks.filter((t) => t.status === status);
            const config = statusConfig[status];
            return (
              <div key={status} className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className={`w-2 h-2 rounded-full ${
                      status === 'todo' ? 'bg-gray-400' :
                      status === 'in_progress' ? 'bg-blue-500' :
                      status === 'review' ? 'bg-yellow-500' : 'bg-green-500'
                    }`}></span>
                    <h3 className="text-sm font-semibold text-gray-700">{config.label}</h3>
                  </div>
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-0.5 rounded-full">
                    {columnTasks.length}
                  </span>
                </div>
                <div className="space-y-3">
                  {columnTasks.map((task) => {
                    const PriorityIcon = priorityConfig[task.priority].icon;
                    return (
                      <motion.div
                        key={task.id}
                        layout
                        className="bg-white rounded-lg p-4 shadow-sm border border-gray-100 hover:shadow-md transition-shadow cursor-pointer"
                      >
                        <h4 className="text-sm font-medium text-gray-800">{task.title}</h4>
                        <p className="text-xs text-gray-500 mt-1 line-clamp-2">{task.description}</p>
                        <div className="flex items-center justify-between mt-3">
                          <div className="flex items-center space-x-1">
                            <PriorityIcon size={12} className={priorityConfig[task.priority].color} />
                            <span className={`text-xs ${priorityConfig[task.priority].color}`}>
                              {priorityConfig[task.priority].label}
                            </span>
                          </div>
                          <span className="text-xs text-gray-400">
                            {new Date(task.dueDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                          </span>
                        </div>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-50">
                          <span className="text-xs text-gray-500">{task.assignee.split(' ')[0]}</span>
                          <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">{task.project}</span>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* List View */}
      {view === 'list' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Задача</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Статус</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Приоритет</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Исполнитель</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Срок</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Проект</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTasks.map((task) => {
                const PriorityIcon = priorityConfig[task.priority].icon;
                return (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <p className="text-sm font-medium text-gray-800">{task.title}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{task.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-medium ${statusConfig[task.status].bgColor} ${statusConfig[task.status].color}`}>
                        {statusConfig[task.status].label}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-1">
                        <PriorityIcon size={14} className={priorityConfig[task.priority].color} />
                        <span className={`text-xs ${priorityConfig[task.priority].color}`}>
                          {priorityConfig[task.priority].label}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">{task.assignee.split(' ').slice(0, 2).join(' ')}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {new Date(task.dueDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short', year: 'numeric' })}
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">{task.project}</span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
}
