import React, { useState } from 'react';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import Header from './components/Header';

import CardList from './modules/payments/components/CardList';
import CardForm from './modules/payments/components/CardForm';
import { CardProvider } from './modules/payments/contexts/CardContext';

type View = 'product' | 'cardList' | 'cardForm';

function App() {
    const [cartCount, setCartCount] = useState(0);
    const [view, setView] = useState<View>('product');

    const handleAddToCart = () => {
        setCartCount((prev) => prev + 1);
    };

    return (
        <CardProvider>
            <div className="pt-16 px-4">
                <Header cartCount={cartCount} />

                {view === 'product' && (
                    <div className="min-h-screen bg-gray-100 px-4 py-6">
                        <header className="mb-6">
                            <h1 className="text-2xl font-extrabold mb-2">신발 상품 목록</h1>
                            <p>현재 {products.length}개의 상품이 있습니다.</p>
                        </header>

                        <div className="grid grid-cols-2 gap-4">
                            {products.map((product) => (
                                <ProductCard
                                    key={product.id}
                                    product={product}
                                    onAdd={handleAddToCart}
                                    onBuy={() => setView('cardList')}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {view === 'cardList' && (
                    <CardList
                        onAdd={() => setView('cardForm')}
                        onBack={() => setView('product')}
                    />
                )}

                {view === 'cardForm' && (
                    <CardForm
                        onSubmit={() => setView('cardList')}
                        onCancel={() => setView('cardList')}
                    />
                )}
            </div>
        </CardProvider>
    );
}

export default App;
