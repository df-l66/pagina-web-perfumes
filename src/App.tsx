import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { MainLayout } from './layouts/MainLayout';
import { Home } from './pages/Home/Home';
import { Catalog } from './pages/Catalog/Catalog';
import { About } from './pages/About/About';
import { Collections } from './pages/Collections/Collections';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="catalog" element={<Catalog />} />
          <Route path="about" element={<About />} />
          <Route path="collections" element={<Collections />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
