import { Link } from 'react-router-dom';
import { ArrowRight, Star } from 'lucide-react';

const FEATURED_PRODUCTS = [
  { id: 1, name: 'Noir Absolu', brand: 'Yves Saint Laurent', price: 125, rating: 4.8, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Velvet Rose', brand: 'Tom Ford', price: 295, rating: 4.9, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Oud Wood', brand: 'Creed', price: 350, rating: 5.0, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600' },
];

export function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="relative h-[85vh] flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1615397323869-3221b6a71cb0?auto=format&fit=crop&q=80&w=2000" 
            alt="Perfume Hero" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/50 to-transparent" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <span className="text-amber-500 font-semibold tracking-widest text-sm uppercase">Nueva Colección 2026</span>
            <h1 className="mt-4 text-5xl md:text-7xl font-serif text-white leading-tight">
              Descubre Tu <br/> <span className="italic text-gray-300">Esencia Única</span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-xl">
              Explora nuestra selección curada de fragancias de lujo. Diseñadas para dejar una impresión inolvidable en cada paso.
            </p>
            <div className="mt-10">
              <Link 
                to="/catalog" 
                className="inline-flex items-center px-8 py-4 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded text-lg transition-colors group"
              >
                Explorar Catálogo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-end mb-12">
            <div>
              <h2 className="text-3xl font-serif text-white">Colección Destacada</h2>
              <p className="mt-2 text-gray-400">Las fragancias más exclusivas de la temporada</p>
            </div>
            <Link to="/catalog" className="hidden md:flex items-center text-amber-500 hover:text-amber-400 font-medium">
              Ver todos <ArrowRight className="ml-1 w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {FEATURED_PRODUCTS.map((product) => (
              <div key={product.id} className="group relative bg-zinc-900/50 backdrop-blur-sm rounded border border-zinc-800/50 overflow-hidden hover:border-amber-900/50 transition-colors">
                <div className="aspect-[4/5] relative overflow-hidden bg-zinc-900">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-500"
                  />
                  <div className="absolute top-4 right-4 bg-black/60 backdrop-blur-md px-2 py-1 rounded text-xs flex items-center text-amber-500">
                    <Star className="w-3 h-3 fill-current mr-1" /> {product.rating}
                  </div>
                </div>
                <div className="p-6">
                  <span className="text-sm text-gray-500 font-medium">{product.brand}</span>
                  <h3 className="mt-1 text-xl font-serif text-white">{product.name}</h3>
                  <div className="mt-4 flex justify-between items-center">
                    <span className="text-lg text-gray-300">${product.price}</span>
                    <button className="text-sm text-amber-500 hover:text-amber-400 font-medium border-b border-transparent hover:border-amber-400 transition-colors">
                      Añadir
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
