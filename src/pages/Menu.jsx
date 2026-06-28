import { useState, useMemo, useEffect } from 'react';
import Navbar from '../components/Navbar';
import CategoryFilter from '../components/CategoryFilter';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import Cart from '../components/Cart';
import useCartStore from '../store/cartStore';

const IMG = 'https://images.unsplash.com';

const SAMPLE_PRODUCTS = [
  { id: '1', name: 'Pizza Margherita Personal', description: 'Queso mozzarella, salsa de tomate, albahaca fresca', price: 22.00, category: 'Pizzas', image_url: `${IMG}/photo-1565299624946-b28f40a0ae38?w=400&h=400&fit=crop`, is_available: true, is_featured: true, sort_order: 1 },
  { id: '2', name: 'Pizza Pepperoni Personal', description: 'Pepperoni, queso mozzarella, salsa clásica', price: 25.00, category: 'Pizzas', image_url: `${IMG}/photo-1628840042765-356cda07504e?w=400&h=400&fit=crop`, is_available: true, is_featured: true, sort_order: 2 },
  { id: '3', name: 'Pizza Suprema Personal', description: 'Pepperoni, champiñones, pimiento, cebolla, aceitunas', price: 28.00, category: 'Pizzas', image_url: `${IMG}/photo-1513104890138-7c749659a591?w=400&h=400&fit=crop`, is_available: true, is_featured: false, sort_order: 3 },
  { id: '4', name: 'Pizza Margherita Familiar', description: '40cm. Queso mozzarella, salsa de tomate, albahaca', price: 38.00, category: 'Pizzas', image_url: `${IMG}/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop`, is_available: true, is_featured: false, sort_order: 4 },
  { id: '5', name: 'Pizza Pepperoni Familiar', description: '40cm. Pepperoni, queso mozzarella, salsa clásica', price: 42.00, category: 'Pizzas', image_url: `${IMG}/photo-1561758033-d89a9ad46330?w=400&h=400&fit=crop`, is_available: true, is_featured: false, sort_order: 5 },
  { id: '6', name: 'Pizza Suprema Familiar', description: '40cm. Pepperoni, champiñones, pimiento, cebolla, aceitunas', price: 46.00, category: 'Pizzas', image_url: `${IMG}/photo-1574071318508-1cdbab80d002?w=400&h=400&fit=crop`, is_available: true, is_featured: true, sort_order: 6 },
  { id: '7', name: 'Alitas de Pollo BBQ', description: '6 alitas bañadas en salsa BBQ ahumada', price: 18.00, category: 'Entradas', image_url: `${IMG}/photo-1653852886048-4ebf70ae4f87?w=400&h=400&fit=crop`, is_available: true, is_featured: false, sort_order: 10 },
  { id: '8', name: 'Pan de Ajo', description: 'Pan artesanal con mantequilla de ajo y hierbas', price: 10.00, category: 'Entradas', image_url: `${IMG}/photo-1619531040576-f9416740661b?w=400&h=400&fit=crop`, is_available: true, is_featured: false, sort_order: 11 },
  { id: '9', name: 'Lasagna Clásica', description: 'Capas de pasta, carne molida, salsa bechamel y queso gratinado', price: 24.00, category: 'Pastas', image_url: `${IMG}/photo-1574894709920-11b28e7367e3?w=400&h=400&fit=crop`, is_available: true, is_featured: true, sort_order: 15 },
  { id: '10', name: 'Spaghetti Bolognese', description: 'Spaghetti con salsa bolognese casera y parmesano', price: 20.00, category: 'Pastas', image_url: `${IMG}/photo-1551892374-ecf8754cf8b0?w=400&h=400&fit=crop`, is_available: true, is_featured: false, sort_order: 16 },
  { id: '11', name: 'Coca-Cola 500ml', description: 'Bebida refrescante', price: 5.00, category: 'Bebidas', image_url: `${IMG}/photo-1554866585-cd94860890b7?w=400&h=400&fit=crop`, is_available: true, is_featured: false, sort_order: 20 },
  { id: '12', name: 'Inca Kola 500ml', description: 'Bebida refrescante', price: 5.00, category: 'Bebidas', image_url: `${IMG}/photo-1619317202838-86019e975e1b?w=400&h=400&fit=crop`, is_available: true, is_featured: false, sort_order: 21 },
  { id: '13', name: 'Agua San Luis 500ml', description: 'Agua mineral sin gas', price: 3.50, category: 'Bebidas', image_url: `${IMG}/photo-1523362628745-0c100150b504?w=400&h=400&fit=crop`, is_available: true, is_featured: false, sort_order: 22 },
  { id: '14', name: 'Cheesecake New York', description: 'Tarta de queso con salsa de maracuyá', price: 12.00, category: 'Postres', image_url: `${IMG}/photo-1533134242443-d4fd215305ad?w=400&h=400&fit=crop`, is_available: true, is_featured: false, sort_order: 25 },
  { id: '15', name: 'Combo Pizza + Gaseosa', description: '1 Pizza Personal + 1 Gaseosa 500ml a elección', price: 28.00, category: 'Combos', image_url: `${IMG}/photo-1680036523788-2cecb8d100da?w=400&h=400&fit=crop`, is_available: true, is_featured: true, sort_order: 30 },
  { id: '16', name: 'Combo Familiar + 2 Gaseosas', description: '1 Pizza Familiar + 2 Gaseosas 500ml', price: 48.00, category: 'Combos', image_url: `${IMG}/photo-1769521140317-5c6dcd1266e7?w=400&h=400&fit=crop`, is_available: true, is_featured: true, sort_order: 31 },
];

const BUSINESS_CONFIG = {
  business_name: 'Pizzas Aldo',
  whatsapp_number: '51987654321',
  delivery_fee: '5.00',
  min_order: '15.00',
  primary_color: '#E63946',
  schedule: 'Lun–Dom 6pm–11pm',
  address: 'Av. San Juan 123, Carabayllo - Lima',
};

export default function Menu() {
  const [cartOpen, setCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [activeCategory, setActiveCategory] = useState('Todos');
  const setBusinessConfig = useCartStore((s) => s.setBusinessConfig);

  useEffect(() => {
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

      <div className="sticky top-16 z-30 bg-white border-b border-gray-100">
        <CategoryFilter
          categories={categories}
          active={activeCategory}
          onChange={setActiveCategory}
        />
      </div>

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

      <ProductModal
        product={selectedProduct}
        onClose={() => setSelectedProduct(null)}
      />

      <Cart isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </div>
  );
}
