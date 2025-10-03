import { useUserStore } from '~/stores/user';

export const useAuth = () => {
  const config = useRuntimeConfig();
  const store = useUserStore();

  // .env が .../api でも ... でも動くように正規化
  const raw = config.public.apiBaseUrl || 'http://localhost:3001';
  const base = raw.replace(/\/$/, '');
  const apiBase = base.endsWith('/api') ? base : `${base}/api`;

  // ---- 追加：トークン抽出のユーティリティ（data 下も見る）
  const pickToken = (b: any): string | undefined => {
    return (
      b?.accessToken ??
      b?.token ??
      b?.access_token ??
      b?.data?.accessToken ??
      b?.data?.token
    );
  };
  const pickUser = (b: any): any => b?.user ?? b?.data?.user;

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // 1) /users/login
      const loginRes = await fetch(`${apiBase}/users/login`, {
        method: 'POST',
        credentials: 'include', // refresh 用 Cookie
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (!loginRes.ok) {
        console.debug('[auth] login failed status', loginRes.status);
        store.clear();
        return false;
      }
      const loginBody: any = await safeJson(loginRes);
      let token = pickToken(loginBody);

      // 2) token が無い構成でも /users/refresh でフォールバック
      if (!token) {
        const refRes = await fetch(`${apiBase}/users/refresh`, {
          method: 'POST',
          credentials: 'include',
        });
        if (!refRes.ok) {
          console.debug('[auth] refresh failed status', refRes.status);
          store.clear();
          return false;
        }
        const refBody: any = await safeJson(refRes);
        token = pickToken(refBody);
      }
      if (!token) {
        console.debug('[auth] no accessToken in login/refresh body');
        store.clear();
        return false;
      }

      // 3) store へ保存
      store.setAccessToken(token);

      // 4) user はレスポンスに含まれていればそれを使用、無ければ /me へ
      let user = pickUser(loginBody);
      if (!user) {
        const meRes = await fetch(`${apiBase}/users/me`, {
          method: 'GET',
          credentials: 'include',
          headers: { Authorization: `Bearer ${token}` }, // ← ローカルtokenを使用
        });
        if (!meRes.ok) {
          console.debug(
            '[auth] me failed status',
            meRes.status,
            await safeJson(meRes)
          );
          store.clear();
          return false;
        }
        user = await safeJson(meRes);
      }
      store.setMe(user);
      return true;
    } catch (err) {
      console.debug('[auth] network error', err);
      store.clear();
      return false;
    }
  };

  const logout = async () => {
    try {
      // バックエンド定義が /users/logoutone（小文字）なので合わせる
      await fetch(`${apiBase}/users/logoutone`, {
        method: 'POST',
        credentials: 'include',
        headers: store.accessToken
          ? { Authorization: `Bearer ${store.accessToken}` }
          : {},
      });
    } finally {
      store.clear();
    }
  };

  const refresh = async () => {
    const res = await fetch(`${apiBase}/users/refresh`, {
      method: 'POST',
      credentials: 'include',
    });
    if (!res.ok) throw new Error('refresh failed');
    const body: any = await safeJson(res);
    const token = pickToken(body);
    if (!token) throw new Error('no accessToken on refresh');
    store.setAccessToken(token);

    // 任意：/me 更新
    const meRes = await fetch(`${apiBase}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: { Authorization: `Bearer ${token}` },
    });
    if (meRes.ok) store.setMe(await safeJson(meRes));
  };

  return { login, logout, refresh };
};

// JSONでない応答でも落ちない
async function safeJson(res: Response) {
  try {
    return await res.json();
  } catch {
    return null;
  }
}
