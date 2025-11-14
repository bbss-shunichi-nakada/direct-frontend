export const useApi = () => {
  const {
    public: { apiBaseUrl },
  } = useRuntimeConfig();
  const user = useUserStore();
  const withAuth = (headers: Record<string, string> = {}) =>
    user.accessToken
      ? { ...headers, Authorization: `Bearer ${user.accessToken}` }
      : headers;

  const get = <T>(p: string, h?: any) =>
    $fetch<T>(`${apiBaseUrl}${p}`, {
      method: 'GET',
      credentials: 'include',
      headers: withAuth(h),
    });
  const post = <T>(p: string, b?: any, h?: any) =>
    $fetch<T>(`${apiBaseUrl}${p}`, {
      method: 'POST',
      credentials: 'include',
      body: b,
      headers: withAuth(h),
    });

  return { get, post };
};
