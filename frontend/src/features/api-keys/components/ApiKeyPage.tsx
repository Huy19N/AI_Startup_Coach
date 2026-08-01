import { useEffect } from 'react';
import { useApiKeys } from '../hooks/useApiKeys';
import { ApiKeyForm } from './ApiKeyForm';
import { PROVIDERS } from '@/shared/utils/constants';
import { Trash2 } from 'lucide-react';

export const ApiKeyPage = () => {
  const { keys, isLoading, error, fetchKeys, deleteKey } = useApiKeys();

  useEffect(() => {
    fetchKeys();
  }, [fetchKeys]);

  const getProviderName = (providerId: string) => {
    const p = PROVIDERS.find(p => p.id === providerId);
    return p ? p.name : providerId;
  };

  return (
    <div className="flex-1 overflow-auto bg-muted/20 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8 animate-in fade-in slide-in-from-top-4 duration-500">
          <h1 className="text-3xl font-bold tracking-tight">Quản lý API Keys</h1>
          <p className="text-muted-foreground mt-2">
            Thêm API keys của các nền tảng AI (BYOK - Bring Your Own Key) để bắt đầu sử dụng trợ lý khởi nghiệp.
          </p>
        </div>

        {error && (
          <div className="mb-6 p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
            {error}
          </div>
        )}

        <ApiKeyForm />

        <div className="bg-card border border-border rounded-xl shadow-sm overflow-hidden animate-in fade-in duration-700">
          <div className="px-6 py-4 border-b border-border bg-muted/30">
            <h3 className="font-semibold text-lg">Danh sách API Keys đã thêm</h3>
          </div>
          
          <div className="p-0">
            {isLoading && keys.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin mx-auto mb-2" />
                Đang tải dữ liệu...
              </div>
            ) : keys.length === 0 ? (
              <div className="p-8 text-center text-muted-foreground">
                Bạn chưa thêm API Key nào. Hãy thêm một Key ở phía trên để bắt đầu.
              </div>
            ) : (
              <ul className="divide-y divide-border">
                {keys.map((key) => (
                  <li key={key.id} className="flex items-center justify-between p-6 hover:bg-muted/10 transition-colors">
                    <div>
                      <div className="font-medium flex items-center gap-2">
                        {getProviderName(key.provider)}
                        <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                          {key.provider}
                        </span>
                      </div>
                      <div className="text-sm text-muted-foreground mt-1 flex flex-col gap-1">
                        <div>Key: <code className="px-2 py-1 bg-muted rounded text-xs tracking-wider">{key.maskedKey}</code></div>
                        {key.defaultModel && (
                          <div>Model: <code className="px-2 py-1 bg-muted rounded text-xs tracking-wider text-primary">{key.defaultModel}</code></div>
                        )}
                      </div>
                    </div>
                    <button
                      onClick={() => deleteKey(key.id)}
                      disabled={isLoading}
                      className="p-2 text-destructive hover:bg-destructive/10 rounded-md transition-colors disabled:opacity-50"
                      title="Xóa Key"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
