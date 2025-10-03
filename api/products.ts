import { useApi } from '~/composables/useApi';
export type Product = {
  id: number;
  name: string;
  price: number;
  imageUrl?: string;
};

export function useProductsApi() {
  const { get } = useApi();
  return {
    list: (cursor?: string, limit = 20) =>
      get<{ items: Product[]; nextCursor?: string }>(
        `/products/list?limit=${limit}${cursor ? `&cursor=${cursor}` : ''}`
      ),
    detail: (id: number) => get<Product>(`/products/detail?id=${id}`), // ルータがパス/クエリのどちらかで調整
  };
}
