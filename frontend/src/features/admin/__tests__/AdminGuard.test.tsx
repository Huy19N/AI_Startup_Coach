import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { AdminGuard } from '../components/AdminGuard';
import { useAuthStore } from '@/features/auth/stores/authStore';

jest.mock('@/features/auth/stores/authStore');

describe('AdminGuard', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('redirects to /login when not authenticated', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: null,
      isAuthenticated: false,
    });

    render(
      <MemoryRouter initialEntries={['/admin/templates']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<AdminGuard />}>
            <Route path="/admin/templates" element={<div>Admin Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('redirects to / when user is not Admin', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { email: 'student@test.com', fullName: 'Student', roles: ['Student'] },
      isAuthenticated: true,
    });

    render(
      <MemoryRouter initialEntries={['/admin/templates']}>
        <Routes>
          <Route path="/" element={<div>Home Page</div>} />
          <Route element={<AdminGuard />}>
            <Route path="/admin/templates" element={<div>Admin Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Home Page')).toBeInTheDocument();
  });

  test('renders outlet when user is Admin', () => {
    (useAuthStore as unknown as jest.Mock).mockReturnValue({
      user: { email: 'admin@test.com', fullName: 'Admin User', roles: ['Admin'] },
      isAuthenticated: true,
    });

    render(
      <MemoryRouter initialEntries={['/admin/templates']}>
        <Routes>
          <Route element={<AdminGuard />}>
            <Route path="/admin/templates" element={<div>Admin Content</div>} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Admin Content')).toBeInTheDocument();
  });
});
