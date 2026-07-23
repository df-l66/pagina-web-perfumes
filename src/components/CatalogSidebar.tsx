import { X } from 'lucide-react';

interface CatalogSidebarProps {
  isMobileFiltersOpen: boolean;
  setIsMobileFiltersOpen: (v: boolean) => void;
  TYPES: string[];
  LINEAS: string[];
  CATEGORIES: string[];
  FAMILIES: string[];
  BRANDS: string[];
  selectedTypes: string[];
  setSelectedTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedLineas: string[];
  setSelectedLineas: React.Dispatch<React.SetStateAction<string[]>>;
  selectedCategories: string[];
  setSelectedCategories: React.Dispatch<React.SetStateAction<string[]>>;
  selectedFamilies: string[];
  setSelectedFamilies: React.Dispatch<React.SetStateAction<string[]>>;
  selectedBrands: string[];
  setSelectedBrands: React.Dispatch<React.SetStateAction<string[]>>;
  maxPrice: number;
  setMaxPrice: (v: number) => void;
  toggleFilter: (current: string[], setter: React.Dispatch<React.SetStateAction<string[]>>, item: string) => void;
  filteredCount: number;
}

export function CatalogSidebar(props: CatalogSidebarProps) {
  const {
    isMobileFiltersOpen, setIsMobileFiltersOpen,
    TYPES, LINEAS, CATEGORIES, FAMILIES, BRANDS,
    selectedTypes, setSelectedTypes,
    selectedLineas, setSelectedLineas,
    selectedCategories, setSelectedCategories,
    selectedFamilies, setSelectedFamilies,
    selectedBrands, setSelectedBrands,
    maxPrice, setMaxPrice,
    toggleFilter, filteredCount
  } = props;

  return (
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

        {/* Línea */}
        <div className="border-b border-zinc-800 pb-6">
          <h3 className="text-sm font-medium text-amber-500 uppercase tracking-widest mb-4">Línea</h3>
          <div className="space-y-3">
            {LINEAS.map((linea) => (
              <label key={linea} className="flex items-center group cursor-pointer">
                <div className="relative flex items-center">
                  <input 
                    type="checkbox" 
                    checked={selectedLineas.includes(linea)}
                    onChange={() => toggleFilter(selectedLineas, setSelectedLineas, linea)}
                    className="peer h-5 w-5 cursor-pointer appearance-none rounded border border-zinc-700 bg-zinc-900 checked:border-amber-500 checked:bg-amber-500 focus:outline-none transition-all" 
                  />
                  <svg className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3.5 h-3.5 pointer-events-none opacity-0 peer-checked:opacity-100 text-zinc-950" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><polyline points="2.5 7 5.5 10 11.5 3"></polyline></svg>
                </div>
                <span className="ml-3 text-sm text-gray-400 group-hover:text-gray-200 transition-colors">{linea}</span>
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
            <span className="text-amber-500">\${maxPrice}</span>
          </div>
        </div>

        {isMobileFiltersOpen && (
          <button 
            onClick={() => setIsMobileFiltersOpen(false)}
            className="w-full bg-amber-500 hover:bg-amber-400 text-zinc-950 font-medium py-3 rounded transition-colors mt-8"
          >
            Ver Resultados ({filteredCount})
          </button>
        )}
      </div>
    </aside>
  );
}
