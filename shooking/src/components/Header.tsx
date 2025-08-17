import React from 'react';
import { FaShoppingBag as RawFaShoppingBag } from 'react-icons/fa';

type HeaderProps = {
    cartCount: number;
    onCartClick: () => void;
    isCartView: boolean;
    onBack?: () => void;
};

const FaShoppingBag = RawFaShoppingBag as React.FC<{ className?: string }>;

const Header: React.FC<HeaderProps> = ({ cartCount, onCartClick, isCartView, onBack }) => {
    return (
        <header className="w-full flex items-center px-4 py-5 bg-black shadow-md fixed top-0 z-50">
            {isCartView ? (
                <button
                    type="button"
                    onClick={onBack}
                    aria-label="뒤로가기"
                    className="text-white text-2xl"
                >
                    ←
                </button>
            ) : (
                <div className="w-full flex justify-end pr-4">
                    <button
                        type="button"
                        onClick={onCartClick}
                        aria-label="장바구니 보기"
                        className="relative outline-none focus:ring-2 focus:ring-white/60 rounded-full"
                    >
                        <FaShoppingBag className="text-3xl text-white" />
                        <span className="absolute -bottom-2 -right-1 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
                            {cartCount}
                        </span>
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
