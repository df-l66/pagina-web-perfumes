import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const COLLECTIONS = [
  { id: 1, name: 'Colección Verano', description: 'Cítricos y notas marinas', image: 'https://images.unsplash.com/photo-1512777576244-b846ac3d816f?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Esencias Nocturnas', description: 'Maderas profundas y especias', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Edición Limitada', description: 'Las creaciones más exclusivas', image: 'https://images.unsplash.com/photo-1583524505974-6facd53f4597?auto=format&fit=crop&q=80&w=800' },
];

export function Collections() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-16">
        <h1 className="text-4xl font-serif text-white tracking-tight">Colecciones Exclusivas</h1>
        <p className="mt-4 text-gray-400">Descubre grupos de fragancias diseñadas para momentos específicos.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {COLLECTIONS.map(collection => (
          <div key={collection.id} className="group relative h-96 overflow-hidden rounded-lg">
            <img 
              src={collection.image} 
              alt={collection.name}
              className="absolute inset-0 w-full h-full object-cover opacity-70 group-hover:scale-110 group-hover:opacity-100 transition-all duration-700" 
            />
            <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/40 to-transparent" />
            <div className="absolute bottom-0 left-0 p-8 w-full">
              <h3 className="text-2xl font-serif text-white mb-2">{collection.name}</h3>
              <p className="text-gray-300 mb-6">{collection.description}</p>
              <Link to="/catalog" className="inline-flex items-center text-amber-500 font-medium hover:text-amber-400 group/btn">
                Ver Colección <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
