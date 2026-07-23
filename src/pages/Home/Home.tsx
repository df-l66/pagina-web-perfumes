import { Link } from 'react-router-dom';
import { ArrowRight, Sparkles, Wind, Flame, Droplets, Quote } from 'lucide-react';
import { ProductCard } from '../../components/ProductCard';
import { SurpriseQuiz } from '../../components/SurpriseQuiz';

const NEW_ARRIVALS = [
  { id: 101, name: 'Lumière Dorée', brand: 'Maison Francis', price: 320, rating: 5.0, category: 'Mujer', family: 'Floral', isNew: true, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
  { id: 102, name: 'Santal Sublime', brand: 'Guerlain', price: 210, rating: 4.8, category: 'Unisex', family: 'Amaderado', isNew: true, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600' },
  { id: 103, name: 'Oud Imperial', brand: 'Dior', price: 280, rating: 4.9, category: 'Hombre', family: 'Amaderado', isNew: true, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600' },
  { id: 104, name: 'Rose Prick', brand: 'Tom Ford', price: 350, rating: 4.7, category: 'Mujer', family: 'Floral', isNew: true, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
];

const BEST_SELLERS = [
  { id: 1, name: 'Noir Absolu', brand: 'Yves Saint Laurent', price: 125, rating: 4.8, category: 'Hombre', family: 'Amaderado', isNew: false, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Velvet Rose', brand: 'Tom Ford', price: 295, rating: 4.9, category: 'Mujer', family: 'Floral', isNew: false, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1595532542520-50280ebdbd3c?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Aventus', brand: 'Creed', price: 435, rating: 5.0, category: 'Unisex', family: 'Cítrico', isNew: false, outOfStock: false, type: 'Original', image: 'https://images.unsplash.com/photo-1615397323869-3221b6a71cb0?auto=format&fit=crop&q=80&w=600' },
];

const COLLECTIONS = [
  { id: 1, name: 'Amaderados', icon: Flame, description: 'Cálidos y misteriosos', image: 'https://images.unsplash.com/photo-1608528577891-eb0559d18cb3?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Florales', icon: Sparkles, description: 'Elegancia natural', image: 'https://images.unsplash.com/photo-1490750967868-88cb4eca82e1?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Cítricos', icon: Wind, description: 'Frescura vibrante', image: 'https://images.unsplash.com/photo-1513682121497-80211f36a790?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Acuáticos', icon: Droplets, description: 'Brisa del océano', image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=800' },
];

export function Home() {
  return (
    <div className="min-h-screen bg-[url('/fondo.jpeg')] bg-cover bg-center bg-fixed">
      {/* Overlay to ensure text readability across the whole page */}
      <div className="fixed inset-0 bg-zinc-950/80 pointer-events-none z-0" />
      
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center z-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/50 to-zinc-950/30" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex flex-col items-center text-center">
          <div className="max-w-3xl flex flex-col items-center">
            <div className="inline-flex items-center space-x-2 border border-amber-500/30 bg-amber-500/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 font-medium tracking-widest text-xs uppercase">Nueva Colección 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
              Descubre Tu <br/> <span className="italic text-gray-300 font-light">Esencia Única</span>
            </h1>
            <p className="mt-6 text-lg text-gray-300 max-w-xl font-light">
              Explora nuestra selección curada de fragancias de lujo. Diseñadas para dejar una impresión inolvidable en cada paso.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/catalog" 
                className="inline-flex items-center justify-center px-8 py-4 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded text-lg transition-all hover:scale-105 group"
              >
                Explorar Catálogo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={() => document.getElementById('surprise-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center justify-center px-8 py-4 bg-zinc-900/50 backdrop-blur-md border border-white/20 hover:border-white hover:bg-white/10 text-white font-medium rounded text-lg transition-all"
              >
                Sorpréndeme
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lo Más Nuevo */}
      <section className="py-24 relative overflow-hidden z-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-900/10 blur-[100px] rounded-full" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-4">
            <div>
              <span className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-2 block">Lanzamientos</span>
              <h2 className="text-4xl md:text-5xl font-serif text-white">Lo Más Nuevo</h2>
            </div>
            <Link to="/catalog" className="flex items-center text-gray-400 hover:text-amber-500 transition-colors group">
              Ver todos los lanzamientos <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {NEW_ARRIVALS.map((product) => (
              <div key={product.id} className="h-full">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colecciones */}
      <section className="py-20 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-serif text-white mb-4">Familias Olfativas</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Explora nuestras colecciones clasificadas por sus notas dominantes, diseñadas para cada tipo de personalidad y ocasión.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {COLLECTIONS.map((col) => {
              const Icon = col.icon;
              return (
                <div key={col.id} className="relative h-80 rounded-xl overflow-hidden group cursor-pointer">
                  <img src={col.image} alt={col.name} className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-40 transition-opacity duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
                  <div className="absolute inset-0 p-6 flex flex-col justify-end">
                    <Icon className="w-8 h-8 text-amber-500 mb-3 transform group-hover:-translate-y-2 transition-transform duration-300" />
                    <h3 className="text-2xl font-serif text-white mb-1">{col.name}</h3>
                    <p className="text-gray-300 text-sm opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300">{col.description}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Frase Inspiracional Parallax */}
      <section className="relative py-32 flex items-center justify-center overflow-hidden z-10">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black/40" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Quote className="w-12 h-12 text-amber-500/50 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-serif text-white font-light leading-relaxed italic">
            "El perfume es la llave de nuestros recuerdos, una poesía que se respira en silencio."
          </h2>
        </div>
      </section>

      {/* Más Vendidas */}
      <section className="py-24 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-2">Clásicos Atemporales</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Los Más Vendidos</h2>
            <div className="w-24 h-1 bg-amber-800 mt-6 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {BEST_SELLERS.map((product, index) => (
              <div key={product.id} className="relative">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-950 text-amber-500 rounded-full flex items-center justify-center font-serif text-xl border border-amber-500/20 z-20 shadow-lg">
                  #{index + 1}
                </div>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sorpréndeme */}
      <SurpriseQuiz />
    </div>
  );
}
