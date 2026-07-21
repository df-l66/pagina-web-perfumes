import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { CartDrawer } from '../components/CartDrawer';

export function MainLayout() {
  return (
    <div className="min-h-screen bg-zinc-950 text-gray-200 font-sans">
      <Navbar />
      <CartDrawer />
      <main className="pt-20">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
