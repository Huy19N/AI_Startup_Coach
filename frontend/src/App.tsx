import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from './shared/components/Layout';
import { ProtectedRoute } from './shared/components/ProtectedRoute';
import { LoginPage, RegisterPage } from './features/auth';
import { ApiKeyPage } from './features/api-keys';
import { ChatPage } from './features/chat';
import { AdminGuard, AdminTemplatePage } from './features/admin';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        
        <Route element={<ProtectedRoute />}>
          <Route element={<Layout />}>
            <Route path="/" element={<ChatPage />} />
            <Route path="/api-keys" element={<ApiKeyPage />} />

            <Route element={<AdminGuard />}>
              <Route path="/admin/templates" element={<AdminTemplatePage />} />
            </Route>
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
