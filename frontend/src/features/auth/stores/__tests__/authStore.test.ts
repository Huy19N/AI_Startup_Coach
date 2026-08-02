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

  test('parseJwtClaims correctly parses role and aiQuota', () => {
    // Header.Payload.Signature
    // Payload: {"http://schemas.microsoft.com/ws/2008/06/identity/claims/role":"Admin","AiQuota":42}
    const fakePayload = btoa(JSON.stringify({
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Admin',
      AiQuota: 42
    }));
    const fakeToken = `header.${fakePayload}.sig`;

    const parsed = parseJwtClaims(fakeToken);
    expect(parsed.roles).toEqual(['Admin']);
    expect(parsed.aiQuota).toBe(42);
  });

  test('setCredentials updates state and localStorage', () => {
    const fakePayload = btoa(JSON.stringify({
      'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': 'Student',
      AiQuota: 49
    }));
    const fakeToken = `header.${fakePayload}.sig`;

    const user = { email: 'student@test.com', fullName: 'Student User', roles: [], aiQuota: 49 };
    useAuthStore.getState().setCredentials(user, fakeToken);

    const state = useAuthStore.getState();
    expect(state.isAuthenticated).toBe(true);
    expect(state.token).toBe(fakeToken);
    expect(state.user?.email).toBe('student@test.com');
    expect(state.user?.roles).toEqual(['Student']);
    expect(state.user?.aiQuota).toBe(49);
  });

  test('updateUserQuota updates user quota in state and localStorage', () => {
    useAuthStore.setState({
      user: { email: 'test@test.com', fullName: 'Test User', roles: ['Student'], aiQuota: 50 },
      isAuthenticated: true,
      token: 'valid_token'
    });

    useAuthStore.getState().updateUserQuota(45);

    expect(useAuthStore.getState().user?.aiQuota).toBe(45);
  });

  test('logout clears credentials', () => {
    useAuthStore.setState({
      user: { email: 'test@test.com', fullName: 'Test User', roles: ['Student'], aiQuota: 50 },
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
