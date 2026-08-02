import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/stores/authStore';
import { KeyRound, LogOut, MessageSquare, Sparkles, Shield } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const isAdmin = user?.roles?.includes('Admin');

  return (
    <nav className="border-b border-sky-100 dark:border-sky-900/30 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md sticky top-0 z-40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center gap-6">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2 group">
              <div className="p-2 rounded-xl bg-gradient-to-tr from-sky-500 to-sky-400 text-white shadow-md shadow-sky-500/20 group-hover:scale-105 transition-transform">
                <MessageSquare className="h-5 w-5" />
              </div>
              <span className="font-bold text-xl tracking-tight bg-gradient-to-r from-sky-600 via-sky-500 to-blue-600 bg-clip-text text-transparent">
                AI Startup Coach
              </span>
            </Link>

            {isAuthenticated && isAdmin && (
              <Link
                to="/admin/templates"
                className="hidden md:flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-lg bg-sky-50 text-sky-700 hover:bg-sky-100 dark:bg-sky-950/50 dark:text-sky-300 transition-colors border border-sky-200/50"
              >
                <Shield className="w-3.5 h-3.5 text-sky-600" />
                <span>Quản lý Prompt</span>
              </Link>
            )}
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                {/* AI Quota Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-sky-50 dark:bg-sky-900/30 border border-sky-200/60 text-sky-700 dark:text-sky-300 text-xs font-semibold shadow-xs">
                  <Sparkles className="w-3.5 h-3.5 text-sky-500 animate-pulse" />
                  <span>AI Quota: <strong className="text-sky-600 dark:text-sky-400">{user?.aiQuota ?? 50}</strong>/50</span>
                </div>

                <Link to="/api-keys" className="text-sm font-medium text-slate-600 hover:text-sky-600 dark:text-slate-300 flex items-center gap-1 transition-colors">
                  <KeyRound className="w-4 h-4" />
                  <span>API Keys</span>
                </Link>
                <div className="h-5 w-px bg-slate-200 dark:bg-slate-800 mx-1"></div>
                <span className="text-sm font-medium hidden sm:block text-slate-700 dark:text-slate-200">
                  {user?.fullName || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-slate-400 hover:text-rose-600 transition-colors rounded-lg hover:bg-rose-50 dark:hover:bg-rose-950/30"
                  title="Đăng xuất"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium text-sky-600 hover:text-sky-700 transition-colors">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
