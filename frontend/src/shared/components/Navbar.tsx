import { Link, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../../features/auth/stores/authStore';
import { KeyRound, LogOut, MessageSquare } from 'lucide-react';

export const Navbar = () => {
  const { user, logout, isAuthenticated } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="border-b border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center gap-2">
              <MessageSquare className="h-6 w-6 text-primary" />
              <span className="font-bold text-xl tracking-tight">AI Startup Coach</span>
            </Link>
          </div>
          
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link to="/api-keys" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1 transition-colors">
                  <KeyRound className="w-4 h-4" />
                  API Keys
                </Link>
                <div className="h-6 w-px bg-border mx-2"></div>
                <span className="text-sm font-medium hidden sm:block">
                  {user?.fullName || 'User'}
                </span>
                <button
                  onClick={handleLogout}
                  className="p-2 text-muted-foreground hover:text-foreground transition-colors rounded-md hover:bg-secondary"
                  title="Đăng xuất"
                >
                  <LogOut className="w-5 h-5" />
                </button>
              </>
            ) : (
              <Link to="/login" className="text-sm font-medium hover:text-primary transition-colors">
                Đăng nhập
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
