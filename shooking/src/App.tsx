import React, { useState } from 'react';
import ProductCard from './components/ProductCard';
import Header from './components/Header';

import CardList from './modules/payments/components/CardList';
import CardForm from './modules/payments/components/CardForm';
import { CardProvider } from './modules/payments/contexts/CardContext';

import { useRecoilValue, useRecoilValueLoadable, useSetRecoilState } from 'recoil';
import { productsQuery } from './state/products';
import { cartCountSelector, cartState } from './state/cart';
import type { Product } from './mocks/data';
import CartPage from './components/CartPage';

type View = 'product' | 'cardList' | 'cardForm' | 'cart' ;


function App() {
    const [view, setView] = useState<View>('product');

    const productsLoadable = useRecoilValueLoadable(productsQuery);
    const setCart = useSetRecoilState(cartState);
    const cartCount = useRecoilValue(cartCountSelector);

    const addToCart = (product: Product) => {
        setCart(prev => {
        const hit = prev.find(i => i.id === product.id);
        if (hit) return prev.map(i => (i.id === product.id ? { ...i, qty: i.qty + 1 } : i));
        return [...prev, { ...product, qty: 1 }];
        });
    };

    return (
        <CardProvider>
        <div className="pt-16 px-4">
            <Header
                cartCount={cartCount}
                onCartClick={() => setView('cart')}
                isCartView={view === 'cart'}
                onBack={() => setView('product')}
            />

            {view === 'product' && (
            <div className="min-h-screen bg-gray-100 px-4 py-6">
                <header className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-extrabold mb-2">신발 상품 목록</h1>
                    {productsLoadable.state === 'hasValue' && (
                    <p>현재 {productsLoadable.contents.length}개의 상품이 있습니다.</p>
                    )}
                </div>
                </header>

                {productsLoadable.state === 'loading' && <div>상품 불러오는 중...</div>}
                {productsLoadable.state === 'hasError' && <div>상품을 불러오지 못했어요.</div>}
                {productsLoadable.state === 'hasValue' && (
                <div className="grid grid-cols-2 gap-4">
                    {productsLoadable.contents.map((product: Product) => (
                    <ProductCard
                        key={product.id}
                        product={product}
                        onAdd={() => addToCart(product)}
                        onBuy={() => setView('cardList')}
                    />
                    ))}
                </div>
                )}
            </div>
            )}

            {view === 'cart' && (
            <CartPage onBack={() => setView('product')} onCheckout={() => setView('cardList')} />
            )}

            {view === 'cardList' && (
            <CardList onAdd={() => setView('cardForm')} onBack={() => setView('product')} />
            )}

            {view === 'cardForm' && (
            <CardForm onSubmit={() => setView('cardList')} onCancel={() => setView('cardList')} />
            )}
        </div>
        </CardProvider>
    );
}

export default App;
