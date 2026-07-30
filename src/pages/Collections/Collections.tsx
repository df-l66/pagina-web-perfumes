import { useState } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { CATALOG_PRODUCTS } from '../../data/perfumes';
import { ProductCard } from '../../components/ProductCard';

const COLLECTIONS = [
  { 
    id: 'gym', 
    name: 'Gym & Deportivo', 
    description: '10 fragancias energizantes con notas cítricas, acuáticas, frescas y aromáticas ideales para mantener la frescura durante los entrenamientos.', 
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&q=80&w=1200',
    curatedIds: [165, 187, 136, 175, 181, 256, 290, 133, 283, 284],
    familyFilter: ['Cítrico', 'Acuático', 'Fresco', 'Aromático', 'Verde', 'Marino']
  },
  { 
    id: 'nocturnas', 
    name: 'Fragancias Nocturnas', 
    description: '10 esencias profundas de maderas oscuras, ámbar, especias y notas orientales diseñadas para destacar en la noche.', 
    image: 'https://images.unsplash.com/photo-1519501025264-65ba15a82390?auto=format&fit=crop&q=80&w=1200',
    curatedIds: [336, 173, 254, 278, 152, 188, 280, 314, 163, 164],
    familyFilter: ['Amaderado', 'Oriental', 'Especiado', 'Cuero', 'Oud', 'Tabaco', 'Incienso']
  },
  { 
    id: 'fiestas', 
    name: 'Fiestas & Celebraciones', 
    description: '10 aromas llamativos, dulces, frutales y de alta proyección ideales para destacar y adueñarte del ambiente de fiesta.', 
    image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&q=80&w=1200',
    curatedIds: [182, 184, 186, 118, 120, 122, 153, 162, 352, 134],
    familyFilter: ['Dulce', 'Frutal', 'Cítrico', 'Gourmand', 'Vainilla', 'Oriental']
  },
  { 
    id: 'sexy', 
    name: 'Sexy & Seducción', 
    description: '10 mezclas embriagadoras de gourmand, almizcle sensual, florales cálidos y acordes ambarados que despiertan el deseo.', 
    image: 'https://images.unsplash.com/photo-1518199266791-5375a83190b7?auto=format&fit=crop&q=80&w=1200',
    curatedIds: [137, 138, 158, 159, 211, 315, 205, 130, 338, 100],
    familyFilter: ['Gourmand', 'Vainilla', 'Almizcle', 'Ámbar', 'Dulce', 'Floral', 'Oriental']
  },
];

export function Collections() {
  const [activeCollectionId, setActiveCollectionId] = useState<string | null>(null);

  const activeCollection = COLLECTIONS.find(c => c.id === activeCollectionId);
  
  const getCollectionProducts = (col: typeof COLLECTIONS[0]) => {
    const products: typeof CATALOG_PRODUCTS = [];
    const usedIds = new Set<number>();
    
    // Add curated items first
    if (col.curatedIds && col.curatedIds.length > 0) {
      col.curatedIds.forEach(id => {
        const p = CATALOG_PRODUCTS.find(item => item.id === id);
        if (p && !usedIds.has(p.id)) {
          products.push(p);
          usedIds.add(p.id);
        }
      });
    }

    // Fill up to 10 with family match if any curated product is missing
    if (products.length < 10 && col.familyFilter.length > 0) {
      const allOtherCuratedIds = new Set(
        COLLECTIONS.filter(c => c.id !== col.id).flatMap(c => c.curatedIds || [])
      );

      const fallback = CATALOG_PRODUCTS.filter(p => 
        !usedIds.has(p.id) &&
        !allOtherCuratedIds.has(p.id) &&
        col.familyFilter.some(f => p.family.toLowerCase().includes(f.toLowerCase()))
      );

      for (const item of fallback) {
        if (products.length >= 10) break;
        products.push(item);
        usedIds.add(item.id);
      }
    }

    return products;
  };

  const collectionProducts = activeCollection ? getCollectionProducts(activeCollection) : [];

  return (
    <div className="min-h-screen bg-zinc-950 pt-20">
      {/* Hero Header */}
      <div className="relative py-16 md:py-24 border-b border-zinc-800/50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-amber-500/10 via-purple-500/5 to-transparent pointer-events-none" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <span className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-3 block">Curaduría por Ocasión</span>
          <h1 className="text-4xl md:text-6xl font-serif text-white mb-6">Colecciones Exclusivas</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">
            Encuentra la fragancia perfecta adaptada a tu estilo de vida, momentos especiales y cada ocasión del día.
          </p>
        </div>
      </div>

      {!activeCollection ? (
        /* Grid de Colecciones principales */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {COLLECTIONS.map((collection) => {
              const count = getCollectionProducts(collection).length;
              return (
                <div 
                  key={collection.id}
                  onClick={() => setActiveCollectionId(collection.id)}
                  className="group relative h-[420px] rounded-3xl overflow-hidden cursor-pointer border border-zinc-800/80 hover:border-amber-500/50 transition-all duration-500 shadow-2xl"
                >
                  <img 
                    src={collection.image} 
                    alt={collection.name} 
                    className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
                  
                  <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                    <div className="flex items-center justify-between mb-2">
                      <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs uppercase tracking-widest font-bold px-3 py-1 rounded-full backdrop-blur-md">
                        Top {count} Fragancias
                      </span>
                    </div>
                    
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-3 group-hover:text-amber-300 transition-colors">
                      {collection.name}
                    </h2>
                    
                    <p className="text-gray-300 text-sm md:text-base mb-6 line-clamp-2 max-w-lg">
                      {collection.description}
                    </p>
                    
                    <div className="inline-flex items-center text-amber-500 font-medium text-sm group-hover:translate-x-2 transition-transform duration-300">
                      Ver Selección Top 10
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        /* Vista de Detalle de Colección Seleccionada */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 animate-in fade-in duration-300">
          <button 
            onClick={() => setActiveCollectionId(null)}
            className="inline-flex items-center text-gray-400 hover:text-amber-500 transition-colors mb-8 group font-medium"
          >
            <ArrowLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
            Volver a todas las colecciones
          </button>

          <div className="relative rounded-3xl overflow-hidden mb-12 border border-zinc-800">
            <div className="h-64 md:h-80 relative">
              <img 
                src={activeCollection.image} 
                alt={activeCollection.name} 
                className="w-full h-full object-cover opacity-50"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
              
              <div className="absolute inset-0 p-8 md:p-12 flex flex-col justify-end">
                <span className="text-amber-400 text-xs font-bold uppercase tracking-widest mb-2 font-mono">
                  Selección Especial de 10 Perfumes
                </span>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-3">
                  {activeCollection.name}
                </h2>
                <p className="text-gray-300 text-base md:text-lg max-w-2xl font-light">
                  {activeCollection.description}
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-8">
              <h3 className="text-2xl font-serif text-white">Top 10 Fragancias Recomendadas</h3>
              <span className="text-sm text-zinc-400">
                Mostrando {collectionProducts.length} de 10
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
              {collectionProducts.map((product) => (
                <div key={product.id} className="h-full">
                  <ProductCard product={product as any} />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
