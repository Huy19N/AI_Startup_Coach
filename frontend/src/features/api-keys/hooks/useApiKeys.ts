import { useCallback } from 'react';
import { useApiKeyStore } from '../stores/apiKeyStore';
import { apiKeyService } from '../services/apiKeyService';

export const useApiKeys = () => {
  const { keys, isLoading, error, setKeys, addKey, removeKey, setLoading, setError } = useApiKeyStore();

  const fetchKeys = useCallback(async () => {
    setLoading(true);
    try {
      const data = await apiKeyService.getKeys();
      setKeys(data);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi tải API keys');
    } finally {
      setLoading(false);
    }
  }, [setKeys, setLoading, setError]);

  const createKey = async (provider: string, keyValue: string, defaultModel?: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await apiKeyService.addKey(provider, keyValue, defaultModel);
      addKey(data);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi thêm API key');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const deleteKey = async (id: number) => {
    setLoading(true);
    try {
      await apiKeyService.deleteKey(id.toString());
      removeKey(id);
      return true;
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi xoá API key');
      return false;
    } finally {
      setLoading(false);
    }
  };

  const verifyKey = async (provider: string, keyValue: string, defaultModel?: string) => {
    setLoading(true);
    setError(null);
    try {
      return await apiKeyService.verifyKey(provider, keyValue, defaultModel);
    } catch (err: any) {
      setError(err.response?.data?.message || 'Lỗi khi xác thực API key');
      return false;
    } finally {
      setLoading(false);
    }
  };

  return { keys, isLoading, error, fetchKeys, createKey, deleteKey, verifyKey };
};
