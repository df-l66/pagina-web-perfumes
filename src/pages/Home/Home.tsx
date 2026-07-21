import { Link } from 'react-router-dom';
import { ArrowRight, Star, Sparkles, Wind, Flame, Droplets, Heart, Quote } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useCart } from '../../context/CartContext';

const NEW_ARRIVALS = [
  { id: 101, name: 'Lumière Dorée', brand: 'Maison Francis', price: 320, rating: 5.0, image: 'https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&q=80&w=600' },
  { id: 102, name: 'Santal Sublime', brand: 'Guerlain', price: 210, rating: 4.8, image: 'https://images.unsplash.com/photo-1588405748880-12d1d2a59f75?auto=format&fit=crop&q=80&w=600' },
  { id: 103, name: 'Oud Imperial', brand: 'Dior', price: 280, rating: 4.9, image: 'https://images.unsplash.com/photo-1629198688000-71f23e745b6e?auto=format&fit=crop&q=80&w=600' },
  { id: 104, name: 'Rose Prick', brand: 'Tom Ford', price: 350, rating: 4.7, image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?auto=format&fit=crop&q=80&w=600' },
];

const BEST_SELLERS = [
  { id: 1, name: 'Noir Absolu', brand: 'Yves Saint Laurent', price: 125, rating: 4.8, image: 'https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=600' },
  { id: 2, name: 'Velvet Rose', brand: 'Tom Ford', price: 295, rating: 4.9, image: 'https://images.unsplash.com/photo-1595532542520-50280ebdbd3c?auto=format&fit=crop&q=80&w=600' },
  { id: 3, name: 'Aventus', brand: 'Creed', price: 435, rating: 5.0, image: 'https://images.unsplash.com/photo-1615397323869-3221b6a71cb0?auto=format&fit=crop&q=80&w=600' },
];

const COLLECTIONS = [
  { id: 1, name: 'Amaderados', icon: Flame, description: 'Cálidos y misteriosos', image: 'https://images.unsplash.com/photo-1608528577891-eb0559d18cb3?auto=format&fit=crop&q=80&w=800' },
  { id: 2, name: 'Florales', icon: Sparkles, description: 'Elegancia natural', image: 'https://images.unsplash.com/photo-1490750967868-88cb4eca82e1?auto=format&fit=crop&q=80&w=800' },
  { id: 3, name: 'Cítricos', icon: Wind, description: 'Frescura vibrante', image: 'https://images.unsplash.com/photo-1513682121497-80211f36a790?auto=format&fit=crop&q=80&w=800' },
  { id: 4, name: 'Acuáticos', icon: Droplets, description: 'Brisa del océano', image: 'https://images.unsplash.com/photo-1518063319789-7217e6706b04?auto=format&fit=crop&q=80&w=800' },
];

export function Home() {
  const [surpriseStep, setSurpriseStep] = useState(0); 
  const [quizAnswers, setQuizAnswers] = useState({ env: '', vibe: '' });
  const { addToCart } = useCart();

  useEffect(() => {
    if (surpriseStep === 1) {
      const timer = setTimeout(() => {
        setSurpriseStep(2);
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [surpriseStep]);

  const handleAnswer = (question: 'env' | 'vibe', answer: string) => {
    setQuizAnswers(prev => ({ ...prev, [question]: answer }));
    if (question === 'env') {
      setSurpriseStep(3);
    } else {
      setSurpriseStep(4); // Mostrar cargando final
      setTimeout(() => setSurpriseStep(5), 2500); // Mostrar resultado
    }
  };

  const getRecommendedPerfume = () => {
    if (quizAnswers.env === 'noche' && quizAnswers.vibe === 'intenso') return BEST_SELLERS[0]; // Noir Absolu
    if (quizAnswers.env === 'dia' && quizAnswers.vibe === 'fresco') return NEW_ARRIVALS[1]; // Santal Sublime
    if (quizAnswers.vibe === 'dulce') return NEW_ARRIVALS[0]; // Lumiere Doree
    return BEST_SELLERS[1]; // Velvet Rose
  };

  return (
    <div className="bg-zinc-950 min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1615397323869-3221b6a71cb0?auto=format&fit=crop&q=80&w=2000" 
            alt="Perfume Hero" 
            className="w-full h-full object-cover opacity-40 scale-105 animate-[pulse_20s_ease-in-out_infinite_alternate]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-950/70 to-transparent" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <div className="inline-flex items-center space-x-2 border border-amber-500/30 bg-amber-500/10 backdrop-blur-md px-4 py-1.5 rounded-full mb-6">
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span className="text-amber-500 font-medium tracking-widest text-xs uppercase">Nueva Colección 2026</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-serif text-white leading-tight">
              Descubre Tu <br/> <span className="italic text-gray-300 font-light">Esencia Única</span>
            </h1>
            <p className="mt-6 text-lg text-gray-400 max-w-xl font-light">
              Explora nuestra selección curada de fragancias de lujo. Diseñadas para dejar una impresión inolvidable en cada paso.
            </p>
            <div className="mt-10 flex gap-4">
              <Link 
                to="/catalog" 
                className="inline-flex items-center px-8 py-4 bg-amber-700 hover:bg-amber-600 text-white font-medium rounded text-lg transition-all hover:scale-105 group"
              >
                Explorar Catálogo
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <button 
                onClick={() => document.getElementById('surprise-section')?.scrollIntoView({ behavior: 'smooth' })}
                className="inline-flex items-center px-8 py-4 bg-transparent border border-white/20 hover:border-white hover:bg-white/5 text-white font-medium rounded text-lg transition-all"
              >
                Sorpréndeme
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Lo Más Nuevo */}
      <section className="py-24 bg-zinc-950 relative overflow-hidden">
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
              <div key={product.id} className="group cursor-pointer">
                <div className="relative aspect-[3/4] overflow-hidden rounded bg-zinc-900 mb-4">
                  <img src={product.image} alt={product.name} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-6">
                    <button className="bg-white text-zinc-950 px-6 py-2 rounded-full font-medium hover:bg-amber-500 hover:text-white transition-colors transform translate-y-4 group-hover:translate-y-0 duration-300">
                      Vista Rápida
                    </button>
                  </div>
                  <div className="absolute top-3 left-3 bg-amber-500 text-white text-xs font-bold px-2 py-1 rounded">
                    NUEVO
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-serif text-white group-hover:text-amber-500 transition-colors">{product.name}</h3>
                  <p className="text-gray-500 text-sm mt-1">{product.brand}</p>
                  <p className="text-gray-300 font-medium mt-2">${product.price}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Colecciones */}
      <section className="py-20 bg-zinc-900/50">
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
      <section className="relative py-32 flex items-center justify-center overflow-hidden bg-zinc-950">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=2000" 
            alt="Parallax Background" 
            className="w-full h-full object-cover opacity-20 fixed top-0"
            style={{ transform: 'translateZ(-1px) scale(2)' }}
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
          <Quote className="w-12 h-12 text-amber-500/50 mx-auto mb-8" />
          <h2 className="text-3xl md:text-5xl font-serif text-white font-light leading-relaxed italic">
            "El perfume es la llave de nuestros recuerdos, una poesía que se respira en silencio."
          </h2>
        </div>
      </section>

      {/* Más Vendidas */}
      <section className="py-24 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center mb-16 text-center">
            <span className="text-amber-500 text-sm font-medium tracking-widest uppercase mb-2">Clásicos Atemporales</span>
            <h2 className="text-4xl md:text-5xl font-serif text-white">Los Más Vendidos</h2>
            <div className="w-24 h-1 bg-amber-800 mt-6 rounded" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {BEST_SELLERS.map((product, index) => (
              <div key={product.id} className="group relative bg-zinc-900/30 rounded-2xl p-4 border border-zinc-800/50 hover:border-amber-500/50 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_0_30px_rgba(245,158,11,0.1)]">
                <div className="absolute -top-4 -left-4 w-12 h-12 bg-amber-950 text-amber-500 rounded-full flex items-center justify-center font-serif text-xl border border-amber-500/20 z-20">
                  #{index + 1}
                </div>
                <div className="aspect-square relative overflow-hidden rounded-xl bg-zinc-800 mb-6">
                  <img 
                    src={product.image} 
                    alt={product.name} 
                    className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-black/40 backdrop-blur-md px-2 py-1 rounded-full text-xs flex items-center text-amber-500">
                    <Star className="w-3 h-3 fill-current mr-1" /> {product.rating}
                  </div>
                </div>
                <div className="px-2">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">{product.brand}</span>
                      <h3 className="text-2xl font-serif text-white mt-1 group-hover:text-amber-400 transition-colors">{product.name}</h3>
                    </div>
                    <button className="text-zinc-500 hover:text-amber-500 transition-colors">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>
                  <div className="flex justify-between items-center mt-6">
                    <span className="text-xl text-gray-300 font-light">${product.price}</span>
                    <button 
                      onClick={() => addToCart({ id: product.id, name: product.name, brand: product.brand, price: product.price, image: product.image })}
                      className="px-4 py-2 text-sm bg-white text-zinc-950 rounded hover:bg-amber-500 hover:text-white font-medium transition-colors"
                    >
                      Añadir al Carrito
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Sorpréndeme */}
      <section id="surprise-section" className="py-24 bg-gradient-to-b from-zinc-950 to-zinc-900 border-t border-zinc-800/50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-zinc-900/50 backdrop-blur-lg border border-white/10 rounded-3xl p-10 md:p-16 relative overflow-hidden group">
            <div className="absolute -inset-1 bg-gradient-to-r from-amber-600 to-purple-600 rounded-3xl blur opacity-20 group-hover:opacity-40 transition duration-1000 group-hover:duration-200" />
            
            <div className="relative z-10 min-h-[300px] flex flex-col justify-center items-center">
              
              {surpriseStep === 0 && (
                <div className="animate-[fadeIn_0.5s_ease-out]">
                  <Sparkles className="w-12 h-12 text-amber-500 mx-auto mb-6 animate-pulse" />
                  <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">¿No sabes qué elegir?</h2>
                  <p className="text-gray-400 text-lg mb-10 max-w-2xl mx-auto">
                    Deja que nuestro algoritmo olfativo encuentre tu fragancia ideal respondiendo dos simples preguntas.
                  </p>
                  <button 
                    onClick={() => setSurpriseStep(1)}
                    className="inline-flex items-center px-10 py-5 bg-white text-zinc-950 hover:bg-amber-500 hover:text-white font-medium rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_40px_rgba(245,158,11,0.3)]"
                  >
                    Descubrir mi Esencia
                  </button>
                </div>
              )}

              {(surpriseStep === 1 || surpriseStep === 4) && (
                <div className="bg-zinc-950/80 rounded-2xl p-8 border border-amber-500/20 animate-[fadeIn_0.5s_ease-out] w-full max-w-md mx-auto">
                  <h3 className="text-2xl text-white font-serif mb-4">
                    {surpriseStep === 1 ? 'Iniciando análisis sensorial...' : 'Calculando tu esencia ideal...'}
                  </h3>
                  <div className="w-full bg-zinc-800 rounded-full h-2 mb-4 overflow-hidden">
                    <div className="bg-amber-500 h-2 rounded-full animate-[progress_2.5s_ease-in-out_forwards]" style={{ width: '0%' }} />
                  </div>
                  <p className="text-sm text-gray-500">
                    {surpriseStep === 1 ? 'Preparando preguntas clave...' : 'Analizando tu perfil...'}
                  </p>
                </div>
              )}

              {surpriseStep === 2 && (
                <div className="animate-[fadeIn_0.5s_ease-out] w-full">
                  <h2 className="text-3xl font-serif text-white mb-8">¿Cuándo usarías esta fragancia?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
                    <button 
                      onClick={() => handleAnswer('env', 'dia')}
                      className="p-8 rounded-2xl border border-zinc-700 bg-zinc-900/50 hover:border-amber-500 hover:bg-amber-500/10 transition-all group"
                    >
                      <Wind className="w-10 h-10 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl text-white font-serif mb-2">Para el Día</h3>
                      <p className="text-sm text-gray-400">Trabajo, paseos, algo fresco y casual.</p>
                    </button>
                    <button 
                      onClick={() => handleAnswer('env', 'noche')}
                      className="p-8 rounded-2xl border border-zinc-700 bg-zinc-900/50 hover:border-amber-500 hover:bg-amber-500/10 transition-all group"
                    >
                      <Sparkles className="w-10 h-10 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-xl text-white font-serif mb-2">Para la Noche</h3>
                      <p className="text-sm text-gray-400">Cenas, eventos, algo misterioso y elegante.</p>
                    </button>
                  </div>
                </div>
              )}

              {surpriseStep === 3 && (
                <div className="animate-[fadeIn_0.5s_ease-out] w-full">
                  <h2 className="text-3xl font-serif text-white mb-8">¿Qué tipo de aroma te atrae más?</h2>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                    <button 
                      onClick={() => handleAnswer('vibe', 'fresco')}
                      className="p-6 rounded-2xl border border-zinc-700 bg-zinc-900/50 hover:border-amber-500 hover:bg-amber-500/10 transition-all group"
                    >
                      <Droplets className="w-8 h-8 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg text-white font-serif mb-2">Fresco / Cítrico</h3>
                    </button>
                    <button 
                      onClick={() => handleAnswer('vibe', 'intenso')}
                      className="p-6 rounded-2xl border border-zinc-700 bg-zinc-900/50 hover:border-amber-500 hover:bg-amber-500/10 transition-all group"
                    >
                      <Flame className="w-8 h-8 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg text-white font-serif mb-2">Intenso / Amaderado</h3>
                    </button>
                    <button 
                      onClick={() => handleAnswer('vibe', 'dulce')}
                      className="p-6 rounded-2xl border border-zinc-700 bg-zinc-900/50 hover:border-amber-500 hover:bg-amber-500/10 transition-all group"
                    >
                      <Heart className="w-8 h-8 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                      <h3 className="text-lg text-white font-serif mb-2">Dulce / Floral</h3>
                    </button>
                  </div>
                </div>
              )}

              {surpriseStep === 5 && (
                <div className="animate-[fadeIn_0.5s_ease-out] w-full max-w-2xl mx-auto bg-zinc-900 p-8 rounded-2xl border border-amber-500/30 text-left">
                  <span className="text-amber-500 text-sm tracking-widest uppercase mb-2 block text-center md:text-left">Tu Pareja Perfecta</span>
                  <h2 className="text-3xl font-serif text-white mb-8 text-center md:text-left">Esta es tu esencia</h2>
                  
                  <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                    <div className="w-48 h-60 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-700">
                      <img src={getRecommendedPerfume().image} alt={getRecommendedPerfume().name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 text-center md:text-left">
                      <h3 className="text-3xl font-serif text-amber-500">{getRecommendedPerfume().name}</h3>
                      <p className="text-gray-400 mt-2">{getRecommendedPerfume().brand}</p>
                      <p className="text-2xl text-white font-light mt-4">${getRecommendedPerfume().price}</p>
                      
                      <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                        <button 
                          onClick={() => {
                            const p = getRecommendedPerfume();
                            addToCart({ id: p.id, name: p.name, brand: p.brand, price: p.price, image: p.image });
                          }}
                          className="px-6 py-3 bg-amber-500 hover:bg-amber-400 text-white font-medium rounded transition-colors"
                        >
                          Añadir al Carrito
                        </button>
                        <button 
                          onClick={() => setSurpriseStep(0)}
                          className="px-6 py-3 border border-zinc-700 hover:border-white text-white font-medium rounded transition-colors"
                        >
                          Reintentar Test
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <style>{`
                @keyframes progress {
                  0% { width: 0%; }
                  50% { width: 60%; }
                  100% { width: 100%; }
                }
                @keyframes fadeIn {
                  from { opacity: 0; transform: translateY(10px); }
                  to { opacity: 1; transform: translateY(0); }
                }
              `}</style>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
