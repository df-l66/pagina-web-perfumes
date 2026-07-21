import { Link } from 'react-router-dom';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <span className="text-2xl font-serif text-gray-100 tracking-wider">ELEGANCE</span>
            <p className="mt-4 text-sm text-gray-400">
              La esencia del lujo. Encuentra la fragancia perfecta que define tu personalidad.
            </p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Enlaces</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">Inicio</Link></li>
              <li><Link to="/catalog" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">Catálogo</Link></li>
              <li><Link to="/about" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">Nosotros</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Atención al cliente</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">Contacto</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">Envíos y devoluciones</a></li>
              <li><a href="#" className="text-sm text-gray-400 hover:text-amber-500 transition-colors">FAQ</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-200 tracking-wider uppercase">Suscríbete</h3>
            <p className="mt-4 text-sm text-gray-400">
              Recibe las últimas noticias y ofertas exclusivas.
            </p>
            <form className="mt-4 flex">
              <input type="email" placeholder="Tu correo" className="flex-1 min-w-0 bg-zinc-900 border border-zinc-800 text-white rounded-l-md px-4 py-2 focus:outline-none focus:border-amber-600" />
              <button type="submit" className="bg-amber-700 hover:bg-amber-600 text-white px-4 py-2 rounded-r-md transition-colors">
                Unirme
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-zinc-900 text-center">
          <p className="text-sm text-zinc-600">
            &copy; {new Date().getFullYear()} Elegance Perfumes. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
