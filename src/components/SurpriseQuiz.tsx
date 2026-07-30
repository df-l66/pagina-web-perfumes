import { useState } from 'react';
import { 
  Sparkles, 
  Wind, 
  Flame, 
  Droplets, 
  Heart, 
  User, 
  Users, 
  Sun, 
  Moon, 
  Dumbbell, 
  Crown, 
  RotateCcw, 
  ShoppingBag,
  Sparkle,
  Layers
} from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATALOG_PRODUCTS } from '../data/perfumes';
import type { Product } from '../types';

export function SurpriseQuiz() {
  const [step, setStep] = useState(0); 
  const [answers, setAnswers] = useState({
    gender: '',    // 'hombre' | 'mujer' | 'unisex'
    occasion: '',  // 'dia' | 'noche' | 'gym' | 'seduccion'
    aroma: '',     // 'citrico' | 'amaderado' | 'dulce' | 'floral'
    linea: ''      // '' (todas) | 'Original' | 'Árabe' | 'Preparada'
  });
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const { addToCart } = useCart();

  const handleGenderSelect = (gender: string) => {
    const updated = { ...answers, gender };
    setAnswers(updated);
    setStep(2);
  };

  const handleOccasionSelect = (occasion: string) => {
    const updated = { ...answers, occasion };
    setAnswers(updated);
    setStep(3);
  };

  const handleAromaSelect = (aroma: string) => {
    const updated = { ...answers, aroma };
    setAnswers(updated);
    setStep(4);
  };

  const handleLineaSelect = (linea: string) => {
    const updatedAnswers = { ...answers, linea };
    setAnswers(updatedAnswers);
    setStep(5);
    setIsCalculating(true);

    setTimeout(() => {
      calculateRecommendation(updatedAnswers);
      setIsCalculating(false);
      setStep(6);
    }, 2200);
  };

  const calculateRecommendation = (finalAnswers: typeof answers) => {
    let pool = CATALOG_PRODUCTS.filter((p: any) => p.image);

    // 1. Gender filtering
    if (finalAnswers.gender === 'hombre') {
      pool = pool.filter((p: any) => p.category === 'Hombre' || p.category === 'Unisex');
    } else if (finalAnswers.gender === 'mujer') {
      pool = pool.filter((p: any) => p.category === 'Mujer' || p.category === 'Unisex');
    }

    // 2. Linea filtering (if specific)
    if (finalAnswers.linea === 'Original') {
      const orig = pool.filter((p: any) => p.type === 'Original' && p.linea !== 'Árabe');
      if (orig.length > 0) pool = orig;
    } else if (finalAnswers.linea === 'Árabe') {
      const arabes = pool.filter((p: any) => p.linea === 'Árabe' || p.brand?.toLowerCase().includes('lattafa') || p.brand?.toLowerCase().includes('armaf') || p.brand?.toLowerCase().includes('orientica'));
      if (arabes.length > 0) pool = arabes;
    } else if (finalAnswers.linea === 'Preparada') {
      const prep = pool.filter((p: any) => p.type === 'Preparada' || p.type === '1.1');
      if (prep.length > 0) pool = prep;
    }

    // 3. Occasion filtering
    let occasionMatches = pool;
    if (finalAnswers.occasion === 'dia') {
      occasionMatches = pool.filter((p: any) => 
        ['Cítrico', 'Acuático', 'Fresco', 'Frutal', 'Floral', 'Fougère', 'Verde'].some(f => p.family.includes(f))
      );
    } else if (finalAnswers.occasion === 'noche') {
      occasionMatches = pool.filter((p: any) => 
        ['Amaderado', 'Oriental', 'Especiado', 'Cuero', 'Gourmand', 'Oud'].some(f => p.family.includes(f))
      );
    } else if (finalAnswers.occasion === 'gym') {
      occasionMatches = pool.filter((p: any) => 
        ['Acuático', 'Cítrico', 'Fresco', 'Aromático', 'Fougère'].some(f => p.family.includes(f))
      );
    } else if (finalAnswers.occasion === 'seduccion') {
      occasionMatches = pool.filter((p: any) => 
        ['Gourmand', 'Vainilla', 'Almizcle', 'Ámbar', 'Oriental', 'Dulce'].some(f => p.family.includes(f))
      );
    }
    if (occasionMatches.length > 0) pool = occasionMatches;

    // 4. Aroma filtering
    let aromaMatches = pool;
    if (finalAnswers.aroma === 'citrico') {
      aromaMatches = pool.filter((p: any) => 
        ['Cítrico', 'Acuático', 'Fresco', 'Marino', 'Verde', 'Fougère'].some(f => p.family.includes(f))
      );
    } else if (finalAnswers.aroma === 'amaderado') {
      aromaMatches = pool.filter((p: any) => 
        ['Amaderado', 'Especiado', 'Cuero', 'Oud', 'Oriental'].some(f => p.family.includes(f))
      );
    } else if (finalAnswers.aroma === 'dulce') {
      aromaMatches = pool.filter((p: any) => 
        ['Dulce', 'Gourmand', 'Vainilla', 'Frutal', 'Ámbar'].some(f => p.family.includes(f))
      );
    } else if (finalAnswers.aroma === 'floral') {
      aromaMatches = pool.filter((p: any) => 
        ['Floral', 'Frutal', 'Chipre', 'Almizcle'].some(f => p.family.includes(f))
      );
    }
    if (aromaMatches.length > 0) pool = aromaMatches;

    // Fallback if pool is empty
    if (pool.length === 0) {
      pool = CATALOG_PRODUCTS.filter(p => p.image);
    }

    const randomChoice = pool[Math.floor(Math.random() * pool.length)] as Product;
    setRecommendedProduct(randomChoice);
  };

  const resetQuiz = () => {
    setAnswers({ gender: '', occasion: '', aroma: '', linea: '' });
    setRecommendedProduct(null);
    setStep(0);
  };

  return (
    <section id="surprise-section" className="py-24 relative z-10 border-t border-zinc-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/60 to-zinc-900/90 z-0" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="bg-zinc-900/60 backdrop-blur-xl border border-white/10 rounded-3xl p-8 md:p-14 relative overflow-hidden shadow-2xl group">
          <div className="absolute -inset-1 bg-gradient-to-r from-amber-600/30 to-purple-600/30 rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000" />
          
          <div className="relative z-10 min-h-[360px] flex flex-col justify-center items-center">
            
            {/* STEP 0: INTRO */}
            {step === 0 && (
              <div className="animate-[fadeIn_0.5s_ease-out]">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/30 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-8 h-8 text-amber-500 animate-pulse" />
                </div>
                <span className="text-amber-500 text-xs font-bold tracking-[0.25em] uppercase mb-3 block">Test Olfativo Inteligente</span>
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-6">Descubre Tu Esencia Ideal</h2>
                <p className="text-gray-300 text-base md:text-lg mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                  ¿No sabes qué perfume elegir? Responde a nuestro breve test y nuestro algoritmo seleccionará la fragancia perfecta según tu género, ocasión y preferencias de aroma.
                </p>
                <button 
                  onClick={() => setStep(1)}
                  className="inline-flex items-center px-10 py-4 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-full text-lg transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(245,158,11,0.4)]"
                >
                  <Sparkle className="w-5 h-5 mr-2" />
                  Descubrir mi Esencia
                </button>
              </div>
            )}

            {/* STEP 1: GENDER */}
            {step === 1 && (
              <div className="animate-[fadeIn_0.4s_ease-out] w-full">
                <span className="text-amber-500 text-xs font-mono uppercase tracking-widest block mb-2">Paso 1 de 4</span>
                <h2 className="text-3xl font-serif text-white mb-3">¿Para quién es la fragancia?</h2>
                <p className="text-gray-400 text-sm mb-8">Selecciona la línea de género deseada para personalizar los resultados.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl mx-auto">
                  <button 
                    onClick={() => handleGenderSelect('hombre')}
                    className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <User className="w-10 h-10 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg text-white font-serif mb-1">Para Él</h3>
                    <p className="text-xs text-gray-400">Fragancias masculinas</p>
                  </button>

                  <button 
                    onClick={() => handleGenderSelect('mujer')}
                    className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Heart className="w-10 h-10 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg text-white font-serif mb-1">Para Ella</h3>
                    <p className="text-xs text-gray-400">Fragancias femeninas</p>
                  </button>

                  <button 
                    onClick={() => handleGenderSelect('unisex')}
                    className="p-6 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Users className="w-10 h-10 text-amber-500 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                    <h3 className="text-lg text-white font-serif mb-1">Unisex</h3>
                    <p className="text-xs text-gray-400">Para compartir / Cualquiera</p>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 2: OCCASION */}
            {step === 2 && (
              <div className="animate-[fadeIn_0.4s_ease-out] w-full">
                <span className="text-amber-500 text-xs font-mono uppercase tracking-widest block mb-2">Paso 2 de 4</span>
                <h2 className="text-3xl font-serif text-white mb-3">¿En qué ocasión la usarás?</h2>
                <p className="text-gray-400 text-sm mb-8">Elige el momento o estilo principal donde lucirás tu aroma.</p>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  <button 
                    onClick={() => handleOccasionSelect('dia')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Sun className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Día & Diario</h3>
                    <p className="text-xs text-gray-400">Fresco, trabajo y versátil</p>
                  </button>

                  <button 
                    onClick={() => handleOccasionSelect('noche')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Moon className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Noche & Eventos</h3>
                    <p className="text-xs text-gray-400">Elegante, misterioso y estela</p>
                  </button>

                  <button 
                    onClick={() => handleOccasionSelect('gym')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Dumbbell className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Gym & Deporte</h3>
                    <p className="text-xs text-gray-400">Energizante y refrescante</p>
                  </button>

                  <button 
                    onClick={() => handleOccasionSelect('seduccion')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Flame className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Citas & Seducción</h3>
                    <p className="text-xs text-gray-400">Sensual, dulce e inolvidable</p>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 3: AROMA */}
            {step === 3 && (
              <div className="animate-[fadeIn_0.4s_ease-out] w-full">
                <span className="text-amber-500 text-xs font-mono uppercase tracking-widest block mb-2">Paso 3 de 4</span>
                <h2 className="text-3xl font-serif text-white mb-3">¿Qué familia aromática prefieres?</h2>
                <p className="text-gray-400 text-sm mb-8">Elige el acorde principal que más te llame la atención.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  <button 
                    onClick={() => handleAromaSelect('citrico')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Wind className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Cítrico / Acuático</h3>
                    <p className="text-xs text-gray-400">Notas de limón, mar y brisa</p>
                  </button>

                  <button 
                    onClick={() => handleAromaSelect('amaderado')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Layers className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Amaderado / Especias</h3>
                    <p className="text-xs text-gray-400">Cedro, pimienta y maderas</p>
                  </button>

                  <button 
                    onClick={() => handleAromaSelect('dulce')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Crown className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Dulce / Gourmand</h3>
                    <p className="text-xs text-gray-400">Vainilla, caramelo y tonka</p>
                  </button>

                  <button 
                    onClick={() => handleAromaSelect('floral')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Droplets className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Floral / Frutal</h3>
                    <p className="text-xs text-gray-400">Jazmín, rosas y frutas jugosas</p>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 4: LINEA */}
            {step === 4 && (
              <div className="animate-[fadeIn_0.4s_ease-out] w-full">
                <span className="text-amber-500 text-xs font-mono uppercase tracking-widest block mb-2">Paso 4 de 4</span>
                <h2 className="text-3xl font-serif text-white mb-3">¿Prefieres alguna línea en específico?</h2>
                <p className="text-gray-400 text-sm mb-8">Elige si buscas marcas internacionales, perfumería árabe o preparadas 1.1.</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-3xl mx-auto">
                  <button 
                    onClick={() => handleLineaSelect('')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Sparkles className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Cualquiera</h3>
                    <p className="text-xs text-gray-400">Mostrar la mejor coincidencia</p>
                  </button>

                  <button 
                    onClick={() => handleLineaSelect('Original')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Crown className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Originales</h3>
                    <p className="text-xs text-gray-400">Marcas internacionales de lujo</p>
                  </button>

                  <button 
                    onClick={() => handleLineaSelect('Árabe')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Flame className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Perfumería Árabe</h3>
                    <p className="text-xs text-gray-400">Lattafa, Armaf, Orientica, etc.</p>
                  </button>

                  <button 
                    onClick={() => handleLineaSelect('Preparada')}
                    className="p-5 rounded-2xl border border-zinc-800 bg-zinc-950/70 hover:border-amber-500 hover:bg-amber-500/10 transition-all group text-center"
                  >
                    <Droplets className="w-8 h-8 text-amber-500 mx-auto mb-3 group-hover:scale-110 transition-transform" />
                    <h3 className="text-base text-white font-serif mb-1">Preparadas 1.1</h3>
                    <p className="text-xs text-gray-400">Alta concentración y fijación</p>
                  </button>
                </div>
              </div>
            )}

            {/* STEP 5: CALCULATING */}
            {step === 5 && isCalculating && (
              <div className="bg-zinc-950/80 rounded-2xl p-8 border border-amber-500/30 animate-[fadeIn_0.5s_ease-out] w-full max-w-md mx-auto">
                <h3 className="text-2xl text-white font-serif mb-4">
                  Calculando tu esencia ideal...
                </h3>
                <div className="w-full bg-zinc-800 rounded-full h-2.5 mb-4 overflow-hidden">
                  <div className="bg-gradient-to-r from-amber-500 to-amber-300 h-2.5 rounded-full animate-[progress_2.2s_ease-in-out_forwards]" style={{ width: '0%' }} />
                </div>
                <p className="text-sm text-gray-400">
                  Cruzando tus selecciones con nuestro catálogo exclusivo...
                </p>
              </div>
            )}

            {/* STEP 6: RESULT */}
            {step === 6 && recommendedProduct && (
              <div className="animate-[fadeIn_0.5s_ease-out] w-full max-w-3xl mx-auto bg-zinc-950 p-6 md:p-10 rounded-3xl border border-amber-500/40 shadow-2xl text-left">
                <div className="flex items-center justify-between mb-6">
                  <span className="bg-amber-500/20 text-amber-300 border border-amber-500/30 text-xs font-bold uppercase tracking-widest px-3.5 py-1 rounded-full backdrop-blur-md">
                    Tu Coincidencia Perfecta
                  </span>
                  <span className="text-xs text-zinc-400 font-mono">
                    {recommendedProduct.category} &bull; {recommendedProduct.family}
                  </span>
                </div>

                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="w-48 h-64 bg-zinc-900 rounded-2xl overflow-hidden flex-shrink-0 border border-zinc-800 shadow-xl group">
                    <img 
                      src={recommendedProduct.image} 
                      alt={recommendedProduct.name} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                    />
                  </div>
                  
                  <div className="flex-1 text-center md:text-left">
                    <span className="text-xs uppercase tracking-widest font-bold text-amber-500 block mb-1">
                      {recommendedProduct.brand}
                    </span>
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-3">
                      {recommendedProduct.name}
                    </h2>

                    <div className="flex flex-wrap gap-2 mb-6 justify-center md:justify-start">
                      <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-md">
                        Línea: {recommendedProduct.linea || recommendedProduct.type}
                      </span>
                      <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-md">
                        Familia: {recommendedProduct.family}
                      </span>
                      <span className="bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs px-3 py-1 rounded-md">
                        Categoría: {recommendedProduct.category}
                      </span>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
                      <button 
                        onClick={() => {
                          addToCart({ 
                            id: recommendedProduct.id, 
                            name: recommendedProduct.name, 
                            brand: recommendedProduct.brand, 
                            price: recommendedProduct.price, 
                            image: recommendedProduct.image 
                          });
                        }}
                        className="inline-flex items-center justify-center px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-zinc-950 font-bold rounded-xl transition-all shadow-lg hover:shadow-amber-500/20"
                      >
                        <ShoppingBag className="w-4 h-4 mr-2" />
                        Añadir al Carrito
                      </button>

                      <button 
                        onClick={resetQuiz}
                        className="inline-flex items-center justify-center px-6 py-3.5 border border-zinc-700 hover:border-amber-500 hover:text-amber-400 text-zinc-300 font-medium rounded-xl transition-colors"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
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
                50% { width: 65%; }
                100% { width: 100%; }
              }
              @keyframes fadeIn {
                from { opacity: 0; transform: translateY(12px); }
                to { opacity: 1; transform: translateY(0); }
              }
            `}</style>
          </div>
        </div>
      </div>
    </section>
  );
}
