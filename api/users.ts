import { useApi } from '~/composables/useApi';
export type Me = {
  id: number;
  email: string;
  name?: string | null;
  role?: string | null;
};

export function useUsersApi() {
  const { get, post } = useApi();
  return {
    login: (email: string, password: string) =>
      post<{ accessToken: string }>(`/users/login`, { email, password }),
    signup: (payload: { email: string; password: string; name?: string }) =>
      post<void>(`/users/signup`, payload),
    me: () => get<Me>(`/users/me`),
    logoutOne: () => post<void>(`/users/logoutOne`),
    refresh: () => post<{ accessToken: string }>(`/users/refresh`),
    changePassword: (payload: {
      currentPassword: string;
      newPassword: string;
    }) => post<void>(`/users/patch`, payload), // バックエンドの実装名に合わせて調整可
  };
}
