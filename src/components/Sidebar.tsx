import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Newspaper,
  Users,
  CheckSquare,
  FileText,
  Calendar,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { useState } from 'react';

interface SidebarProps {
  collapsed: boolean;
  onToggle: () => void;
}

const menuItems = [
  { path: '/', icon: LayoutDashboard, label: 'Дашборд' },
  { path: '/news', icon: Newspaper, label: 'Новости' },
  { path: '/employees', icon: Users, label: 'Сотрудники' },
  { path: '/tasks', icon: CheckSquare, label: 'Задачи' },
  { path: '/documents', icon: FileText, label: 'Документы' },
  { path: '/calendar', icon: Calendar, label: 'Календарь' },
];

export default function Sidebar({ collapsed, onToggle }: SidebarProps) {
  const [activeSettings, setActiveSettings] = useState(false);

  return (
    <aside
      className={`fixed left-0 top-0 h-full bg-slate-900 text-white transition-all duration-300 z-50 flex flex-col ${
        collapsed ? 'w-16' : 'w-64'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center h-16 px-4 border-b border-slate-700">
        <div className="w-8 h-8 bg-blue-500 rounded-lg flex items-center justify-center font-bold text-sm flex-shrink-0">
          ИП
        </div>
        {!collapsed && (
          <span className="ml-3 font-semibold text-lg whitespace-nowrap">
            Интранет
          </span>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 overflow-y-auto">
        <ul className="space-y-1 px-2">
          {menuItems.map((item) => (
            <li key={item.path}>
              <NavLink
                to={item.path}
                className={({ isActive }) =>
                  `flex items-center px-3 py-2.5 rounded-lg transition-colors ${
                    isActive
                      ? 'bg-blue-600 text-white'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`
                }
              >
                <item.icon size={20} className="flex-shrink-0" />
                {!collapsed && (
                  <span className="ml-3 whitespace-nowrap">{item.label}</span>
                )}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      {/* Bottom */}
      <div className="border-t border-slate-700 p-2 space-y-1">
        <button
          onClick={() => setActiveSettings(!activeSettings)}
          className="flex items-center w-full px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-white transition-colors"
        >
          <Settings size={20} className="flex-shrink-0" />
          {!collapsed && <span className="ml-3 whitespace-nowrap">Настройки</span>}
        </button>
        <button className="flex items-center w-full px-3 py-2.5 rounded-lg text-slate-300 hover:bg-slate-800 hover:text-red-400 transition-colors">
          <LogOut size={20} className="flex-shrink-0" />
          {!collapsed && <span className="ml-3 whitespace-nowrap">Выход</span>}
        </button>
      </div>

      {/* Toggle Button */}
      <button
        onClick={onToggle}
        className="absolute -right-3 top-20 w-6 h-6 bg-slate-700 rounded-full flex items-center justify-center hover:bg-slate-600 transition-colors border border-slate-600"
      >
        {collapsed ? (
          <ChevronRight size={14} />
        ) : (
          <ChevronLeft size={14} />
        )}
      </button>
    </aside>
  );
}
