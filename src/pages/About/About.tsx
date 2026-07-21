export function About() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="lg:grid lg:grid-cols-2 lg:gap-16 items-center">
        <div>
          <h1 className="text-4xl sm:text-5xl font-serif text-white tracking-tight">Nuestra Historia</h1>
          <div className="mt-8 space-y-6 text-lg text-gray-400">
            <p>
              Elegance Perfumes nació de la pasión por las fragancias y el arte de la perfumería de autor. Desde 2015, nos dedicamos a seleccionar meticulosamente las esencias más raras y sofisticadas del mundo.
            </p>
            <p>
              Creemos que un perfume es mucho más que un aroma; es una firma personal, un recuerdo encapsulado en un frasco, y una expresión invisible del carácter.
            </p>
            <p>
              Trabajamos de la mano con maestros perfumistas para traerte una colección curada que desafía lo convencional y abraza el lujo atemporal.
            </p>
          </div>
        </div>
        <div className="mt-12 lg:mt-0">
          <img 
            src="https://images.unsplash.com/photo-1595425970377-c9703c5eb8ab?auto=format&fit=crop&q=80&w=800" 
            alt="Perfumería interior" 
            className="rounded-lg shadow-2xl opacity-90 grayscale-[20%]"
          />
        </div>
      </div>
    </div>
  );
}
