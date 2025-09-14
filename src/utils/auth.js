export const AUTH_KEY = "app_auth";

export function login(username) {
  const payload = { user: { username }, ts: Date.now() };
  localStorage.setItem(AUTH_KEY, JSON.stringify(payload));
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
}

export function isAuthenticated() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return false;
    const parsed = JSON.parse(raw);
    return Boolean(parsed && parsed.user && parsed.user.username);
  } catch {
    return false;
  }
}

export function getUser() {
  try {
    const raw = localStorage.getItem(AUTH_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    return parsed?.user ?? null;
  } catch {
    return null;
  }
}

