
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  ClipboardList, 
  BarChart3, 
  Award, 
  User, 
  LogOut,
  Menu,
  X,
  BookOpen,
  PlayCircle,
  Trophy
} from 'lucide-react';
import { ThemeToggle } from '@/components/theme-toggle';
import { cn } from '@/lib/utils';
import { ThemeToggle } from '@/components/ui/theme-toggle';

interface StudentLayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  isTakingQuiz: boolean;
}

export function StudentLayout({ children, currentPage, onPageChange, sidebarOpen, setSidebarOpen, isTakingQuiz }: StudentLayoutProps) {
  const { signOut } = useAuth();
  const navigation = [
    { name: 'Dashboard', id: 'dashboard', icon: Home },
    { name: 'Assigned Quizzes', id: 'assigned', icon: ClipboardList },
    { name: 'Quiz Results', id: 'results', icon: BarChart3 },
    { name: 'Leaderboard', id: 'leaderboard', icon: Trophy },
    { name: 'Study Materials', id: 'materials', icon: BookOpen },
    { name: 'Achievements', id: 'achievements', icon: Award },
    { name: 'Profile', id: 'profile', icon: User },
  ];

  return (
<<<<<<< HEAD
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-green-50 dark:from-slate-900 dark:to-gray-900 flex">
=======
    <div className="min-h-screen flex flex-row w-full bg-background">
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        aria-label="Sidebar"
        className={cn(
<<<<<<< HEAD
          'fixed inset-y-0 left-0 z-50 w-64 bg-card shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0',
=======
          // Use fixed positioning on mobile and switch to relative on desktop like TeacherLayout
          'fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0',
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-green-600">
          <div className="flex items-center gap-2">
            <div className="bg-white p-2 rounded-lg">
              <PlayCircle className="h-6 w-6 text-blue-600" />
            </div>
            <h1 className="text-xl font-bold text-white">Learning Hub</h1>
          </div>
          <Button
            variant="ghost"
            size="sm"
            className="lg:hidden text-white hover:bg-white/20"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <nav className="mt-6 px-3">
          <div className="space-y-1">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => {
                    onPageChange(item.id);
                    setSidebarOpen(false);
                  }}
                  className={cn(
                    'w-full flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200',
                    currentPage === item.id
                      ? 'bg-gradient-to-r from-blue-500 to-green-500 text-white shadow-md'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  )}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </button>
              );
            })}
          </div>

          <div className="mt-auto pt-6 border-t border-gray-200">
            <Button
              variant="ghost"
              onClick={signOut}
              className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              disabled={isTakingQuiz}
            >
              <LogOut className="h-5 w-5 mr-3" />
              Sign Out
            </Button>
          </div>
        </nav>
      </div>

      {/* Main content */}
<<<<<<< HEAD
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-sm shadow-sm border-b border-border">
=======
      <div className="flex-1 flex flex-col min-h-screen ml-0 lg:ml-64">
        {/* Top bar */}
        <div className="sticky top-0 z-10 bg-white/80 backdrop-blur-sm shadow-sm border-b border-gray-200 flex-shrink-0">
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
          <div className="flex items-center justify-between h-16 px-6">
            <Button
              variant="ghost"
              size="sm"
              className="lg:hidden"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex-1"></div>
            <div className="flex items-center gap-4">
<<<<<<< HEAD
=======
              <h2 className="text-lg font-semibold text-gray-900 capitalize">
                {currentPage}
              </h2>
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
              <ThemeToggle />
            </div>
          </div>
        </div>

        {/* Page content */}
<<<<<<< HEAD
        <main className="p-6 flex-1">
=======
        <main className="p-6 flex-1 overflow-y-auto">
>>>>>>> cfff62cefee06d6fc0301da79b0cbe0e9db7a450
          {children}
        </main>
      </div>
    </div>
  );
}
