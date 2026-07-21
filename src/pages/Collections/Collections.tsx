import { useState } from 'react';
import { ArrowLeft, ArrowRight, Star, Heart } from 'lucide-react';
import { useCart } from '../../context/CartContext';

const CATALOG_PRODUCTS = [
  { id: 1, name: 'Noir Absolu', brand: 'Yves Saint Laurent', price: 125, category: 'Hombre', family: 'Amaderado', rating: 4.8, isNew: false, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Velvet Rose', brand: 'Tom Ford', price: 295, category: 'Mujer', family: 'Floral', rating: 4.9, isNew: false, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Oud Wood', brand: 'Creed', price: 350, category: 'Unisex', family: 'Amaderado', rating: 5.0, isNew: false, outOfStock: true, type: 'Original', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'Ocean Mist', brand: 'Acqua Di Parma', price: 180, category: 'Unisex', family: 'Acuático', rating: 4.5, isNew: false, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600' },
  { id: 5, name: 'Midnight', brand: 'Dior', price: 140, category: 'Mujer', family: 'Floral', rating: 4.7, isNew: false, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1523293115678-0246247965a9?auto=format&fit=crop&q=80&w=600' },
  { id: 6, name: 'L\'Homme', brand: 'Prada', price: 110, category: 'Hombre', family: 'Cítrico', rating: 4.6, isNew: false, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=600' },
  { id: 7, name: 'Lumière Dorée', brand: 'Maison Francis', price: 320, category: 'Mujer', family: 'Floral', rating: 5.0, isNew: true, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1595532542520-50280ebdbd3c?auto=format&fit=crop&q=80&w=600' },
  { id: 8, name: 'Santal Sublime', brand: 'Guerlain', price: 210, category: 'Unisex', family: 'Amaderado', rating: 4.8, isNew: true, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600' },
  { id: 9, name: 'Rose Prick', brand: 'Tom Ford', price: 350, category: 'Mujer', family: 'Floral', rating: 4.7, isNew: true, outOfStock: true, type: 'Original', image: 'https://images.unsplash.com/photo-1583445013765-46c20c4a6772?auto=format&fit=crop&q=80&w=600' },
  
  // Productos 1.1
  { id: 10, name: 'Inspiración Aventus', brand: 'Boutique Alternativa', price: 45, category: 'Hombre', family: 'Cítrico', rating: 4.8, isNew: false, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=600' },
  { id: 11, name: 'Esencia Baccarat', brand: 'Boutique Alternativa', price: 50, category: 'Unisex', family: 'Amaderado', rating: 4.9, isNew: true, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=600' },
  { id: 12, name: 'Clon Tuscan Leather', brand: 'Boutique Alternativa', price: 48, category: 'Unisex', family: 'Amaderado', rating: 4.7, isNew: false, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&q=80&w=600' },
  { id: 13, name: 'Inspiración J\'adore', brand: 'Boutique Alternativa', price: 40, category: 'Mujer', family: 'Floral', rating: 4.6, isNew: false, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&q=80&w=600' },
  { id: 14, name: 'Esencia Sauvage', brand: 'Boutique Alternativa', price: 45, category: 'Hombre', family: 'Amaderado', rating: 4.9, isNew: false, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1592945403408-2dc21b5e8071?auto=format&fit=crop&q=80&w=600' },
  { id: 15, name: 'Clon Bleu', brand: 'Boutique Alternativa', price: 42, category: 'Hombre', family: 'Acuático', rating: 4.8, isNew: false, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600' },
];

const COLLECTIONS = [
  { 
    id: 'verano', 
    name: 'Esencias de Verano', 
    description: 'Cítricos vibrantes y notas marinas que capturan la frescura del océano para los días soleados.', 
    image: 'https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&q=80&w=1200',
    productIds: [4, 6, 10, 15]
  },
  { 
    id: 'nocturna', 
    name: 'Colección Nocturna', 
    description: 'Maderas profundas y especias cautivadoras diseñadas para destacar en la noche.', 
    image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=1200',
    productIds: [1, 2, 3, 8, 11, 12, 14]
  },
  { 
    id: 'exclusiva', 
    name: 'Edición Limitada', 
    description: 'Las creaciones más exclusivas y codiciadas del mundo de la alta perfumería.', 
    image: 'https://images.unsplash.com/photo-1583524505974-6facd53f4597?auto=format&fit=crop&q=80&w=1200',
    productIds: [3, 7, 9]
  },
  { 
    id: 'alternativa', 
    name: 'Selección 1.1', 
    description: 'Inspiraciones perfectas de alta calidad (1.1) ideales para el uso diario sin comprometer el estilo.', 
    image: 'https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200',
    productIds: [10, 11, 12, 13, 14, 15]
  },
];

export function Collections() {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);
  const { addToCart } = useCart();

  const activeCollection = COLLECTIONS.find(c => c.id === activeCollectionId);
  
  const activeProducts = activeCollection 
    ? CATALOG_PRODUCTS.filter(p => activeCollection.productIds.includes(p.id))
    : [];

  return (
    <div className="bg-zinc-950 min-h-screen pt-20 pb-24">
      {/* Listado General de Colecciones */}
      {!activeCollection && (
        <>
          <div className="text-center mb-16 pt-12 px-4">
            <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight">Colecciones Exclusivas</h1>
            <p className="mt-4 text-gray-400 max-w-2xl mx-auto text-lg">Descubre agrupaciones únicas de fragancias diseñadas para momentos específicos, personalidades y ocasiones.</p>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              {COLLECTIONS.map(collection => (
                <div 
                  key={collection.id} 
                  onClick={() => setActiveCollectionId(collection.id)}
                  className="group relative h-[400px] overflow-hidden rounded-2xl cursor-pointer shadow-xl shadow-black/50"
                >
                  <img 
                    src={collection.image} 
                    alt={collection.name}
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:scale-105 group-hover:opacity-80 transition-all duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-transparent opacity-90" />
                  
                  {/* Decorative frame on hover */}
                  <div className="absolute inset-4 border border-white/0 group-hover:border-white/10 rounded-xl transition-all duration-500 z-10 pointer-events-none" />

                  <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full z-20">
                    <h3 className="text-3xl font-serif text-white mb-3 group-hover:text-amber-400 transition-colors">{collection.name}</h3>
                    <p className="text-gray-300 mb-6 text-sm md:text-base line-clamp-2 md:line-clamp-none max-w-md">{collection.description}</p>
                    <div className="inline-flex items-center text-amber-500 font-medium tracking-wide text-sm uppercase">
                      Explorar Colección <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Vista de Detalle de Colección */}
      {activeCollection && (
        <div className="animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {/* Hero de la Colección */}
          <div className="relative h-[50vh] min-h-[400px] w-full flex items-center justify-center overflow-hidden">
            <img 
              src={activeCollection.image} 
              alt={activeCollection.name}
              className="absolute inset-0 w-full h-full object-cover opacity-40 scale-105" 
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-zinc-950/80 to-zinc-950" />
            
            <button 
              onClick={() => setActiveCollectionId(null)}
              className="absolute top-8 left-4 md:left-12 flex items-center text-gray-400 hover:text-white transition-colors group z-20"
            >
              <ArrowLeft className="w-5 h-5 mr-2 group-hover:-translate-x-1 transition-transform" />
              Volver a colecciones
            </button>

            <div className="relative z-10 text-center px-4 max-w-3xl mt-12">
              <span className="text-amber-500 text-sm font-bold tracking-[0.2em] uppercase mb-4 block">Colección</span>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 drop-shadow-lg">{activeCollection.name}</h2>
              <p className="text-xl text-gray-300 font-light leading-relaxed drop-shadow">{activeCollection.description}</p>
            </div>
          </div>

          {/* Grid de Productos */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-4">
              <h3 className="text-2xl font-serif text-white">Perfumes en esta colección</h3>
              <span className="text-zinc-500">{activeProducts.length} resultados</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {activeProducts.map((product) => (
                <div key={product.id} className="group relative bg-zinc-900/30 rounded-2xl p-4 border border-zinc-800/50 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(245,158,11,0.05)]">
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
                          onClick={() => addToCart({ id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image, type: product.type })}
                          className="bg-white text-zinc-950 px-6 py-3 rounded-full font-medium hover:bg-amber-500 hover:text-white transition-all transform translate-y-4 group-hover:translate-y-0 duration-300"
                        >
                          Añadir al Carrito
                        </button>
                      </div>
                    )}
                  </div>
                  
                  <div className="px-1">
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
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full">{product.family}</span>
                        <span className="text-xs text-zinc-500 border border-zinc-800 px-2 py-0.5 rounded-full">{product.category}</span>
                      </div>
                    </div>
                    <div className="mt-4">
                      <span className="text-xl text-gray-200 font-light">${product.price}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
}
