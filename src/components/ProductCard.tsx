import { useState, useEffect } from 'react';
import { Star, Heart, ShoppingBag } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import type { Product } from '../types';
import { getQualityBadgeStyles, QUALITIES, type QualityType } from '../utils/quality';

interface ProductCardProps {
  product: Product;
  defaultQuality?: QualityType;
}

export function ProductCard({ product, defaultQuality }: ProductCardProps) {
  const { addToCart } = useCart();
  const { toggleWishlist, isWishlisted } = useWishlist();
  const [selectedQuality, setSelectedQuality] = useState<QualityType>(
    (defaultQuality || product.type || 'Original') as QualityType
  );

  useEffect(() => {
    if (defaultQuality) {
      setSelectedQuality(defaultQuality);
    }
  }, [defaultQuality]);

  const badgeStyle = getQualityBadgeStyles(selectedQuality);
  const liked = isWishlisted(product.id);

  return (
    <div className="group relative bg-zinc-900/30 rounded-2xl p-4 border border-zinc-800/50 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)] h-full flex flex-col">
      <div className="aspect-[4/5] relative overflow-hidden rounded-xl bg-zinc-800 mb-4">
        <img 
          src={product.image} 
          alt={product.name} 
          className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${product.outOfStock ? 'opacity-50 grayscale' : 'opacity-80 group-hover:opacity-100'}`}
        />
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1.5 items-start z-10">
          {product.isNew && (
            <span className="bg-amber-500 text-zinc-950 text-xs font-bold px-2 py-0.5 rounded shadow">NUEVO</span>
          )}
          {product.outOfStock && (
            <span className="bg-red-500/90 text-white text-xs font-bold px-2 py-0.5 rounded shadow">AGOTADO</span>
          )}
          <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border backdrop-blur-md shadow-sm uppercase tracking-wider ${badgeStyle}`}>
            {selectedQuality}
          </span>
        </div>

        {/* Rating */}
        <div className="absolute top-3 right-3 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full text-xs flex items-center text-amber-500 z-10">
          <Star className="w-3 h-3 fill-current mr-1" /> {product.rating}
        </div>
        
        {/* Quick Add Overlay */}
        {!product.outOfStock && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
            <button 
              onClick={(e) => {
                e.preventDefault();
                addToCart({ 
                  id: product.id, 
                  name: product.name, 
                  brand: product.brand, 
                  price: product.price, 
                  image: product.image, 
                  type: selectedQuality 
                });
              }}
              className="bg-white text-zinc-950 px-6 py-3 rounded-full font-medium hover:bg-amber-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300 shadow-xl"
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
          <button 
            type="button"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              toggleWishlist(product.id);
            }}
            className={`p-1.5 rounded-full transition-all duration-300 ${
              liked 
                ? 'text-rose-500 hover:text-rose-400 bg-rose-500/10' 
                : 'text-zinc-500 hover:text-rose-400 hover:bg-zinc-800/50'
            }`}
            title={liked ? "Quitar de mis favoritos" : "Guardar en mis favoritos"}
          >
            <Heart className={`w-5 h-5 transition-transform duration-300 ${liked ? 'fill-rose-500 scale-110' : 'hover:scale-110'}`} />
          </button>
        </div>

        {/* Quality Selector Pills */}
        <div className="mt-3 mb-2">
          <span className="text-[10px] text-zinc-400 font-medium block mb-1.5 uppercase tracking-wider">Calidad / Versión:</span>
          <div className="flex gap-1.5 bg-zinc-950/70 p-1 rounded-lg border border-zinc-800/80">
            {QUALITIES.map((q) => {
              const isActive = selectedQuality === q;
              return (
                <button
                  key={q}
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    setSelectedQuality(q);
                  }}
                  className={`flex-1 py-1 text-[11px] font-medium rounded-md transition-all ${
                    isActive 
                      ? q === 'Original'
                        ? 'bg-amber-500 text-zinc-950 font-bold shadow'
                        : q === '1.1'
                        ? 'bg-sky-500 text-zinc-950 font-bold shadow'
                        : 'bg-purple-500 text-white font-bold shadow'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
                  }`}
                >
                  {q}
                </button>
              );
            })}
          </div>
        </div>

        <div className="flex justify-between items-center mt-2">
          <div className="flex flex-wrap gap-1.5">
            <span className="text-[11px] text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-full">{product.family}</span>
            <span className="text-[11px] text-zinc-400 border border-zinc-800 px-2 py-0.5 rounded-full">{product.category}</span>
          </div>
          <span className="text-xs text-zinc-500 font-medium font-mono">({selectedQuality})</span>
        </div>

        {/* Mobile touch button for easy checkout */}
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault();
            addToCart({ 
              id: product.id, 
              name: product.name, 
              brand: product.brand, 
              price: product.price, 
              image: product.image, 
              type: selectedQuality 
            });
          }}
          disabled={product.outOfStock}
          className="w-full mt-3 py-2 bg-amber-500 hover:bg-amber-400 disabled:bg-zinc-800 disabled:text-zinc-500 text-zinc-950 font-bold text-xs rounded-xl transition-all shadow sm:hidden flex items-center justify-center gap-1.5"
        >
          <ShoppingBag className="w-3.5 h-3.5" />
          {product.outOfStock ? 'Agotado' : 'Añadir al Carrito'}
        </button>
      </div>
    </div>
  );
}
