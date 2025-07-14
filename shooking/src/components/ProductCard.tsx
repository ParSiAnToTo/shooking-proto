import React from 'react';
import { Product } from '../data/products';

interface ProductProps {
  product: Product;
}

const ProductCard: React.FC<ProductProps> = ({ product }) => {
  return (
    <div className="bg-white rounded-xl shadow-md overflow-hidden">
      <img
        src={product.imageUrl}
        alt={product.description}
        className="w-full h-48 object-cover rounded-t-xl"
      />
      <div className="p-4">
        <h3 className="text-lg font-semibold">{product.brand}</h3>
        <p className="text-s text-gray-500 mb-2">{product.description}</p>
        <p className="text-base font-bold mb-2">{product.price.toLocaleString()}원</p>
        <button className="bg-black text-white text-xs py-1 px-3 rounded-xl">
          담기
        </button>
      </div>
    </div>
  );
};

export default ProductCard;