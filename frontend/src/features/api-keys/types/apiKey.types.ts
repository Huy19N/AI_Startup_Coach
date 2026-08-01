export interface ApiKey {
  id: number;
  provider: string;
  maskedKey: string;
  displayName: string;
  defaultModel?: string;
  isActive: boolean;
  createdAt: string;
}

export interface ApiKeyState {
  keys: ApiKey[];
  isLoading: boolean;
  error: string | null;
}
