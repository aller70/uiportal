export interface Employee {
  id: number;
  name: string;
  position: string;
  department: string;
  email: string;
  phone: string;
  avatar: string;
  status: 'online' | 'offline' | 'away';
}

export interface NewsItem {
  id: number;
  title: string;
  content: string;
  date: string;
  author: string;
  category: string;
  image?: string;
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: 'todo' | 'in_progress' | 'review' | 'done';
  priority: 'low' | 'medium' | 'high' | 'critical';
  assignee: string;
  dueDate: string;
  project: string;
}

export interface Document {
  id: number;
  name: string;
  type: 'pdf' | 'docx' | 'xlsx' | 'pptx' | 'img';
  size: string;
  modified: string;
  author: string;
  category: string;
}

export interface CalendarEvent {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  type: 'meeting' | 'deadline' | 'event' | 'holiday';
  participants: string[];
}

export interface Announcement {
  id: number;
  title: string;
  content: string;
  date: string;
  important: boolean;
}

export const employees: Employee[] = [
  { id: 1, name: 'Иванов Алексей Петрович', position: 'Технический директор', department: 'IT', email: 'a.ivanov@company.ru', phone: '+7 (999) 123-45-67', avatar: 'АИ', status: 'online' },
  { id: 2, name: 'Петрова Мария Сергеевна', position: 'HR-менеджер', department: 'HR', email: 'm.petrova@company.ru', phone: '+7 (999) 234-56-78', avatar: 'ПМ', status: 'online' },
  { id: 3, name: 'Сидоров Дмитрий Олегович', position: 'Ведущий разработчик', department: 'IT', email: 'd.sidorov@company.ru', phone: '+7 (999) 345-67-89', avatar: 'СД', status: 'away' },
  { id: 4, name: 'Козлова Анна Викторовна', position: 'Финансовый аналитик', department: 'Финансы', email: 'a.kozlova@company.ru', phone: '+7 (999) 456-78-90', avatar: 'КА', status: 'online' },
  { id: 5, name: 'Новиков Сергей Александрович', position: 'Менеджер проектов', department: 'Управление', email: 's.novikov@company.ru', phone: '+7 (999) 567-89-01', avatar: 'НС', status: 'offline' },
  { id: 6, name: 'Морозова Елена Игоревна', position: 'Дизайнер', department: 'Маркетинг', email: 'e.morozova@company.ru', phone: '+7 (999) 678-90-12', avatar: 'МЕ', status: 'online' },
  { id: 7, name: 'Волков Андрей Николаевич', position: 'Системный администратор', department: 'IT', email: 'a.volkov@company.ru', phone: '+7 (999) 789-01-23', avatar: 'ВА', status: 'online' },
  { id: 8, name: 'Лебедева Ольга Дмитриевна', position: 'Бухгалтер', department: 'Финансы', email: 'o.lebedeva@company.ru', phone: '+7 (999) 890-12-34', avatar: 'ЛО', status: 'away' },
  { id: 9, name: 'Соколов Михаил Павлович', position: 'Маркетолог', department: 'Маркетинг', email: 'm.sokolov@company.ru', phone: '+7 (999) 901-23-45', avatar: 'СМ', status: 'online' },
  { id: 10, name: 'Кузнецова Татьяна Романовна', position: 'Юрист', department: 'Юридический', email: 't.kuznetsova@company.ru', phone: '+7 (999) 012-34-56', avatar: 'КТ', status: 'offline' },
];

export const news: NewsItem[] = [
  { id: 1, title: 'Запуск нового корпоративного портала', content: 'Мы рады сообщить о запуске обновлённого интранет-портала! Теперь все внутренние сервисы компании доступны в едином пространстве. Портал включает справочник сотрудников, систему задач, календарь событий и многое другое.', date: '2026-01-15', author: 'Иванов А.П.', category: 'Компания' },
  { id: 2, title: 'Итоги года: наши достижения', content: 'Подведены итоги уходящего года. Компания показала рост выручки на 23%, расширила штат на 45 человек и запустила 3 новых продукта. Благодарим каждого сотрудника за вклад в общий успех!', date: '2026-01-10', author: 'Новиков С.А.', category: 'Результаты' },
  { id: 3, title: 'Корпоративное обучение: новые курсы', content: 'Открыта регистрация на новые курсы повышения квалификации. Доступны программы по управлению проектами, Data Science, лидерству и коммуникациям. Обучение бесплатное для всех сотрудников.', date: '2026-01-08', author: 'Петрова М.С.', category: 'Обучение' },
  { id: 4, title: 'Обновление политики удалённой работы', content: 'С 1 февраля вступает в силу обновлённая политика удалённой работы. Сотрудники могут работать из дома до 3 дней в неделю по согласованию с руководителем. Подробности в разделе документов.', date: '2026-01-05', author: 'Петрова М.С.', category: 'HR' },
  { id: 5, title: 'Команда IT заняла 1 место на хакатоне', content: 'Поздравляем команду разработки с победой на корпоративном хакатоне! Проект "SmartOffice" — система автоматизации офисного пространства — будет внедрён в течение квартала.', date: '2026-01-03', author: 'Сидоров Д.О.', category: 'Достижения' },
];

export const tasks: Task[] = [
  { id: 1, title: 'Разработка модуля авторизации', description: 'Реализовать OAuth2 авторизацию с поддержкой SSO', status: 'in_progress', priority: 'high', assignee: 'Сидоров Д.О.', dueDate: '2026-01-20', project: 'Интранет' },
  { id: 2, title: 'Дизайн главной страницы', description: 'Создать макет дашборда в Figma', status: 'done', priority: 'medium', assignee: 'Морозова Е.И.', dueDate: '2026-01-12', project: 'Интранет' },
  { id: 3, title: 'Подготовка квартального отчёта', description: 'Собрать данные и подготовить презентацию для совета директоров', status: 'review', priority: 'critical', assignee: 'Козлова А.В.', dueDate: '2026-01-18', project: 'Финансы' },
  { id: 4, title: 'Обновление серверной инфраструктуры', description: 'Миграция на новые серверы и настройка балансировки', status: 'todo', priority: 'high', assignee: 'Волков А.Н.', dueDate: '2026-01-25', project: 'Инфраструктура' },
  { id: 5, title: 'Проведение опроса удовлетворённости', description: 'Подготовить и провести ежегодный опрос сотрудников', status: 'in_progress', priority: 'medium', assignee: 'Петрова М.С.', dueDate: '2026-01-22', project: 'HR' },
  { id: 6, title: 'Редизайн лендинга продукта', description: 'Обновить дизайн лендинга для нового продукта', status: 'todo', priority: 'low', assignee: 'Морозова Е.И.', dueDate: '2026-02-01', project: 'Маркетинг' },
  { id: 7, title: 'Аудит безопасности', description: 'Провести полный аудит информационной безопасности', status: 'in_progress', priority: 'critical', assignee: 'Волков А.Н.', dueDate: '2026-01-19', project: 'Инфраструктура' },
  { id: 8, title: 'Интеграция с CRM', description: 'Настроить двустороннюю синхронизацию данных', status: 'todo', priority: 'medium', assignee: 'Сидоров Д.О.', dueDate: '2026-01-30', project: 'Интранет' },
  { id: 9, title: 'Подготовка рекламной кампании', description: 'Разработать стратегию и материалы для весенней кампании', status: 'review', priority: 'high', assignee: 'Соколов М.П.', dueDate: '2026-01-21', project: 'Маркетинг' },
  { id: 10, title: 'Юридическая экспертиза договора', description: 'Проверить новый договор с поставщиком', status: 'done', priority: 'medium', assignee: 'Кузнецова Т.Р.', dueDate: '2026-01-14', project: 'Юридический' },
];

export const documents: Document[] = [
  { id: 1, name: 'Политика удалённой работы 2026', type: 'pdf', size: '2.4 MB', modified: '2026-01-10', author: 'Петрова М.С.', category: 'HR' },
  { id: 2, name: 'Финансовый отчёт Q4 2025', type: 'xlsx', size: '5.1 MB', modified: '2026-01-08', author: 'Козлова А.В.', category: 'Финансы' },
  { id: 3, name: 'Техническое задание Интранет v2', type: 'docx', size: '1.8 MB', modified: '2026-01-12', author: 'Иванов А.П.', category: 'IT' },
  { id: 4, name: 'Презентация для инвесторов', type: 'pptx', size: '12.3 MB', modified: '2026-01-05', author: 'Новиков С.А.', category: 'Управление' },
  { id: 5, name: 'Регламент работы с документами', type: 'pdf', size: '890 KB', modified: '2025-12-20', author: 'Кузнецова Т.Р.', category: 'Юридический' },
  { id: 6, name: 'Брендбук компании', type: 'pdf', size: '25.6 MB', modified: '2025-11-15', author: 'Морозова Е.И.', category: 'Маркетинг' },
  { id: 7, name: 'Штатное расписание 2026', type: 'xlsx', size: '3.2 MB', modified: '2026-01-02', author: 'Петрова М.С.', category: 'HR' },
  { id: 8, name: 'Архитектура системы', type: 'pdf', size: '4.7 MB', modified: '2026-01-11', author: 'Сидоров Д.О.', category: 'IT' },
  { id: 9, name: 'Маркетинговая стратегия 2026', type: 'pptx', size: '8.9 MB', modified: '2026-01-07', author: 'Соколов М.П.', category: 'Маркетинг' },
  { id: 10, name: 'Инструкция по охране труда', type: 'pdf', size: '1.2 MB', modified: '2025-10-01', author: 'Петрова М.С.', category: 'HR' },
];

export const calendarEvents: CalendarEvent[] = [
  { id: 1, title: 'Общее собрание компании', date: '2026-01-20', time: '10:00', location: 'Конференц-зал А', type: 'meeting', participants: ['Все сотрудники'] },
  { id: 2, title: 'Дедлайн: Квартальный отчёт', date: '2026-01-18', time: '18:00', location: '', type: 'deadline', participants: ['Козлова А.В.'] },
  { id: 3, title: 'Тренинг по лидерству', date: '2026-01-22', time: '14:00', location: 'Переговорная Б', type: 'event', participants: ['Петрова М.С.', 'Новиков С.А.', 'Соколов М.П.'] },
  { id: 4, title: 'Встреча с партнёрами', date: '2026-01-21', time: '11:00', location: 'Переговорная В', type: 'meeting', participants: ['Иванов А.П.', 'Новиков С.А.'] },
  { id: 5, title: 'День рождения компании', date: '2026-01-25', time: '15:00', location: 'Офис', type: 'event', participants: ['Все сотрудники'] },
  { id: 6, title: 'Спринт-ревью', date: '2026-01-17', time: '16:00', location: 'Онлайн', type: 'meeting', participants: ['Сидоров Д.О.', 'Волков А.Н.', 'Морозова Е.И.'] },
  { id: 7, title: 'Собеседование: Frontend-разработчик', date: '2026-01-19', time: '12:00', location: 'Переговорная А', type: 'meeting', participants: ['Петрова М.С.', 'Иванов А.П.'] },
];

export const announcements: Announcement[] = [
  { id: 1, title: 'Плановые работы на серверах', content: 'В ночь с 19 на 20 января будут проводиться плановые работы. Возможны кратковременные перебои в работе сервисов с 02:00 до 04:00.', date: '2026-01-15', important: true },
  { id: 2, title: 'Новый кофе-поинт на 3 этаже', content: 'Рады сообщить об открытии новой кофейной зоны на 3 этаже! Бесплатный кофе и чай для всех сотрудников.', date: '2026-01-14', important: false },
  { id: 3, title: 'Изменение графика работы в праздники', content: 'В связи с праздничными днями, офис будет работать по сокращённому графику 23-25 января.', date: '2026-01-13', important: true },
];

export const departmentStats = [
  { name: 'IT', employees: 28, projects: 5 },
  { name: 'HR', employees: 8, projects: 3 },
  { name: 'Финансы', employees: 12, projects: 2 },
  { name: 'Маркетинг', employees: 15, projects: 4 },
  { name: 'Управление', employees: 6, projects: 3 },
  { name: 'Юридический', employees: 4, projects: 1 },
];

export const taskStats = {
  todo: 15,
  in_progress: 23,
  review: 8,
  done: 42,
};

export const activityData = [
  { month: 'Авг', tasks: 32, completed: 28 },
  { month: 'Сен', tasks: 45, completed: 40 },
  { month: 'Окт', tasks: 38, completed: 35 },
  { month: 'Ноя', tasks: 52, completed: 48 },
  { month: 'Дек', tasks: 41, completed: 38 },
  { month: 'Янв', tasks: 47, completed: 42 },
];
