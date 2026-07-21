import { ShoppingBag, Search, Menu } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export function Navbar() {
  const { cartCount, openCart } = useCart();

  return (
    <nav className="fixed top-0 w-full z-50 bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex-shrink-0 flex items-center">
            <Link to="/" className="text-2xl font-serif text-gray-100 tracking-wider">
              FRANCIAS JM
            </Link>
          </div>
          <div className="hidden md:flex space-x-8">
            <Link to="/" className="text-sm font-medium text-gray-300 hover:text-amber-500 transition-colors">INICIO</Link>
            <Link to="/catalog" className="text-sm font-medium text-gray-300 hover:text-amber-500 transition-colors">CATÁLOGO</Link>
            <Link to="/collections" className="text-sm font-medium text-gray-300 hover:text-amber-500 transition-colors">COLECCIONES</Link>
            <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-amber-500 transition-colors">NOSOTROS</Link>
          </div>
          <div className="flex items-center space-x-6">
            <button className="text-gray-300 hover:text-amber-500 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button 
              onClick={openCart}
              className="text-gray-300 hover:text-amber-500 transition-colors relative"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-2 bg-amber-600 text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full">
                  {cartCount}
                </span>
              )}
            </button>
            <button className="md:hidden text-gray-300 hover:text-amber-500 transition-colors">
              <Menu className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
