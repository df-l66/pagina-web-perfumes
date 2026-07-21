import { useState, useMemo } from 'react';
import { Filter, ChevronDown, Star, Heart, Search, X } from 'lucide-react';
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
  
  // Agregando productos 1.1
  { id: 10, name: 'Inspiración Aventus', brand: 'Boutique Alternativa', price: 45, category: 'Hombre', family: 'Cítrico', rating: 4.8, isNew: false, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1585386959984-a4155224a1ad?auto=format&fit=crop&q=80&w=600' },
  { id: 11, name: 'Esencia Baccarat', brand: 'Boutique Alternativa', price: 50, category: 'Unisex', family: 'Amaderado', rating: 4.9, isNew: true, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1547887538-e3a2f32cb1cc?auto=format&fit=crop&q=80&w=600' },
  { id: 12, name: 'Clon Tuscan Leather', brand: 'Boutique Alternativa', price: 48, category: 'Unisex', family: 'Amaderado', rating: 4.7, isNew: false, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&q=80&w=600' },
  { id: 13, name: 'Inspiración J\'adore', brand: 'Boutique Alternativa', price: 40, category: 'Mujer', family: 'Floral', rating: 4.6, isNew: false, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1563170351-be82bc888aa4?auto=format&fit=crop&q=80&w=600' },
  { id: 14, name: 'Esencia Sauvage', brand: 'Boutique Alternativa', price: 45, category: 'Hombre', family: 'Amaderado', rating: 4.9, isNew: false, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1592945403408-2dc21b5e8071?auto=format&fit=crop&q=80&w=600' },
  { id: 15, name: 'Clon Bleu', brand: 'Boutique Alternativa', price: 42, category: 'Hombre', family: 'Acuático', rating: 4.8, isNew: false, outOfStock: false, type: '1.1', image: 'https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=600' },
  
  // Agregando productos Preparadas
  { id: 16, name: 'Preparada Light Blue', brand: 'Artesanal', price: 25, category: 'Mujer', family: 'Acuático', rating: 4.5, isNew: true, outOfStock: false, type: 'Preparada', image: 'https://images.unsplash.com/photo-1590736704728-f4730bb30770?auto=format&fit=crop&q=80&w=600' },
  { id: 17, name: 'Preparada Invictus', brand: 'Artesanal', price: 25, category: 'Hombre', family: 'Amaderado', rating: 4.6, isNew: false, outOfStock: false, type: 'Preparada', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
  { id: 18, name: 'Preparada Good Girl', brand: 'Artesanal', price: 28, category: 'Mujer', family: 'Floral', rating: 4.8, isNew: false, outOfStock: true, type: 'Preparada', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
];

const BRANDS = Array.from(new Set(CATALOG_PRODUCTS.map(p => p.brand))).sort();
const CATEGORIES = ['Hombre', 'Mujer', 'Unisex'];
const FAMILIES = Array.from(new Set(CATALOG_PRODUCTS.map(p => p.family))).sort();
const TYPES = ['Original', '1.1', 'Preparada'];

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'newest';

export function Catalog() {
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedFamilies, setSelectedFamilies] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState<number>(500);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [visibleCount, setVisibleCount] = useState(18);
  const [searchQuery, setSearchQuery] = useState('');
  const [isSortOpen, setIsSortOpen] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const { addToCart } = useCart();

  // Funciones auxiliares para manejar los filtros
  const toggleFilter = (list: string[], setList: (l: string[]) => void, value: string) => {
    if (list.includes(value)) {
      setList(list.filter(item => item !== value));
    } else {
      setList([...list, value]);
    }
    setVisibleCount(18);
  };

  const filteredProducts = useMemo(() => {
    let result = CATALOG_PRODUCTS;

    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(q) || 
        p.brand.toLowerCase().includes(q)
      );
    }
    if (selectedCategories.length > 0) {
      result = result.filter(p => selectedCategories.includes(p.category));
    }
    if (selectedBrands.length > 0) {
      result = result.filter(p => selectedBrands.includes(p.brand));
    }
    if (selectedFamilies.length > 0) {
      result = result.filter(p => selectedFamilies.includes(p.family));
    }
    if (selectedTypes.length > 0) {
      result = result.filter(p => selectedTypes.includes(p.type));
    }
    
    result = result.filter(p => p.price <= maxPrice);

    // Ordenamiento
    if (sortBy === 'price-asc') {
      result = [...result].sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      result = [...result].sort((a, b) => b.price - a.price);
    } else if (sortBy === 'newest') {
      result = [...result].sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
    }

    return result;
  }, [selectedCategories, selectedBrands, selectedFamilies, selectedTypes, maxPrice, sortBy, searchQuery]);

  const visibleProducts = filteredProducts.slice(0, visibleCount);

  return (
    <div className="bg-zinc-950 min-h-screen pt-20 pb-24">
      {/* Hero Header */}
      <div className="bg-zinc-900/50 border-b border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
          <h1 className="text-4xl md:text-5xl font-serif text-white tracking-tight mb-4">Catálogo Completo</h1>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg">Encuentra la fragancia que define tu estilo. Explora nuestra colección de las casas de perfumes más prestigiosas del mundo y nuestras exclusivas inspiraciones.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between pb-6 gap-4">
          {/* Barra de Búsqueda */}
          <div className="relative w-full md:w-96">
            <input 
              type="text" 
              placeholder="Buscar perfume o marca..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-full py-2.5 pl-12 pr-4 text-white placeholder-zinc-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-colors"
            />
            <Search className="absolute left-4 top-3 h-5 w-5 text-zinc-500" />
          </div>

          <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end">
            <p className="text-zinc-400 text-sm hidden md:block">{filteredProducts.length} resultados</p>
            
            {/* Sort Selector */}
            <div className="relative inline-block text-left z-20">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="group inline-flex items-center justify-center text-sm font-medium text-gray-300 hover:text-white bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-full transition-colors"
              >
                {sortBy === 'featured' && 'Destacados'}
                {sortBy === 'price-asc' && 'Precio: Menor a Mayor'}
                {sortBy === 'price-desc' && 'Precio: Mayor a Menor'}
                {sortBy === 'newest' && 'Más Recientes'}
                <ChevronDown className="ml-2 -mr-1 h-4 w-4 text-gray-500 group-hover:text-gray-300" />
              </button>
              
              {isSortOpen && (
                <div className="absolute right-0 mt-2 w-48 origin-top-right rounded-xl bg-zinc-900 border border-zinc-800 shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none overflow-hidden">
                  <div className="py-1">
                    {[
                      { id: 'featured', label: 'Destacados' },
                      { id: 'price-asc', label: 'Precio: Menor a Mayor' },
                      { id: 'price-desc', label: 'Precio: Mayor a Menor' },
                      { id: 'newest', label: 'Más Recientes' },
                    ].map((option) => (
                      <button
                        key={option.id}
                        onClick={() => { setSortBy(option.id as SortOption); setIsSortOpen(false); setVisibleCount(9); }}
                        className={`block w-full text-left px-4 py-2 text-sm transition-colors ${sortBy === option.id ? 'bg-amber-500/10 text-amber-500' : 'text-gray-300 hover:bg-zinc-800'}`}
                      >
                        {option.label}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Filters Button */}
            <button 
              onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
              className="md:hidden flex items-center justify-center text-gray-300 hover:text-white bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-full"
            >
              <Filter className="h-4 w-4 mr-2" />
              Filtros
            </button>
          </div>
        </div>

        <section className="pt-6">
          <div className="flex gap-x-8">
            
            {/* Filters Sidebar (Desktop) */}
            <aside className={`${isMobileFiltersOpen ? 'fixed inset-0 z-50 bg-zinc-950 p-6 overflow-y-auto' : 'hidden'} md:block md:w-64 flex-shrink-0 transition-all`}>
              {isMobileFiltersOpen && (
                <div className="flex justify-between items-center mb-6 md:hidden">
                  <h2 className="text-xl font-serif text-white">Filtros</h2>
                  <button onClick={() => setIsMobileFiltersOpen(false)} className="text-gray-400 hover:text-white">
                    <X className="w-6 h-6" />
                  </button>
                </div>
              )}

              <div className="space-y-8">
                {/* Tipo / Calidad */}
                <div className="border-b border-zinc-800 pb-6">
                  <h3 className="text-sm font-medium text-amber-500 uppercase tracking-widest mb-4">Tipo / Calidad</h3>
                  <div className="space-y-3">
                    {TYPES.map((type) => (
                      <label key={type} className="flex items-center group cursor-pointer">
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            checked={selectedTypes.includes(type)}
                            onChange={() => toggleFilter(selectedTypes, setSelectedTypes, type)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-700 bg-zinc-900 checked:border-amber-500 checked:bg-amber-500 focus:outline-none transition-all" 
                          />
                          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-zinc-950" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2.5 7 5.5 10 11.5 3"></polyline></svg>
                        </div>
                        <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Género */}
                <div className="border-b border-zinc-800 pb-6">
                  <h3 className="text-sm font-medium text-amber-500 uppercase tracking-widest mb-4">Género</h3>
                  <div className="space-y-3">
                    {CATEGORIES.map((category) => (
                      <label key={category} className="flex items-center group cursor-pointer">
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            checked={selectedCategories.includes(category)}
                            onChange={() => toggleFilter(selectedCategories, setSelectedCategories, category)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-700 bg-zinc-900 checked:border-amber-500 checked:bg-amber-500 focus:outline-none transition-all" 
                          />
                          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-zinc-950" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2.5 7 5.5 10 11.5 3"></polyline></svg>
                        </div>
                        <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{category}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Familia Olfativa */}
                <div className="border-b border-zinc-800 pb-6">
                  <h3 className="text-sm font-medium text-amber-500 uppercase tracking-widest mb-4">Familia Olfativa</h3>
                  <div className="space-y-3">
                    {FAMILIES.map((family) => (
                      <label key={family} className="flex items-center group cursor-pointer">
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            checked={selectedFamilies.includes(family)}
                            onChange={() => toggleFilter(selectedFamilies, setSelectedFamilies, family)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-700 bg-zinc-900 checked:border-amber-500 checked:bg-amber-500 focus:outline-none transition-all" 
                          />
                          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-zinc-950" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2.5 7 5.5 10 11.5 3"></polyline></svg>
                        </div>
                        <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{family}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Marcas */}
                <div className="border-b border-zinc-800 pb-6">
                  <h3 className="text-sm font-medium text-amber-500 uppercase tracking-widest mb-4">Marcas</h3>
                  <div className="space-y-3">
                    {BRANDS.map((brand) => (
                      <label key={brand} className="flex items-center group cursor-pointer">
                        <div className="relative flex items-center">
                          <input 
                            type="checkbox" 
                            checked={selectedBrands.includes(brand)}
                            onChange={() => toggleFilter(selectedBrands, setSelectedBrands, brand)}
                            className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-700 bg-zinc-900 checked:border-amber-500 checked:bg-amber-500 focus:outline-none transition-all" 
                          />
                          <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-zinc-950" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2.5 7 5.5 10 11.5 3"></polyline></svg>
                        </div>
                        <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{brand}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                {/* Rango de Precio */}
                <div className="pb-6">
                  <h3 className="text-sm font-medium text-amber-500 uppercase tracking-widest mb-4">Precio Máximo</h3>
                  <input 
                    type="range" 
                    min="10" 
                    max="500" 
                    step="10"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full accent-amber-500 bg-zinc-800 h-2 rounded-lg appearance-none cursor-pointer" 
                  />
                  <div className="flex justify-between text-sm text-gray-300 mt-4 font-medium">
                    <span>$10</span>
                    <span className="text-amber-500">${maxPrice}</span>
                  </div>
                </div>

                {isMobileFiltersOpen && (
                  <button 
                    onClick={() => setIsMobileFiltersOpen(false)}
                    className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium py-3 rounded transition-colors mt-8"
                  >
                    Ver Resultados ({filteredProducts.length})
                  </button>
                )}
              </div>
            </aside>

            {/* Product grid */}
            <div className="flex-1">
              {visibleProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-zinc-800/50 rounded-2xl bg-zinc-900/20">
                  <Search className="w-12 h-12 text-zinc-700 mb-4" />
                  <h3 className="text-2xl font-serif text-white mb-2">No hay resultados</h3>
                  <p className="text-zinc-500">Intenta ajustar los filtros o la búsqueda para encontrar lo que buscas.</p>
                  <button 
                    onClick={() => {
                      setSelectedBrands([]);
                      setSelectedCategories([]);
                      setSelectedFamilies([]);
                      setSelectedTypes([]);
                      setMaxPrice(500);
                      setSearchQuery('');
                    }}
                    className="mt-6 text-amber-500 hover:text-amber-400 font-medium underline underline-offset-4"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {visibleProducts.map((product) => (
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

                  {/* Load More */}
                  {visibleCount < filteredProducts.length && (
                    <div className="mt-16 flex justify-center">
                      <button 
                        onClick={() => setVisibleCount(prev => prev + 6)}
                        className="inline-flex items-center px-8 py-3 border-2 border-zinc-800 hover:border-amber-500 text-white hover:text-amber-500 font-medium rounded-full transition-colors"
                      >
                        Cargar más perfumes
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
            
          </div>
        </section>
      </div>
    </div>
  );
}
