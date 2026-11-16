import { motion } from 'framer-motion';
import { FileText, FileSpreadsheet, FileImage, Presentation, Download, Search, Folder, Grid, List } from 'lucide-react';
import { documents } from '../data/mockData';
import { useState } from 'react';

const typeIcons: Record<string, any> = {
  pdf: FileText,
  docx: FileText,
  xlsx: FileSpreadsheet,
  pptx: Presentation,
  img: FileImage,
};

const typeColors: Record<string, string> = {
  pdf: 'bg-red-100 text-red-600',
  docx: 'bg-blue-100 text-blue-600',
  xlsx: 'bg-green-100 text-green-600',
  pptx: 'bg-orange-100 text-orange-600',
  img: 'bg-purple-100 text-purple-600',
};

const categories = ['Все', 'HR', 'Финансы', 'IT', 'Управление', 'Юридический', 'Маркетинг'];

export default function Documents() {
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [view, setView] = useState<'grid' | 'list'>('grid');

  const filtered = documents.filter((d) => {
    const matchSearch = d.name.toLowerCase().includes(search.toLowerCase());
    const matchCategory = selectedCategory === 'Все' || d.category === selectedCategory;
    return matchSearch && matchCategory;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="space-y-6"
    >
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">Документы</h1>
          <p className="text-gray-500 mt-1">Корпоративная база знаний и документы</p>
        </div>
        <button className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
          <FileText size={16} className="mr-2" />
          Загрузить документ
        </button>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-600 hover:bg-gray-100 border border-gray-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Поиск документов..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2 bg-white border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
            />
          </div>
          <div className="flex items-center space-x-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView('grid')}
              className={`p-1.5 rounded-md transition-colors ${view === 'grid' ? 'bg-white shadow' : 'text-gray-500'}`}
            >
              <Grid size={16} />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-1.5 rounded-md transition-colors ${view === 'list' ? 'bg-white shadow' : 'text-gray-500'}`}
            >
              <List size={16} />
            </button>
          </div>
        </div>
      </div>

      {/* Documents */}
      {view === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filtered.map((doc, index) => {
            const Icon = typeIcons[doc.type] || FileText;
            return (
              <motion.div
                key={doc.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-white rounded-xl p-5 shadow-sm border border-gray-100 hover:shadow-md hover:border-blue-200 transition-all cursor-pointer group"
              >
                <div className="flex items-start justify-between">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${typeColors[doc.type]}`}>
                    <Icon size={20} />
                  </div>
                  <button className="opacity-0 group-hover:opacity-100 p-1.5 hover:bg-gray-100 rounded-lg transition-all">
                    <Download size={16} className="text-gray-500" />
                  </button>
                </div>
                <h3 className="text-sm font-medium text-gray-800 mt-3 line-clamp-2">{doc.name}</h3>
                <div className="flex items-center justify-between mt-3">
                  <span className="text-xs text-gray-400">{doc.size}</span>
                  <span className="text-xs px-2 py-0.5 bg-gray-100 rounded text-gray-600">{doc.category}</span>
                </div>
                <div className="flex items-center justify-between mt-2">
                  <span className="text-xs text-gray-400">{doc.author.split(' ')[0]} {doc.author.split(' ')[1]?.[0]}.</span>
                  <span className="text-xs text-gray-400">
                    {new Date(doc.modified).toLocaleDateString('ru-RU', { day: 'numeric', month: 'short' })}
                  </span>
                </div>
              </motion.div>
            );
          })}
        </div>
      ) : (
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Название</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Категория</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Размер</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Автор</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase">Изменён</th>
                <th className="text-left px-6 py-3 text-xs font-medium text-gray-500 uppercase"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((doc) => {
                const Icon = typeIcons[doc.type] || FileText;
                return (
                  <tr key={doc.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded flex items-center justify-center ${typeColors[doc.type]}`}>
                          <Icon size={16} />
                        </div>
                        <span className="text-sm font-medium text-gray-800">{doc.name}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="text-xs px-2 py-1 bg-gray-100 rounded text-gray-600">{doc.category}</span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.size}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">{doc.author}</td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {new Date(doc.modified).toLocaleDateString('ru-RU')}
                    </td>
                    <td className="px-6 py-4">
                      <button className="p-1.5 hover:bg-gray-100 rounded-lg transition-colors">
                        <Download size={16} className="text-gray-500" />
                      </button>
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
