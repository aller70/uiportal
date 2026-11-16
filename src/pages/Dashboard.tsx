import { motion } from 'framer-motion';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, Legend,
} from 'recharts';
import {
  Users, CheckCircle, FileText, Calendar, TrendingUp, Clock, AlertCircle, ArrowRight,
} from 'lucide-react';
import { news, tasks, announcements, calendarEvents, departmentStats, activityData, taskStats } from '../data/mockData';
import { Link } from 'react-router-dom';

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function Dashboard() {
  const urgentTasks = tasks.filter((t) => t.priority === 'critical' || t.priority === 'high').slice(0, 4);
  const upcomingEvents = calendarEvents.slice(0, 4);

  return (
    <motion.div variants={container} initial="hidden" animate="show" className="space-y-6">
      {/* Welcome */}
      <motion.div variants={item}>
        <h1 className="text-2xl font-bold text-gray-800">Добро пожаловать, Администратор!</h1>
        <p className="text-gray-500 mt-1">Сегодня {new Date().toLocaleDateString('ru-RU', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
      </motion.div>

      {/* Stats Cards */}
      <motion.div variants={item} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard icon={Users} label="Сотрудники" value="73" change="+3" color="blue" />
        <StatCard icon={CheckCircle} label="Активные задачи" value={taskStats.in_progress.toString()} change="+5" color="green" />
        <StatCard icon={FileText} label="Документы" value="156" change="+12" color="purple" />
        <StatCard icon={Calendar} label="События сегодня" value="3" change="" color="orange" />
      </motion.div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Activity Chart */}
        <motion.div variants={item} className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Активность за полугодие</h2>
            <TrendingUp size={20} className="text-green-500" />
          </div>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={activityData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="month" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }}
              />
              <Legend />
              <Line type="monotone" dataKey="tasks" stroke="#3b82f6" strokeWidth={2} name="Создано задач" />
              <Line type="monotone" dataKey="completed" stroke="#10b981" strokeWidth={2} name="Выполнено" />
            </LineChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Announcements */}
        <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Объявления</h2>
            <AlertCircle size={20} className="text-orange-500" />
          </div>
          <div className="space-y-3">
            {announcements.map((a) => (
              <div key={a.id} className={`p-3 rounded-lg border ${a.important ? 'border-red-200 bg-red-50' : 'border-gray-100 bg-gray-50'}`}>
                <div className="flex items-start">
                  {a.important && <span className="w-2 h-2 bg-red-500 rounded-full mt-1.5 mr-2 flex-shrink-0"></span>}
                  <div>
                    <p className="text-sm font-medium text-gray-800">{a.title}</p>
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">{a.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Second Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Department Stats */}
        <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Отделы компании</h2>
            <Users size={20} className="text-blue-500" />
          </div>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={departmentStats}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
              <YAxis stroke="#9ca3af" fontSize={12} />
              <Tooltip contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb' }} />
              <Bar dataKey="employees" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Сотрудники" />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Urgent Tasks */}
        <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Срочные задачи</h2>
            <Link to="/tasks" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
              Все <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {urgentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-3">
                  <span className={`w-2 h-2 rounded-full ${
                    task.priority === 'critical' ? 'bg-red-500' : 'bg-orange-500'
                  }`}></span>
                  <div>
                    <p className="text-sm font-medium text-gray-800">{task.title}</p>
                    <p className="text-xs text-gray-500">{task.assignee} • {task.project}</p>
                  </div>
                </div>
                <div className="text-right">
                  <span className={`inline-block px-2 py-0.5 rounded-full text-xs font-medium ${
                    task.status === 'in_progress' ? 'bg-blue-100 text-blue-700' :
                    task.status === 'review' ? 'bg-yellow-100 text-yellow-700' :
                    task.status === 'done' ? 'bg-green-100 text-green-700' :
                    'bg-gray-100 text-gray-700'
                  }`}>
                    {task.status === 'todo' ? 'К выполнению' :
                     task.status === 'in_progress' ? 'В работе' :
                     task.status === 'review' ? 'На проверке' : 'Готово'}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Third Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent News */}
        <motion.div variants={item} className="lg:col-span-2 bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Последние новости</h2>
            <Link to="/news" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
              Все новости <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="space-y-4">
            {news.slice(0, 3).map((n) => (
              <div key={n.id} className="flex items-start space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Clock size={18} className="text-blue-600" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-gray-800 truncate">{n.title}</h3>
                  <p className="text-xs text-gray-500 mt-1 line-clamp-1">{n.content}</p>
                  <div className="flex items-center space-x-2 mt-2">
                    <span className="text-xs text-gray-400">{n.author}</span>
                    <span className="text-xs text-gray-300">•</span>
                    <span className="text-xs text-gray-400">{new Date(n.date).toLocaleDateString('ru-RU')}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Upcoming Events */}
        <motion.div variants={item} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">Ближайшие события</h2>
            <Link to="/calendar" className="text-sm text-blue-600 hover:text-blue-700 flex items-center">
              Календарь <ArrowRight size={14} className="ml-1" />
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingEvents.map((event) => (
              <div key={event.id} className="p-3 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${
                    event.type === 'meeting' ? 'bg-blue-500' :
                    event.type === 'deadline' ? 'bg-red-500' :
                    event.type === 'holiday' ? 'bg-green-500' : 'bg-purple-500'
                  }`}></span>
                  <p className="text-sm font-medium text-gray-800 truncate">{event.title}</p>
                </div>
                <div className="flex items-center space-x-2 mt-1 ml-4">
                  <span className="text-xs text-gray-500">{new Date(event.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}</span>
                  <span className="text-xs text-gray-400">{event.time}</span>
                  {event.location && <span className="text-xs text-gray-400">• {event.location}</span>}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

function StatCard({ icon: Icon, label, value, change, color }: {
  icon: any;
  label: string;
  value: string;
  change: string;
  color: string;
}) {
  const colorClasses: Record<string, string> = {
    blue: 'bg-blue-50 text-blue-600',
    green: 'bg-green-50 text-green-600',
    purple: 'bg-purple-50 text-purple-600',
    orange: 'bg-orange-50 text-orange-600',
  };

  return (
    <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-gray-500">{label}</p>
          <p className="text-2xl font-bold text-gray-800 mt-1">{value}</p>
          {change && <p className="text-xs text-green-600 mt-1">↑ {change} за месяц</p>}
        </div>
        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClasses[color]}`}>
          <Icon size={24} />
        </div>
      </div>
    </div>
  );
}
