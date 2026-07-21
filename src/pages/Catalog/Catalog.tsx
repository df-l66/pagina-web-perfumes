import { Filter, ChevronDown } from 'lucide-react';

const CATALOG_PRODUCTS = [
  { id: 1, name: 'Noir Absolu', brand: 'Yves Saint Laurent', price: 125, category: 'Hombre', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Velvet Rose', brand: 'Tom Ford', price: 295, category: 'Mujer', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Oud Wood', brand: 'Creed', price: 350, category: 'Unisex', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600' },
  { id: 4, name: 'Ocean Mist', brand: 'Acqua Di Parma', price: 180, category: 'Unisex', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600' },
  { id: 5, name: 'Midnight', brand: 'Dior', price: 140, category: 'Mujer', image: 'https://images.unsplash.com/photo-1523293115678-0246247965a9?auto=format&fit=crop&q=80&w=600' },
  { id: 6, name: 'L\'Homme', brand: 'Prada', price: 110, category: 'Hombre', image: 'https://images.unsplash.com/photo-1615529328331-f8917597711f?auto=format&fit=crop&q=80&w=600' },
];

export function Catalog() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-baseline justify-between border-b border-zinc-800 pb-6 pt-10">
        <h1 className="text-4xl font-serif text-white tracking-tight">Catálogo de Fragancias</h1>
        <div className="flex items-center">
          <div className="relative inline-block text-left">
            <button className="group inline-flex justify-center text-sm font-medium text-gray-400 hover:text-white">
              Ordenar por
              <ChevronDown className="ml-1 -mr-1 h-5 w-5 flex-shrink-0 text-gray-500 group-hover:text-gray-400" />
            </button>
          </div>
          <button className="p-2 ml-4 text-gray-400 hover:text-gray-200 sm:hidden">
            <Filter className="h-5 w-5" />
          </button>
        </div>
      </div>

      <section className="pt-6 pb-24">
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
          
          {/* Filters (Sidebar) */}
          <form className="hidden lg:block">
            <h3 className="sr-only">Categorías</h3>
            
            <div className="border-b border-zinc-800 py-6">
              <h3 className="text-sm font-medium text-gray-200">Género</h3>
              <div className="pt-4 space-y-4">
                {['Hombre', 'Mujer', 'Unisex'].map((option) => (
                  <div key={option} className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-600 focus:ring-amber-600 focus:ring-offset-zinc-900" />
                    <label className="ml-3 text-sm text-gray-400">{option}</label>
                  </div>
                ))}
              </div>
            </div>

            <div className="border-b border-zinc-800 py-6">
              <h3 className="text-sm font-medium text-gray-200">Marcas</h3>
              <div className="pt-4 space-y-4">
                {['Dior', 'Tom Ford', 'Creed', 'Yves Saint Laurent'].map((brand) => (
                  <div key={brand} className="flex items-center">
                    <input type="checkbox" className="h-4 w-4 rounded border-zinc-700 bg-zinc-900 text-amber-600 focus:ring-amber-600 focus:ring-offset-zinc-900" />
                    <label className="ml-3 text-sm text-gray-400">{brand}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="py-6">
              <h3 className="text-sm font-medium text-gray-200 mb-4">Rango de Precio</h3>
              <input type="range" className="w-full accent-amber-600" />
              <div className="flex justify-between text-xs text-gray-500 mt-2">
                <span>$50</span>
                <span>$500+</span>
              </div>
            </div>
          </form>

          {/* Product grid */}
          <div className="lg:col-span-3">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-y-10 gap-x-6 xl:gap-x-8">
              {CATALOG_PRODUCTS.map((product) => (
                <div key={product.id} className="group relative">
                  <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-zinc-900 lg:aspect-none group-hover:opacity-75 lg:h-80 border border-zinc-800">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="h-full w-full object-cover object-center lg:h-full lg:w-full opacity-80"
                    />
                  </div>
                  <div className="mt-4 flex justify-between">
                    <div>
                      <h3 className="text-sm text-gray-400">
                        <a href="#">
                          <span aria-hidden="true" className="absolute inset-0" />
                          {product.brand}
                        </a>
                      </h3>
                      <p className="mt-1 text-lg font-serif text-gray-100">{product.name}</p>
                    </div>
                    <p className="text-lg font-medium text-amber-500">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
        </div>
      </section>
    </div>
  );
}
