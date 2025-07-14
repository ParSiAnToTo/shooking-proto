import React, { useState } from 'react';
import { products } from './data/products';
import ProductCard from './components/ProductCard';
import Header from './components/Header';

function App() {
  
  const [cartCount, setCartCount] = useState(0);

  const handleAddToCart = () => {
    setCartCount(prev => prev + 1);
  };

  return (
    <div className="pt-16 px-4">
      <Header cartCount={cartCount}/>
      <div className="min-h-screen bg-gray-100 px-4 py-6">
        <header className="mb-6">
          <h1 className="text-2xl font-extrabold mb-2">신발 상품 목록</h1>
          <p>현재 {products.length}개의 상품이 있습니다.</p>
        </header>

        <div className="grid grid-cols-2 gap-4">
          {products.map(product => (
            <ProductCard key={product.id} 
            product={product}
            onAdd={handleAddToCart} />
          ))}
        </div>
      </div>
    </div>
  );
}


export default App;
