import { Link } from 'react-router-dom';
import { Mail, Phone } from 'lucide-react';

export function Footer() {
  return (
    <footer className="relative z-10 bg-zinc-900 border-t border-zinc-800 pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 mb-16">
          
          {/* Brand & Intro */}
          <div className="space-y-6">
            <span className="text-2xl font-serif text-white tracking-widest">FRANCIAS JM</span>
            <p className="text-sm text-zinc-100 leading-relaxed pr-4">
              Redefiniendo el lujo olfativo. Encuentra la fragancia perfecta que define tu esencia, con la garantía de la mejor calidad.
            </p>
            <div className="flex space-x-4">
              <a href="https://www.instagram.com/fraganciasjm1312?igsh=MWgxNjYyd3A3YnJzZw%3D%3D&utm_source=qr" className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 hover:text-amber-400 hover:border-amber-400/50 transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
              </a>
              <a href="https://www.facebook.com/share/1CxCyj3Qo4/?mibextid=wwXIfr" className="w-10 h-10 rounded-full bg-zinc-800 border border-zinc-700 flex items-center justify-center text-zinc-100 hover:text-amber-400 hover:border-amber-400/50 transition-all">
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
              </a>
            </div>
          </div>

          {/* Enlaces Rápidos */}
          <div>
            <h3 className="text-xs font-bold text-amber-400 tracking-widest uppercase mb-6">Explorar</h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-sm text-zinc-100 hover:text-white transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mr-2"></span>Inicio</Link></li>
              <li><Link to="/catalog" className="text-sm text-zinc-100 hover:text-white transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mr-2"></span>Catálogo Completo</Link></li>
              <li><Link to="/collections" className="text-sm text-zinc-100 hover:text-white transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mr-2"></span>Colecciones</Link></li>
              <li><Link to="/about" className="text-sm text-zinc-100 hover:text-white transition-colors flex items-center"><span className="w-1.5 h-1.5 rounded-full bg-zinc-600 mr-2"></span>Nuestra Filosofía</Link></li>
            </ul>
          </div>

          {/* Contacto */}
          <div>
            <h3 className="text-xs font-bold text-amber-400 tracking-widest uppercase mb-6">Contacto</h3>
            <ul className="space-y-4">
              <li className="flex items-center text-sm text-zinc-100">
                <Phone className="w-4 h-4 mr-3 text-amber-400 flex-shrink-0" />
                <span>3052550909</span>
              </li>
              <li className="flex items-center text-sm text-zinc-100">
                <Mail className="w-4 h-4 mr-3 text-amber-400 flex-shrink-0" />
                <span>fraganciasjm1312@gmail.com</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-bold text-amber-400 tracking-widest uppercase mb-6">Club Exclusivo</h3>
            <p className="text-sm text-zinc-100 mb-4">
              Suscríbete para recibir lanzamientos anticipados y beneficios exclusivos para miembros.
            </p>
            <form className="relative">
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                className="w-full bg-zinc-800 border border-zinc-600 text-white text-sm rounded-lg px-4 py-3 focus:outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all pr-24" 
              />
              <button 
                type="submit" 
                className="absolute right-1 top-1 bottom-1 bg-amber-400 hover:bg-amber-300 text-zinc-950 text-sm font-medium px-4 rounded-md transition-colors"
              >
                Unirme
              </button>
            </form>
          </div>
          
        </div>

        {/* Copyright */}
        <div className="pt-8 border-t border-zinc-800/80 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-xs text-zinc-300 font-light">
            &copy; {new Date().getFullYear()} FRANCIAS JM. Todos los derechos reservados.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-xs text-zinc-300 hover:text-white transition-colors">Términos de Privacidad</a>
            <a href="#" className="text-xs text-zinc-300 hover:text-white transition-colors">Política de Devoluciones</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
