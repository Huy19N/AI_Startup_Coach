export interface User {
  email: string;
  fullName: string;
  roles: string[];
  aiQuota?: number;
}

export interface AuthResponse {
  token: string;
  email: string;
  fullName: string;
  expiresAt: string;
}

export interface AuthState {
  user: User | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}
