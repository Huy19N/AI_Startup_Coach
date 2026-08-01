export interface ApiKey {
  id: string;
  provider: string;
  keyPrefix: string;
  createdAt: string;
}

export interface ApiKeyState {
  keys: ApiKey[];
  isLoading: boolean;
  error: string | null;
}
