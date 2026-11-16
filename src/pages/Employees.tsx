import { motion } from 'framer-motion';
import { Search, Mail, Phone, Filter } from 'lucide-react';
import { employees } from '../data/mockData';
import { useState } from 'react';

const departments = ['Все', 'IT', 'HR', 'Финансы', 'Маркетинг', 'Управление', 'Юридический'];

export default function Employees() {
  const [search, setSearch] = useState('');
  const [selectedDept, setSelectedDept] = useState('Все');
  const [selectedEmployee, setSelectedEmployee] = useState<number | null>(null);

  const filtered = employees.filter((e) => {
    const matchSearch = e.name.toLowerCase().includes(search.toLowerCase()) ||
      e.position.toLowerCase().includes(search.toLowerCase());
    const matchDept = selectedDept === 'Все' || e.department === selectedDept;
    return matchSearch && matchDept;
  });

  const statusColors = {
    online: 'bg-green-500',
    offline: 'bg-gray-400',
    away: 'bg-yellow-500',
  };

  const statusLabels = {
    online: 'В сети',
    offline: 'Не в сети',
    away: 'Отошёл',
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Справочник сотрудников</h1>
        <p className="text-gray-500 mt-1">Контакты и информация о сотрудниках компании</p>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Поиск по имени или должности..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex items-center space-x-2">
          <Filter size={18} className="text-gray-400" />
          <select
            value={selectedDept}
            onChange={(e) => setSelectedDept(e.target.value)}
            className="px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {departments.map((d) => (
              <option key={d} value={d}>{d}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Results Count */}
      <p className="text-sm text-gray-500">Найдено: {filtered.length} сотрудников</p>

      {/* Employee Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map((employee, index) => (
          <motion.div
            key={employee.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => setSelectedEmployee(selectedEmployee === employee.id ? null : employee.id)}
            className={`bg-white rounded-xl p-5 shadow-sm border cursor-pointer transition-all hover:shadow-md ${
              selectedEmployee === employee.id ? 'border-blue-300 ring-2 ring-blue-100' : 'border-gray-100'
            }`}
          >
            <div className="flex items-start space-x-4">
              {/* Avatar */}
              <div className="relative">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-semibold text-sm">
                  {employee.avatar}
                </div>
                <span className={`absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 ${statusColors[employee.status]} rounded-full border-2 border-white`}></span>
              </div>

              {/* Info */}
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-semibold text-gray-800 truncate">{employee.name}</h3>
                <p className="text-xs text-gray-500 mt-0.5">{employee.position}</p>
                <div className="flex items-center space-x-2 mt-2">
                  <span className="inline-block px-2 py-0.5 bg-gray-100 text-gray-600 rounded text-xs">
                    {employee.department}
                  </span>
                  <span className="text-xs text-gray-400">{statusLabels[employee.status]}</span>
                </div>
              </div>
            </div>

            {/* Expanded Info */}
            {selectedEmployee === employee.id && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                className="mt-4 pt-4 border-t border-gray-100 space-y-2"
              >
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Mail size={14} className="text-gray-400" />
                  <span>{employee.email}</span>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <Phone size={14} className="text-gray-400" />
                  <span>{employee.phone}</span>
                </div>
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
