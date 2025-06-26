import { useState } from 'react';
import { TeacherLayout } from '@/components/teacher/TeacherLayout';
import { TeacherDashboard } from '@/components/teacher/TeacherDashboard';
import { StudentsManagement } from '@/components/teacher/StudentsManagement';
import QuizManagement from '@/components/teacher/QuizManagement';
import { QuizAssignment } from '@/components/teacher/QuizAssignment';
import Reports from '@/components/teacher/Reports';
import SettingsPage from '@/components/teacher/Settings';

export default function TeacherPortal() {
  const [currentPage, setCurrentPage] = useState('dashboard');
  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <TeacherDashboard />;
      case 'students':
        return <StudentsManagement />;
      case 'quizzes':
        return <QuizManagement />;
      case 'assignment':
        return <QuizAssignment />;
      case 'reports':
        return <Reports />;
      case 'settings':
        return <SettingsPage />;
      default:
        return <TeacherDashboard />;
    }
  };

  return (
    <TeacherLayout currentPage={currentPage} onPageChange={setCurrentPage}>
      {renderPage()}
    </TeacherLayout>
  );
}
