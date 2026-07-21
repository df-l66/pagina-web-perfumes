import { Link } from 'react-router-dom';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-zinc-900 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Intro */}
          <div className="space-y-6">
            <span className="text-2xl font-serif text-white tracking-widest">FRANCIAS JM</span>
            <p className="text-sm text-gray-400 leading-relaxed pr-4">
              Redefiniendo el lujo olfativo. Encuentra la fragancia perfecta que define tu esencia, con la garantía de la mejor calidad.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500/50 transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500/50 transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center text-gray-400 hover:text-amber-500 hover:border-amber-500/50 transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-6">Explorar</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-800 mr-2"></span>Inicio</Link></li>
              <li><Link to="/catalog" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-800 mr-2"></span>Catálogo Completo</Link></li>
              <li><Link to="/collections" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-800 mr-2"></span>Colecciones</Link></li>
              <li><Link to="/about" className="text-sm text-gray-400 hover:text-white transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-800 mr-2"></span>Nuestra Filosofía</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-start text-sm text-gray-400">
                <MapPin className="w-4 h-4 mr-3 mt-0.5 text-zinc-600 flex-shrink-0" />
                <span>Boutique Principal<br/>Av. Lujo 123, Ciudad de México</span>
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Phone className="w-4 h-4 mr-3 text-zinc-600 flex-shrink-0" />
                <span>+52 (55) 1234-5678</span>
              </li>
              <li className="flex items-center text-sm text-gray-400">
                <Mail className="w-4 h-4 mr-3 text-zinc-600 flex-shrink-0" />
                <span>contacto@franciasjm.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold text-amber-500 tracking-widest uppercase mb-6">Club Exclusivo</h3>
            <p className="text-sm text-gray-400 mb-4">
              Suscríbete para recibir lanzamientos anticipados y beneficios exclusivos para miembros.
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full bg-zinc-900 border border-zinc-800 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 transition-all pr-24" 
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 bg-amber-500 hover:bg-amber-400 text-zinc-950 text-sm font-medium px-4 rounded-md transition-colors"
              >
                Unirme
              </button>
            </form>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-zinc-900/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-500 font-light">
            &copy; {new Date().getFullYear()} FRANCIAS JM. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">Términos de Privacidad</a>
            <a href="#" className="text-xs text-zinc-500 hover:text-zinc-400 transition-colors">Política de Devoluciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
