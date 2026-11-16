import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import News from './pages/News';
import Employees from './pages/Employees';
import Tasks from './pages/Tasks';
import Documents from './pages/Documents';
import CalendarPage from './pages/Calendar';

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/news" element={<News />} />
          <Route path="/employees" element={<Employees />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/calendar" element={<CalendarPage />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
