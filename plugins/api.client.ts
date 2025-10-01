export default defineNuxtPlugin(() => {
  const config = useRuntimeConfig();
  const base = (config.public.apiBaseUrl || '').replace(/\/$/, '');

  // --- accessToken の保存先（簡単のため localStorage） ---
  const tokenKey = 'accessToken';
  const getAccessToken = () =>
    process.client ? localStorage.getItem(tokenKey) || '' : '';
  const setAccessToken = (t?: string) => {
    if (!process.client) return;
    if (t) localStorage.setItem(tokenKey, t);
    else localStorage.removeItem(tokenKey);
  };

  function getCsrfToken() {
    if (process.client) return localStorage.getItem('csrf') || 'csrf-dummy';
    return 'csrf-dummy';
  }

  const api = $fetch.create({
    baseURL: `${base}/api`,
    credentials: 'include',

    onRequest({ options }) {
      const headers = new Headers(options.headers as HeadersInit);
      const method = String(options.method || 'GET').toUpperCase();

      // Authorization を常に付与（保存されている場合）
      const token = getAccessToken();
      if (token) headers.set('Authorization', `Bearer ${token}`);

      // 非GET系に CSRF ヘッダ
      if (!['GET', 'HEAD', 'OPTIONS'].includes(method)) {
        headers.set('X-CSRF-Token', getCsrfToken());
      }

      // JSONボディなら Content-Type を補完（FormData 等はそのまま）
      const isJsonBody =
        options.body &&
        typeof options.body === 'object' &&
        !(options.body instanceof FormData) &&
        !(options.body instanceof Blob) &&
        !(options.body instanceof ArrayBuffer);
      if (isJsonBody && !headers.has('Content-Type')) {
        headers.set('Content-Type', 'application/json');
      }

      options.headers = headers;
    },

    // login / refresh のレスポンスから accessToken を保存
    onResponse({ request, response }) {
      const url = typeof request === 'string' ? request : String(request);
      if (url.endsWith('/users/login') || url.endsWith('/users/refresh')) {
        const body = response._data as any;
        // ラッパー対応: {accessToken} と {data:{accessToken}} の両方を見る
        const at = body?.accessToken ?? body?.data?.accessToken;
        if (typeof at === 'string' && at) setAccessToken(at);
      }
    },

    // 401 → /users/refresh → 再送（成功時に accessToken を保存）
    async onResponseError({ request, options, response }) {
      if (response.status === 401 && !(options as any)._retry) {
        (options as any)._retry = true;
        try {
          const body = await $fetch<any>('/users/refresh', {
            baseURL: `${base}/api`,
            method: 'POST',
            credentials: 'include',
          });
          const at = body?.accessToken ?? body?.data?.accessToken;
          if (typeof at === 'string' && at) setAccessToken(at);

          const retryOptions: any = {
            method: options.method,
            headers: options.headers,
            body: (options as any).body,
            params: (options as any).params,
            query: (options as any).query,
            credentials: 'include',
          };
          return await $fetch(request as any, retryOptions);
        } catch {
          setAccessToken(undefined);
          throw response._data ?? new Error('Unauthorized');
        }
      }
      throw response._data ?? new Error('API error');
    },
  });

  return { provide: { api } };
});
