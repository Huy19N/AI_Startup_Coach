import { useState, FormEvent } from 'react';
import { useApiKeys } from '../hooks/useApiKeys';
import { PROVIDERS } from '@/shared/utils/constants';
import { KeyRound, Plus } from 'lucide-react';

export const ApiKeyForm = () => {
  const [provider, setProvider] = useState(PROVIDERS[0].id);
  const [keyValue, setKeyValue] = useState('');
  const { createKey, isLoading } = useApiKeys();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!keyValue.trim()) return;
    
    const success = await createKey(provider, keyValue);
    if (success) {
      setKeyValue('');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border p-6 rounded-xl shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <KeyRound className="w-5 h-5 text-primary" />
        Thêm API Key mới
      </h2>
      <div className="flex flex-col sm:flex-row gap-4 items-end">
        <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium" htmlFor="provider">Nhà cung cấp AI (Provider)</label>
          <select
            id="provider"
            className="w-full px-3 py-2 border border-input rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={provider}
            onChange={(e) => setProvider(e.target.value)}
          >
            {PROVIDERS.map((p) => (
              <option key={p.id} value={p.id} className="bg-background">
                {p.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex-[2] w-full space-y-2">
          <label className="text-sm font-medium" htmlFor="keyValue">API Key</label>
          <input
            id="keyValue"
            type="password"
            required
            className="w-full px-3 py-2 border border-input rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
            placeholder="Nhập API Key của bạn"
            value={keyValue}
            onChange={(e) => setKeyValue(e.target.value)}
          />
        </div>
        <button
          type="submit"
          disabled={isLoading || !keyValue.trim()}
          className="w-full sm:w-auto flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 px-6 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 h-[42px]"
        >
          {isLoading ? (
             <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
          ) : (
            <>
              <Plus className="w-4 h-4" />
              Thêm Key
            </>
          )}
        </button>
      </div>
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        * API Key của bạn được mã hóa an toàn (AES-256) trước khi lưu trữ và chỉ được dùng để gọi AI.
      </p>
    </form>
  );
};
