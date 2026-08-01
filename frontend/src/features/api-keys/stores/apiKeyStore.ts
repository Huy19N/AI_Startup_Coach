import { create } from 'zustand';
import { ApiKey, ApiKeyState } from '../types/apiKey.types';

interface ApiKeyStore extends ApiKeyState {
  setKeys: (keys: ApiKey[]) => void;
  addKey: (key: ApiKey) => void;
  removeKey: (id: string) => void;
  setLoading: (isLoading: boolean) => void;
  setError: (error: string | null) => void;
}

export const useApiKeyStore = create<ApiKeyStore>((set) => ({
  keys: [],
  isLoading: false,
  error: null,
  setKeys: (keys) => set({ keys, error: null }),
  addKey: (key) => set((state) => ({ keys: [...state.keys, key], error: null })),
  removeKey: (id) => set((state) => ({ keys: state.keys.filter(k => k.id !== id), error: null })),
  setLoading: (isLoading) => set({ isLoading }),
  setError: (error) => set({ error }),
}));
