import axiosInstance from '@/shared/utils/axiosInstance';
import { AuthResponse } from '../types/auth.types';

export const authService = {
  async register(data: any): Promise<AuthResponse> {
    const response = await axiosInstance.post('/auth/register', data);
    return response.data;
  },

  async login(data: any): Promise<AuthResponse> {
    const response = await axiosInstance.post('/auth/login', data);
    return response.data;
  },
};
