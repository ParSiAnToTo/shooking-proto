import { FaShoppingBag as RawFaShoppingBag } from 'react-icons/fa';

interface HeaderProps {
  cartCount : number;
}

const FaShoppingBag = RawFaShoppingBag as React.FC<{ className?: string }>;

const Header = ({cartCount} : HeaderProps) => {
  return (
    <header className="w-full flex justify-end items-center pr-8 py-5 bg-black shadow-md fixed top-0 z-50">
      <div className="relative mr-4">
        <FaShoppingBag className="text-3xl text-white" />
        <span className="absolute -bottom-2 -right-1 bg-white text-black text-xs w-5 h-5 rounded-full flex items-center justify-center">
          {cartCount}
        </span>
      </div>
    </header>
  );
};

export default Header;