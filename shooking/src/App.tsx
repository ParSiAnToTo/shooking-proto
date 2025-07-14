import React from 'react';
import { products } from './data/products';
import ProductCard from './components/ProductCard';

function App() {
  return (
    <div className="min-h-screen bg-gray-100 px-4 py-6">
      <header className="mb-6">
        <h1 className="text-2xl font-bold mb-2">신발 상품 목록</h1>
        <p className="text-gray-600">현재 {products.length}개의 상품이 있습니다.</p>
      </header>

      <div className="grid grid-cols-2 gap-4">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}


export default App;
