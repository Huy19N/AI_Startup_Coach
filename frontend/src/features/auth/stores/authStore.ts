import { create } from 'zustand';
import { AuthState, User } from '../types/auth.types';
import { TOKEN_KEY } from '@/shared/utils/constants';

interface AuthStore extends AuthState {
  setCredentials: (user: User, token: string) => void;
  logout: () => void;
}

export const parseJwtClaims = (token: string): { roles: string[] } => {
  try {
    const base64Url = token.split('.')[1];
    if (!base64Url) return { roles: [] };
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    const payload = JSON.parse(jsonPayload);

    // .NET claims mapping
    const rawRoles = payload['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'] || payload.role || payload.roles || [];
    const roles = Array.isArray(rawRoles) ? rawRoles : [rawRoles];

    return { roles };
  } catch {
    return { roles: [] };
  }
};

const initialToken = localStorage.getItem(TOKEN_KEY);
const initialUserJson = localStorage.getItem('user_info');
let initialUser: User | null = null;

if (initialUserJson) {
  try {
    initialUser = JSON.parse(initialUserJson);
  } catch {
    initialUser = null;
  }
}

if (initialToken && !initialUser) {
  const { roles } = parseJwtClaims(initialToken);
  initialUser = {
    email: '',
    fullName: 'User',
    roles
  };
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: initialUser,
  token: initialToken,
  isAuthenticated: !!initialToken,
  isLoading: false,
  error: null,
  setCredentials: (user, token) => {
    const { roles } = parseJwtClaims(token);
    const updatedUser: User = {
      ...user,
      roles: user.roles && user.roles.length > 0 ? user.roles : roles
    };
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem('user_info', JSON.stringify(updatedUser));
    set({ user: updatedUser, token, isAuthenticated: true, error: null });
  },
  logout: () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem('user_info');
    set({ user: null, token: null, isAuthenticated: false, error: null });
  },
}));
