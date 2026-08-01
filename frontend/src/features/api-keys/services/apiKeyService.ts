import axiosInstance from '@/shared/utils/axiosInstance';
import { ApiKey } from '../types/apiKey.types';

export const apiKeyService = {
  async getKeys(): Promise<ApiKey[]> {
    const response = await axiosInstance.get('/api-keys');
    return response.data;
  },

  async addKey(provider: string, keyValue: string, defaultModel?: string): Promise<ApiKey> {
    const response = await axiosInstance.post('/api-keys', { provider, apiKey: keyValue, defaultModel });
    return response.data;
  },

  async deleteKey(id: string): Promise<void> {
    await axiosInstance.delete(`/api-keys/${id}`);
  },

  async verifyKey(provider: string, keyValue: string, defaultModel?: string): Promise<boolean> {
    const response = await axiosInstance.post('/api-keys/verify', { provider, apiKey: keyValue, defaultModel });
    return response.data.success;
  },
};
