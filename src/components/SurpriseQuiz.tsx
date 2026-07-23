import { useState, useEffect } from 'react';
import { Sparkles, Wind, Flame, Droplets, Heart } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { CATALOG_PRODUCTS } from '../data/perfumes';
import type { Product } from '../types';

export function SurpriseQuiz() {
  const [surpriseStep, setSurpriseStep] = useState(0); 
  const [quizAnswers, setQuizAnswers] = useState({ env: '', vibe: '' });
  const [recommendedProduct, setRecommendedProduct] = useState<Product | null>(null);
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
      setSurpriseStep(4);
      setTimeout(() => {
        calculateRecommendation({ ...quizAnswers, [question]: answer });
        setSurpriseStep(5);
      }, 2500);
    }
  };

  const calculateRecommendation = (answers: { env: string, vibe: string }) => {
    // Filter logic based on our 258 perfumes
    let possible = CATALOG_PRODUCTS.filter((p: any) => p.image); // Asegurarnos de que tenga imagen

    if (answers.env === 'dia') {
      // Día: Frescos, frutales, cítricos, acuáticos, florales ligeros
      possible = possible.filter((p: any) => 
        ['Cítrico', 'Acuático', 'Frutal', 'Floral', 'Fresco'].some(f => p.family.includes(f))
      );
    } else if (answers.env === 'noche') {
      // Noche: Amaderados, Orientales, Gourmand, intensos
      possible = possible.filter((p: any) => 
        ['Amaderado', 'Oriental', 'Gourmand', 'Especiado', 'Fougère'].some(f => p.family.includes(f))
      );
    }

    if (answers.vibe === 'fresco') {
      possible = possible.filter((p: any) => ['Cítrico', 'Acuático', 'Fresco'].some(f => p.family.includes(f)));
    } else if (answers.vibe === 'intenso') {
      possible = possible.filter((p: any) => ['Amaderado', 'Oriental', 'Especiado', 'Fougère'].some(f => p.family.includes(f)));
    } else if (answers.vibe === 'dulce') {
      possible = possible.filter((p: any) => ['Gourmand', 'Dulce', 'Frutal', 'Floral'].some(f => p.family.includes(f)));
    }

    // Fallback if filtering is too strict
    if (possible.length === 0) {
      possible = CATALOG_PRODUCTS; 
    }

    // Random selection from matched
    const randomProduct = possible[Math.floor(Math.random() * possible.length)] as Product;
    setRecommendedProduct(randomProduct);
  };

  return (
    <section id="surprise-section" className="py-24 relative z-10 border-t border-zinc-800/50">
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-950/50 to-zinc-900/80 z-0" />
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
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

            {surpriseStep === 5 && recommendedProduct && (
              <div className="animate-[fadeIn_0.5s_ease-out] w-full max-w-2xl mx-auto bg-zinc-900 p-8 rounded-2xl border border-amber-500/30 text-left">
                <span className="text-amber-500 text-sm tracking-widest uppercase mb-2 block text-center md:text-left">Tu Pareja Perfecta</span>
                <h2 className="text-3xl font-serif text-white mb-8 text-center md:text-left">Esta es tu esencia</h2>
                
                <div className="flex flex-col md:flex-row gap-8 items-center md:items-start">
                  <div className="w-48 h-60 bg-zinc-800 rounded-xl overflow-hidden flex-shrink-0 border border-zinc-700">
                    <img src={recommendedProduct.image} alt={recommendedProduct.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 text-center md:text-left">
                    <h3 className="text-3xl font-serif text-amber-500">{recommendedProduct.name}</h3>
                    <p className="text-gray-400 mt-2">{recommendedProduct.brand}</p>
                    <p className="text-2xl text-white font-light mt-4">${recommendedProduct.price}</p>
                    
                    <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
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
  );
}
