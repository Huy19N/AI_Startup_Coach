import { useState, FormEvent } from 'react';
import { useApiKeys } from '../hooks/useApiKeys';
import { PROVIDERS } from '@/shared/utils/constants';
import { KeyRound, Plus } from 'lucide-react';

const MODELS_BY_PROVIDER: Record<string, {id: string, name: string}[]> = {
  gemini: [
    { id: '', name: 'Mặc định (gemini-flash-latest)' },
    { id: 'gemini-flash-latest', name: 'Gemini Flash Latest' },
    { id: 'gemini-2.5-flash', name: 'Gemini 2.5 Flash' },
    { id: 'gemini-3.5-flash', name: 'Gemini 3.5 Flash' },
    { id: 'gemini-3.6-flash', name: 'Gemini 3.6 Flash' }
  ],
  openai: [
    { id: '', name: 'Mặc định (gpt-4o-mini)' },
    { id: 'gpt-4o-mini', name: 'GPT-4o Mini' },
    { id: 'gpt-4o', name: 'GPT-4o' }
  ],
  claude: [
    { id: '', name: 'Mặc định (claude-3-haiku)' },
    { id: 'claude-3-haiku-20240307', name: 'Claude 3 Haiku' },
    { id: 'claude-3-5-sonnet-20240620', name: 'Claude 3.5 Sonnet' }
  ],
  groq: [
    { id: '', name: 'Mặc định (llama3-8b-8192)' },
    { id: 'llama3-8b-8192', name: 'Llama 3 8B' },
    { id: 'llama3-70b-8192', name: 'Llama 3 70B' },
    { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B' }
  ]
};

export const ApiKeyForm = () => {
  const [provider, setProvider] = useState(PROVIDERS[0].id);
  const [keyValue, setKeyValue] = useState('');
  const [defaultModel, setDefaultModel] = useState('');
  const [verifyStatus, setVerifyStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { createKey, verifyKey, isLoading } = useApiKeys();

  const handleVerify = async () => {
    if (!keyValue.trim()) return;
    setVerifyStatus('idle');
    const success = await verifyKey(provider, keyValue, defaultModel);
    setVerifyStatus(success ? 'success' : 'error');
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!keyValue.trim()) return;
    
    const success = await createKey(provider, keyValue, defaultModel);
    if (success) {
      setKeyValue('');
      setDefaultModel('');
      setVerifyStatus('idle');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-card border border-border p-6 rounded-xl shadow-sm mb-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <h2 className="text-lg font-semibold mb-4 flex items-center gap-2">
        <KeyRound className="w-5 h-5 text-primary" />
        Thêm API Key mới
      </h2>
      <div className="flex flex-col gap-4">
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="flex-1 w-full space-y-2">
          <label className="text-sm font-medium" htmlFor="provider">Nhà cung cấp AI (Provider)</label>
          <select
            id="provider"
            className="w-full px-3 py-2 border border-input rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50"
            value={provider}
            onChange={(e) => {
              setProvider(e.target.value);
              // Clear default model when changing provider
              setDefaultModel('');
            }}
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
            className={`w-full px-3 py-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 ${
              verifyStatus === 'success' ? 'border-green-500' : verifyStatus === 'error' ? 'border-red-500' : 'border-input'
            }`}
            placeholder="Nhập API Key của bạn"
            value={keyValue}
            onChange={(e) => {
              setKeyValue(e.target.value);
              setVerifyStatus('idle');
            }}
          />
        </div>
        <div className="flex gap-2 w-full sm:w-auto">
          <button
            type="button"
            onClick={handleVerify}
            disabled={isLoading || !keyValue.trim()}
            className="flex-1 sm:flex-none flex items-center justify-center bg-secondary text-secondary-foreground py-2 px-4 rounded-md font-medium hover:bg-secondary/80 transition-colors disabled:opacity-70 h-[42px]"
          >
            Kiểm tra
          </button>
          <button
            type="submit"
            disabled={isLoading || !keyValue.trim()}
            className="flex-1 sm:flex-none flex items-center justify-center gap-2 bg-primary text-primary-foreground py-2 px-6 rounded-md font-medium hover:bg-primary/90 transition-colors disabled:opacity-70 h-[42px]"
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
        </div>
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="w-full sm:w-1/2 space-y-2">
            <label className="text-sm font-medium" htmlFor="defaultModel">Model Name (Tuỳ chọn)</label>
            <select
              id="defaultModel"
              className="w-full px-3 py-2 border rounded-md bg-transparent focus:outline-none focus:ring-2 focus:ring-primary/50 border-input"
              value={defaultModel}
              onChange={(e) => {
                setDefaultModel(e.target.value);
                setVerifyStatus('idle');
              }}
            >
              {MODELS_BY_PROVIDER[provider]?.map(m => (
                <option key={m.id} value={m.id} className="bg-background">{m.name}</option>
              )) || (
                <option value="" className="bg-background">Mặc định</option>
              )}
            </select>
          </div>
        </div>
      </div>
      {verifyStatus === 'success' && (
        <p className="text-sm text-green-500 mt-2 font-medium">API Key hợp lệ!</p>
      )}
      {verifyStatus === 'error' && (
        <p className="text-sm text-red-500 mt-2 font-medium">API Key không hợp lệ hoặc không có quyền truy cập.</p>
      )}
      <p className="text-xs text-muted-foreground mt-3 flex items-center gap-1">
        * API Key của bạn được mã hóa an toàn (AES-256) trước khi lưu trữ và chỉ được dùng để gọi AI.
      </p>
    </form>
  );
};
