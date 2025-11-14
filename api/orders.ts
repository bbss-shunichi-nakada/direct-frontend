import { useApi } from '~/composables/useApi';
export type Order = { id: number; total: number; createdAt: string };

export function useOrdersApi() {
  const { get, post } = useApi();
  return {
    create: (payload: {
      items: { productId: number; qty: number }[];
      paymentToken?: string;
    }) => post<{ orderId: number }>(`/orders/create`, payload),
    list: (cursor?: string, limit = 20) =>
      get<{ items: Order[]; nextCursor?: string }>(
        `/orders/list?limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`
      ),
    detail: (id: number) => get<Order>(`/orders/detail?id=${id}`),
  };
}
