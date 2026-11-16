import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight, MapPin, Users, Clock } from 'lucide-react';
import { calendarEvents } from '../data/mockData';
import { useState } from 'react';

const typeConfig = {
  meeting: { label: 'Встреча', color: 'bg-blue-500', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  deadline: { label: 'Дедлайн', color: 'bg-red-500', bgColor: 'bg-red-50', textColor: 'text-red-700' },
  event: { label: 'Событие', color: 'bg-purple-500', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
  holiday: { label: 'Праздник', color: 'bg-green-500', bgColor: 'bg-green-50', textColor: 'text-green-700' },
};

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  const day = new Date(year, month, 1).getDay();
  return day === 0 ? 6 : day - 1; // Monday = 0
}

const monthNames = [
  'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
  'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
];

const weekDays = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];

export default function CalendarPage() {
  const [currentDate, setCurrentDate] = useState(new Date(2026, 0, 1)); // January 2026
  const [selectedDate, setSelectedDate] = useState<string | null>(null);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();
  const daysInMonth = getDaysInMonth(year, month);
  const firstDay = getFirstDayOfMonth(year, month);

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  const formatDate = (day: number) => `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;

  const getEventsForDate = (day: number) => {
    const dateStr = formatDate(day);
    return calendarEvents.filter((e) => e.date === dateStr);
  };

  const selectedEvents = selectedDate
    ? calendarEvents.filter((e) => e.date === selectedDate)
    : [];

  const today = new Date();
  const todayStr = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Календарь событий</h1>
        <p className="text-gray-500 mt-1">Планирование и отслеживание мероприятий</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          {/* Header */}
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold text-gray-800">
              {monthNames[month]} {year}
            </h2>
            <div className="flex items-center space-x-2">
              <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronLeft size={18} />
              </button>
              <button
                onClick={() => setCurrentDate(new Date(2026, 0, 1))}
                className="px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
              >
                Сегодня
              </button>
              <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg transition-colors">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          {/* Week Days */}
          <div className="grid grid-cols-7 mb-2">
            {weekDays.map((day) => (
              <div key={day} className="text-center text-xs font-medium text-gray-500 py-2">
                {day}
              </div>
            ))}
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-1">
            {/* Empty cells for days before first day */}
            {Array.from({ length: firstDay }).map((_, i) => (
              <div key={`empty-${i}`} className="h-20"></div>
            ))}

            {/* Days */}
            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dateStr = formatDate(day);
              const events = getEventsForDate(day);
              const isToday = dateStr === todayStr;
              const isSelected = dateStr === selectedDate;

              return (
                <button
                  key={day}
                  onClick={() => setSelectedDate(dateStr)}
                  className={`h-20 p-1.5 rounded-lg text-left transition-all border ${
                    isSelected
                      ? 'border-blue-300 bg-blue-50 ring-2 ring-blue-100'
                      : isToday
                      ? 'border-blue-200 bg-blue-50/50'
                      : 'border-transparent hover:bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  <span className={`text-xs font-medium ${
                    isToday ? 'text-blue-600' : 'text-gray-700'
                  }`}>
                    {day}
                  </span>
                  <div className="mt-1 space-y-0.5">
                    {events.slice(0, 2).map((event) => (
                      <div
                        key={event.id}
                        className={`text-[10px] px-1 py-0.5 rounded truncate ${typeConfig[event.type].bgColor} ${typeConfig[event.type].textColor}`}
                      >
                        {event.title}
                      </div>
                    ))}
                    {events.length > 2 && (
                      <span className="text-[10px] text-gray-400">+{events.length - 2}</span>
                    )}
                  </div>
                </button>
              );
            })}
          </div>

          {/* Legend */}
          <div className="flex items-center space-x-4 mt-6 pt-4 border-t border-gray-100">
            {Object.entries(typeConfig).map(([key, config]) => (
              <div key={key} className="flex items-center space-x-1.5">
                <span className={`w-2.5 h-2.5 rounded-full ${config.color}`}></span>
                <span className="text-xs text-gray-500">{config.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Events Sidebar */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            {selectedDate
              ? `События на ${new Date(selectedDate).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long' })}`
              : 'Ближайшие события'}
          </h2>

          <div className="space-y-3">
            {(selectedDate ? selectedEvents : calendarEvents.slice(0, 6)).map((event) => (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, x: 10 }}
                animate={{ opacity: 1, x: 0 }}
                className="p-4 rounded-lg border border-gray-100 hover:border-blue-200 transition-colors"
              >
                <div className="flex items-start space-x-3">
                  <span className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${typeConfig[event.type].color}`}></span>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-800">{event.title}</h3>
                    <div className="flex items-center space-x-3 mt-2">
                      <span className="text-xs text-gray-500 flex items-center">
                        <Clock size={12} className="mr-1" />
                        {event.time}
                      </span>
                      {event.location && (
                        <span className="text-xs text-gray-500 flex items-center">
                          <MapPin size={12} className="mr-1" />
                          {event.location}
                        </span>
                      )}
                    </div>
                    <div className="flex items-center mt-2">
                      <Users size={12} className="text-gray-400 mr-1" />
                      <span className="text-xs text-gray-400">
                        {event.participants.join(', ')}
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}

            {(selectedDate ? selectedEvents.length === 0 : false) && (
              <p className="text-sm text-gray-400 text-center py-4">Нет событий на эту дату</p>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
