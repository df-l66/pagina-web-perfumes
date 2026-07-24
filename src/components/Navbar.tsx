import { useState } from 'react';
import { ShoppingBag, Search, Menu, Heart, X } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cartCount, openCart } = useCart();
  const { wishlistCount } = useWishlist();
  const navigate = useNavigate();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/catalog?search=${encodeURIComponent(searchQuery.trim())}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  return (
    <>
      <nav className="fixed top-0 w-full z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16 sm:h-20">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="text-xl sm:text-2xl font-serif text-gray-100 tracking-wider">
                FRANCIAS JM
              </Link>
            </div>
            
            {/* Desktop Navigation Links */}
            <div className="hidden md:flex space-x-8">
              <Link to="/" className="text-sm font-medium text-gray-300 hover:text-amber-500 transition-colors">INICIO</Link>
              <Link to="/catalog" className="text-sm font-medium text-gray-300 hover:text-amber-500 transition-colors">CATÁLOGO</Link>
              <Link to="/collections" className="text-sm font-medium text-gray-300 hover:text-amber-500 transition-colors">COLECCIONES</Link>
              <Link to="/about" className="text-sm font-medium text-gray-300 hover:text-amber-500 transition-colors">NOSOTROS</Link>
            </div>

            <div className="flex items-center space-x-3 sm:space-x-6">
              <button 
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-gray-300 hover:text-amber-500 transition-colors p-1"
                aria-label="Buscar"
              >
                <Search className="w-5 h-5" />
              </button>

              <Link 
                to="/catalog?favorites=true" 
                className="text-gray-300 hover:text-rose-500 transition-colors relative p-1"
                title="Ver mis favoritos"
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'text-rose-500 fill-rose-500' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-rose-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                    {wishlistCount}
                  </span>
                )}
              </Link>

              <button 
                onClick={openCart}
                className="text-gray-300 hover:text-amber-500 transition-colors relative p-1"
                aria-label="Ver Carrito"
              >
                <ShoppingBag className="w-5 h-5" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1.5 bg-amber-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {cartCount}
                  </span>
                )}
              </button>

              {/* Mobile Menu Button */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="md:hidden text-gray-300 hover:text-amber-500 transition-colors p-1"
                aria-label="Menú"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Quick Search Bar */}
        {isSearchOpen && (
          <div className="border-t border-zinc-800 bg-zinc-900/95 px-4 py-3 animate-in slide-in-from-top duration-200">
            <form onSubmit={handleSearchSubmit} className="max-w-3xl mx-auto flex gap-2">
              <input
                type="text"
                placeholder="Buscar por marca, nombre o nota olfativa..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 text-white px-4 py-2 rounded-full text-sm focus:outline-none focus:border-amber-500"
                autoFocus
              />
              <button type="submit" className="bg-amber-600 text-white px-5 py-2 rounded-full text-sm font-medium hover:bg-amber-500 transition-colors">
                Buscar
              </button>
            </form>
          </div>
        )}

        {/* Mobile Navigation Drawer */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-zinc-800 bg-zinc-950/98 backdrop-blur-xl px-4 pt-4 pb-6 space-y-3 animate-in slide-in-from-top duration-200">
            <Link 
              to="/" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-gray-200 hover:text-amber-400 hover:bg-zinc-900 transition-all"
            >
              INICIO
            </Link>
            <Link 
              to="/catalog" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-gray-200 hover:text-amber-400 hover:bg-zinc-900 transition-all"
            >
              CATÁLOGO DE FRAGANCIAS
            </Link>
            <Link 
              to="/collections" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-gray-200 hover:text-amber-400 hover:bg-zinc-900 transition-all"
            >
              COLECCIONES EXCLUSIVAS
            </Link>
            <Link 
              to="/about" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="block px-3 py-2.5 rounded-xl text-base font-medium text-gray-200 hover:text-amber-400 hover:bg-zinc-900 transition-all"
            >
              NOSOTROS
            </Link>
          </div>
        )}
      </nav>
    </>
  );
}
