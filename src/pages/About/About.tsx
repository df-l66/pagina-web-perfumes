import { Droplets, Sparkles, ShieldCheck, Globe } from 'lucide-react';

export function About() {
  return (
    <div className="bg-zinc-950 min-h-screen pt-16">
      
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 w-full h-full">
          <img 
            src="https://images.unsplash.com/photo-1592945403244-b3fbafd7f539?auto=format&fit=crop&q=80&w=1600" 
            alt="FRAGANCIAS JM Store" 
            className="w-full h-full object-cover opacity-40 scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-4 max-w-4xl mx-auto mt-16">
          <span className="text-amber-500 font-bold tracking-[0.3em] uppercase text-sm mb-6 block">Nuestra Esencia</span>
          <h1 className="text-5xl md:text-7xl font-serif text-white mb-6 drop-shadow-xl">FRAGANCIAS JM</h1>
          <p className="text-xl md:text-2xl text-gray-300 font-light max-w-2xl mx-auto leading-relaxed">
            Redefiniendo el lujo olfativo a través de la excelencia, la pasión y la exclusividad.
          </p>
        </div>
      </section>

      {/* Filosofía Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1 relative">
            <div className="absolute -inset-4 border border-amber-500/20 rounded-2xl transform -translate-x-4 translate-y-4 -z-10 hidden md:block"></div>
            <img 
              src="/fondo.jpeg" 
              alt="FRAGANCIAS JM Esencia" 
              className="rounded-2xl shadow-2xl w-full object-cover aspect-[4/5] border border-zinc-800/80 hover:border-amber-500/30 transition-colors"
            />
          </div>
          
          <div className="order-1 lg:order-2">
            <h2 className="text-3xl sm:text-4xl font-serif text-white mb-8">El Arte de la Perfumería</h2>
            <div className="space-y-6 text-lg text-gray-400 font-light leading-relaxed">
              <p>
                En <strong className="text-white font-medium">FRAGANCIAS JM</strong>, no solo ofrecemos perfumes; entregamos identidades embotelladas. Nacimos con la profunda convicción de que una fragancia es la firma invisible más poderosa que una persona puede llevar consigo.
              </p>
              <p>
                Nuestro catálogo está cuidadosamente curado para ofrecer universos complementarios: las creaciones <strong className="text-amber-500 font-medium">Originales</strong> de las casas de diseño más prestigiosas, la deslumbrante perfumería <strong className="text-amber-500 font-medium">Árabe</strong> (Lattafa, Armaf, Afnan), y nuestras exclusivas selecciones <strong className="text-amber-500 font-medium">1.1</strong> y preparadas.
              </p>
              <p>
                Creemos que el lujo debe sentirse en cada detalle, desde el primer instante en que exploras nuestra tienda hasta la nota de fondo que perdura en tu piel al final del día.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Grid de Valores */}
      <section className="bg-zinc-900/50 py-24 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-serif text-white mb-4">Nuestros Pilares</h2>
            <p className="text-gray-400 max-w-2xl mx-auto">Los principios que guían cada esencia que elegimos para ti.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: ShieldCheck,
                title: "Garantía Original",
                desc: "Importamos directamente de casas oficiales, asegurando 100% de autenticidad en nuestra línea principal."
              },
              {
                icon: Droplets,
                title: "Excelencia 1.1",
                desc: "Nuestras preparaciones 1.1 utilizan extractos premium que igualan el rendimiento y estela de las mejores marcas."
              },
              {
                icon: Sparkles,
                title: "Selección Curada",
                desc: "No vendemos todo; vendemos lo mejor. Cada perfume pasa por nuestro panel experto antes de llegar a ti."
              },
              {
                icon: Globe,
                title: "Alcance Global",
                desc: "Buscamos incansablemente por todo el mundo para traer las fragancias nicho más deseadas a tu puerta."
              }
            ].map((valor, idx) => (
              <div key={idx} className="bg-zinc-900 border border-zinc-800 p-8 rounded-2xl hover:border-amber-500/50 transition-colors group">
                <div className="w-14 h-14 bg-zinc-950 rounded-xl flex items-center justify-center border border-zinc-800 mb-6 group-hover:bg-amber-500/10 group-hover:border-amber-500/30 transition-colors">
                  <valor.icon className="w-6 h-6 text-amber-500" />
                </div>
                <h3 className="text-xl font-serif text-white mb-3">{valor.title}</h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {valor.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-32 px-4 text-center relative overflow-hidden">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>
        <div className="max-w-4xl mx-auto relative z-10">
          <p className="text-3xl md:text-5xl font-serif text-white leading-tight italic">
            "El perfume anuncia la llegada de una persona y alarga su presencia."
          </p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <div className="w-12 h-[1px] bg-amber-500/50"></div>
            <span className="text-amber-500 font-medium tracking-widest uppercase text-sm">FRAGANCIAS JM</span>
            <div className="w-12 h-[1px] bg-amber-500/50"></div>
          </div>
        </div>
      </section>

    </div>
  );
}
