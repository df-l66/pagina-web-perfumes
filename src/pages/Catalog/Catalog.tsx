import { useState } from 'react';
import { Filter, ChevronDown, Search } from 'lucide-react';
import { CATALOG_PRODUCTS } from '../../data/perfumes';
import { ProductCard } from '../../components/ProductCard';
import { CatalogSidebar } from '../../components/CatalogSidebar';
import { useCatalogFilters, type SortOption } from '../../hooks/useCatalogFilters';

const BRANDS = Array.from(new Set(CATALOG_PRODUCTS.map((p: any) => p.brand))).sort();
const CATEGORIES = ['Hombre', 'Mujer', 'Unisex'];
const FAMILIES = Array.from(new Set(CATALOG_PRODUCTS.map((p: any) => p.family))).sort();
const TYPES = ['Original', '1.1', 'Preparada'];
const LINEAS = ['Internacional', 'Árabe'];

export function Catalog() {
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  const [isSortOpen, setIsSortOpen] = useState(false);
  
  const filters = useCatalogFilters({ products: CATALOG_PRODUCTS as any[] });
  
  const visibleProducts = filters.filteredProducts.slice(0, filters.visibleCount);

  return (
    <div className="min-h-screen bg-zinc-950 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl md:text-5xl font-serif text-white mb-4">Catálogo de Fragancias</h1>
            <p className="text-gray-400 max-w-2xl">
              Descubre nuestra extensa colección de perfumes. Desde los clásicos más codiciados hasta las últimas tendencias olfativas, encuentra la esencia que hable por ti.
            </p>
          </div>
          
          {/* Controls Bar */}
          <div className="flex flex-wrap items-center gap-4 md:gap-6">
            <div className="relative flex-1 md:flex-none min-w-[200px]">
              <input 
                type="text" 
                placeholder="Buscar por nombre o marca..." 
                value={filters.searchQuery}
                onChange={(e) => filters.setSearchQuery(e.target.value)}
                className="w-full bg-zinc-900 border border-zinc-800 text-white px-4 py-2.5 rounded-full pl-11 focus:outline-none focus:border-amber-500 transition-colors"
              />
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            </div>

            <div className="relative">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center text-sm text-gray-300 hover:text-white bg-zinc-900 border border-zinc-800 px-4 py-2.5 rounded-full transition-colors"
              >
                Ordenar por: 
                <span className="text-amber-500 ml-2 font-medium">
                  {filters.sortBy === 'featured' && 'Destacados'}
                  {filters.sortBy === 'price-asc' && 'Precio: Menor a Mayor'}
                  {filters.sortBy === 'price-desc' && 'Precio: Mayor a Menor'}
                  {filters.sortBy === 'newest' && 'Más Recientes'}
                </span>
                <ChevronDown className="h-4 w-4 ml-2" />
              </button>
              
              {isSortOpen && (
                <div className="absolute right-0 top-full mt-2 w-56 bg-zinc-900 border border-zinc-800 rounded-xl shadow-xl z-20 overflow-hidden">
                  <div className="py-2">
                    {[
                      { value: 'featured', label: 'Destacados' },
                      { value: 'newest', label: 'Más Recientes' },
                      { value: 'price-asc', label: 'Precio: Menor a Mayor' },
                      { value: 'price-desc', label: 'Precio: Mayor a Menor' },
                    ].map((option) => (
                      <button
                        key={option.value}
                        onClick={() => {
                          filters.setSortBy(option.value as SortOption);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-amber-500/10 transition-colors ${
                          filters.sortBy === option.value ? 'text-amber-500 bg-amber-500/5' : 'text-gray-300'
                        }`}
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
            
            <CatalogSidebar 
              isMobileFiltersOpen={isMobileFiltersOpen}
              setIsMobileFiltersOpen={setIsMobileFiltersOpen}
              TYPES={TYPES}
              LINEAS={LINEAS}
              CATEGORIES={CATEGORIES}
              FAMILIES={FAMILIES}
              BRANDS={BRANDS}
              selectedTypes={filters.selectedTypes}
              setSelectedTypes={filters.setSelectedTypes}
              selectedLineas={filters.selectedLineas}
              setSelectedLineas={filters.setSelectedLineas}
              selectedCategories={filters.selectedCategories}
              setSelectedCategories={filters.setSelectedCategories}
              selectedFamilies={filters.selectedFamilies}
              setSelectedFamilies={filters.setSelectedFamilies}
              selectedBrands={filters.selectedBrands}
              setSelectedBrands={filters.setSelectedBrands}
              maxPrice={filters.maxPrice}
              setMaxPrice={filters.setMaxPrice}
              toggleFilter={filters.toggleFilter}
              filteredCount={filters.filteredProducts.length}
            />

            {/* Product grid */}
            <div className="flex-1">
              {visibleProducts.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-20 px-4 text-center border border-zinc-800/50 rounded-2xl bg-zinc-900/20">
                  <Search className="w-12 h-12 text-zinc-700 mb-4" />
                  <h3 className="text-2xl font-serif text-white mb-2">No hay resultados</h3>
                  <p className="text-zinc-500">Intenta ajustar los filtros o la búsqueda para encontrar lo que buscas.</p>
                  <button 
                    onClick={filters.clearFilters}
                    className="mt-6 text-amber-500 hover:text-amber-400 font-medium underline underline-offset-4"
                  >
                    Limpiar todos los filtros
                  </button>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 lg:gap-8">
                    {visibleProducts.map((product) => (
                      <div key={product.id} className="h-full">
                        <ProductCard product={product as any} />
                      </div>
                    ))}
                  </div>

                  {filters.visibleCount < filters.filteredProducts.length && (
                    <div className="mt-16 text-center">
                      <p className="text-sm text-gray-500 mb-4">
                        Mostrando {visibleProducts.length} de {filters.filteredProducts.length} productos
                      </p>
                      <button 
                        onClick={() => filters.setVisibleCount(prev => prev + 18)}
                        className="px-8 py-3 border border-amber-500/50 text-amber-500 hover:bg-amber-500 hover:text-zinc-950 font-medium rounded-full transition-all duration-300"
                      >
                        Cargar más fragancias
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
