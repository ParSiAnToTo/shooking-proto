import { selector } from 'recoil';
import type { Product } from '../mocks/data';

export const productsQuery = selector<Product[]>({
    key: 'products/query',
    get: async () => {
        const res = await fetch('/api/products');
        if (!res.ok) throw new Error('Failed to load products');
        return (await res.json()) as Product[];
    },
});
