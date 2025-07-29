import React, { useState } from 'react';
import { Product } from '../data/products';

interface ProductProps {
  product: Product;
  onAdd: () => void;
  onBuy: () => void;
}

const ProductCard: React.FC<ProductProps> = ({ product, onAdd, onBuy }) => {
  const [ isAdded, setIsAdded ] = useState(false);

  const handleAddClick = () => {
    if (!isAdded){
      setIsAdded(true);
      onAdd();
    }
  }

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
        
        <button 
          onClick={handleAddClick}
          className={`text-xs py-1 px-3 rounded-xl transition-colors duration-200 ${
            isAdded ? 'bg-[#F2F2F2] text-black' : 'bg-black text-white'
          }`}
        >
          {isAdded ? '담김!' : '담기'}
        </button>
        <button
          className="text-xs text-black bg-[#FFEF64] py-1 px-3 rounded-xl"
          onClick={onBuy}
        >
          구매
        </button>
      </div>
    </div>
  );
};

export default ProductCard;