import { atom, selector } from 'recoil';
import type { Product } from '../mocks/data';

export type CartItem = Product & { qty: number };

export const cartState = atom<CartItem[]>({
    key: 'cart/items',
    default: [],
});

export const cartCountSelector = selector<number>({
    key: 'cart/count',
    get: ({ get }) => get(cartState).reduce((sum, i) => sum + i.qty, 0),
});

export const cartSubtotalSelector = selector<number>({
    key: 'cart/subtotal',
    get: ({ get }) =>
        get(cartState).reduce((sum, i) => sum + i.price * i.qty, 0),
});

export const shippingFeeSelector = selector<number>({
    key: 'cart/shipping',
    get: ({ get }) => (get(cartSubtotalSelector) >= 100_000 ? 0 : 3000),
});

export const cartTotalSelector = selector<number>({
    key: 'cart/total',
    get: ({ get }) => get(cartSubtotalSelector) + get(shippingFeeSelector),
});
