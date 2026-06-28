import { useState, useMemo } from 'react';
import toast from 'react-hot-toast';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Cart from '../components/Cart';
import useCartStore from '../store/cartStore';
import { formatPEN, formatPhone } from '../lib/formatters';

const SAMPLE_PRODUCTS = [
  { id: '1', name: 'Lomo Saltado', description: 'Lomo fino salteado con cebolla, tomate y papas fritas', price: 28.00, category: 'Segundos', image_url: null, is_available: true, is_featured: true, sort_order: 1 },
  { id: '2', name: 'Ceviche Mixto', description: 'Pescado y mariscos en leche de tigre, choclo y cancha', price: 32.00, category: 'Entradas', image_url: null, is_available: true, is_featured: true, sort_order: 2 },
  { id: '3', name: 'Pollo a la Brasa 1/4', description: 'Con papas fritas y ensalada fresca', price: 22.00, category: 'Segundos', image_url: null, is_available: true, is_featured: false, sort_order: 3 },
  { id: '4', name: 'Juane de Gallina', description: 'Arroz con gallina criolla envuelto en hoja de bijao', price: 18.00, category: 'Platos regionales', image_url: null, is_available: true, is_featured: true, sort_order: 4 },
  { id: '5', name: 'Tacacho con Cecina', description: 'Tacacho de plátano verde con cecina ahumada', price: 20.00, category: 'Platos regionales', image_url: null, is_available: true, is_featured: false, sort_order: 5 },
  { id: '6', name: 'Inca Kola 500ml', description: 'Bebida refrescante', price: 5.00, category: 'Bebidas', image_url: null, is_available: true, is_featured: false, sort_order: 10 },
  { id: '7', name: 'Chicha Morada', description: 'Preparada en casa con frutas naturales', price: 6.00, category: 'Bebidas', image_url: null, is_available: true, is_featured: false, sort_order: 11 },
  { id: '8', name: 'Mazamorra Morada', description: 'Postre tradicional peruano', price: 8.00, category: 'Postres', image_url: null, is_available: true, is_featured: false, sort_order: 20 },
  { id: '9', name: 'Combo Familiar', description: '2 Pollos a la brasa + 4 gaseosas + 2 porciones de papas', price: 85.00, category: 'Combos', image_url: null, is_available: true, is_featured: true, sort_order: 30 },
];

const BUSINESS_CONFIG = {
  business_name: 'Mi Restaurante',
  whatsapp_number: '51987654321',
  delivery_fee: '5.00',
  min_order: '20.00',
  primary_color: '#E63946',
  schedule: 'Lun–Sáb 12pm–10pm',
  address: 'Tarapoto, San Martín',
};

export default function Menu() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const setBusinessConfig = useCartStore((s) => s.setBusinessConfig);

  useState(() => {
    setBusinessConfig(BUSINESS_CONFIG);
    document.documentElement.style.setProperty('--primary', BUSINESS_CONFIG.primary_color);
  }, []);

  const categories = useMemo(() => {
    const cats = ['Todos', ...new Set(SAMPLE_PRODUCTS.map((p) => p.category))];
    return cats;
  }, []);

  const filteredProducts = useMemo(() => {
    if (activeCategory === 'Todos') return SAMPLE_PRODUCTS.sort((a, b) => a.sort_order - b.sort_order);
    return SAMPLE_PRODUCTS.filter((p) => p.category === activeCategory).sort((a, b) => a.sort_order - b.sort_order);
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar businessName={BUSINESS_CONFIG.business_name} onCartOpen={() => setCartOpen(true)} />

      {/* Hero */}
      <div className="relative h-44 bg-gradient-to-br overflow-hidden" style={{ backgroundColor: 'var(--primary)' }}>
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full bg-white" />
          <div className="absolute -bottom-8 -left-8 w-32 h-32 rounded-full bg-white" />
        </div>
        <div className="relative z-10 h-full flex flex-col justify-center px-4 text-white">
          <h1 className="text-2xl font-bold">{BUSINESS_CONFIG.business_name}</h1>
          <p className="text-sm opacity-90 mt-1">{BUSINESS_CONFIG.schedule}</p>
          <p className="text-sm opacity-80">{BUSINESS_CONFIG.address}</p>
        </div>
      </div>

      {/* Categories */}
      <div className="sticky top-16 z-30 bg-white border-b border-gray-100">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

      {/* Products Grid */}
      <div className="max-w-4xl mx-auto px-4 py-4">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {filteredProducts.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onOpen={setSelectedProduct}
            />
          ))}
        </div>
      </div>

      {/* Product Detail Modal */}
      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      {/* Cart Sidebar */}
      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
