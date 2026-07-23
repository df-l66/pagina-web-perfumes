import { Star, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const { addToCart } = useCart();

  return (
    <div className="group relative bg-zinc-900/30 rounded-2xl p-4 border border-zinc-800/50 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] h-full flex flex-col">
      <div className="aspect-[4/5] relative overflow-hidden rounded-xl bg-zinc-800 mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${product.outOfStock ? 'opacity-50 grayscale' : 'opacity-80 group-hover:opacity-100'}`}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <span className="bg-amber-500 text-zinc-950 text-xs font-bold px-2 py-1 rounded">NUEVO</span>
          )}
          {product.outOfStock && (
            <span className="bg-red-500/90 text-white text-xs font-bold px-2 py-1 rounded">AGOTADO</span>
          )}
          {product.type !== 'Original' && (
            <span className="bg-zinc-800/90 text-amber-500 border border-amber-500/30 text-xs font-bold px-2 py-1 rounded shadow-sm">
              {product.type.toUpperCase()}
            </span>
          )}
        </div>
        {/* Rating */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full text-xs flex items-center text-amber-500">
          <Star className="w-3 h-3 fill-current mr-1" /> {product.rating}
        </div>
        
        {/* Quick Add Overlay */}
        {!product.outOfStock && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <button 
              onClick={(e) => {
                e.preventDefault();
                addToCart({ id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image, type: product.type });
              }}
              className="bg-white text-zinc-950 px-6 py-3 rounded-full font-medium hover:bg-amber-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
            >
              Añadir al Carrito
            </button>
          </div>
        )}
      </div>
      
      <div className="px-1 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-1">
          <div>
            <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">{product.brand}</span>
            <h3 className="text-xl font-serif text-white mt-1 group-hover:text-amber-400 transition-colors line-clamp-1">{product.name}</h3>
          </div>
          <button className="text-zinc-600 hover:text-amber-500 transition-colors p-1">
            <Heart className="w-5 h-5" />
          </button>
        </div>
        <div className="flex justify-between items-center mt-3">
          <div className="flex flex-wrap gap-2">
            <span className="text-xs text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full">{product.family}</span>
            <span className="text-xs text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full">{product.category}</span>
          </div>
        </div>
        <div className="mt-auto pt-4">
          <span className="text-xl text-gray-200 font-light">\${product.price}</span>
        </div>
      </div>
    </div>
  );
}
