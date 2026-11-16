import { motion } from 'framer-motion';
import { Calendar, User, Tag, ChevronRight } from 'lucide-react';
import { news } from '../data/mockData';
import { useState } from 'react';

const categories = ['Все', 'Компания', 'Результаты', 'Обучение', 'HR', 'Достижения'];

export default function News() {
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const filteredNews = selectedCategory === 'Все'
    ? news
    : news.filter((n) => n.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div>
        <h1 className="text-2xl font-bold text-gray-800">Новости компании</h1>
        <p className="text-gray-500 mt-1">Последние события и обновления</p>
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              selectedCategory === cat
                ? 'bg-blue-600 text-white'
                : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* News List */}
      <div className="space-y-4">
        {filteredNews.map((item, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="p-6">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                      <Tag size={12} className="mr-1" />
                      {item.category}
                    </span>
                    <span className="text-xs text-gray-400 flex items-center">
                      <Calendar size={12} className="mr-1" />
                      {new Date(item.date).toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                  <h2 className="text-lg font-semibold text-gray-800">{item.title}</h2>
                  <p className={`text-gray-600 mt-2 ${expandedId === item.id ? '' : 'line-clamp-2'}`}>
                    {item.content}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-sm text-gray-500 flex items-center">
                      <User size={14} className="mr-1" />
                      {item.author}
                    </span>
                    <button
                      onClick={() => setExpandedId(expandedId === item.id ? null : item.id)}
                      className="text-sm text-blue-600 hover:text-blue-700 font-medium flex items-center"
                    >
                      {expandedId === item.id ? 'Свернуть' : 'Читать далее'}
                      <ChevronRight size={14} className={`ml-1 transition-transform ${expandedId === item.id ? 'rotate-90' : ''}`} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
