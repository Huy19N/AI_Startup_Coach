import { useState } from 'react';
import { useAuthStore } from '../stores/authStore';
import { authService } from '../services/authService';

export const useAuth = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { setCredentials, logout, isAuthenticated, user } = useAuthStore();

  const login = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.login(data);
      setCredentials(
        { email: response.email, fullName: response.fullName },
        response.token
      );
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng nhập thất bại');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (data: any) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await authService.register(data);
      setCredentials(
        { email: response.email, fullName: response.fullName },
        response.token
      );
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Đăng ký thất bại');
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, register, logout, isAuthenticated, user, isLoading, error };
};
