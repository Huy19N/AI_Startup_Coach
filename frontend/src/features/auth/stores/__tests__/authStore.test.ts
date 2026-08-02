import { useAuthStore, parseJwtClaims } from '../authStore';

describe('authStore', () => {
  beforeEach(() => {
    localStorage.clear();
    useAuthStore.setState({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  });

  test('parseJwtClaims correctly parses role', () => {
    // Header.Payload.Signature
    // Payload: {"http://schemas.microsoft.com/ws/2008/06/identity/claims/role":"Admin"}
    const fakePayload = btoa(JSON.stringify({
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Admin'
    }));
    const fakeToken = `header.${fakePayload}.sig`;

    const parsed = parseJwtClaims(fakeToken);
    expect(parsed.roles).toEqual(['Admin']);
  });

  test('setCredentials updates state and localStorage', () => {
    const fakePayload = btoa(JSON.stringify({
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Student'
    }));
    const fakeToken = `header.${fakePayload}.sig`;

    const user = { email: 'student@test.com', fullName: 'Student User', roles: [] };
    useAuthStore.getState().setCredentials(user, fakeToken);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe(fakeToken);
    expect(state.user?.email).toBe('student@test.com');
    expect(state.user?.roles).toEqual(['Student']);
  });

  test('logout clears credentials', () => {
    useAuthStore.setState({
      user: { email: 'test@test.com', fullName: 'Test User', roles: ['Student'] },
      token: 'some-token',
      isAuthenticated: true,
    });

    useAuthStore.getState().logout();

    const state = useAuthStore.getState();
    expect(state.user).toBeNull();
    expect(state.token).toBeNull();
    expect(state.isAuthenticated).toBe(false);
  });
});
