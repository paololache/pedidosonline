import { Link } from 'react-router-dom';
import useCartStore from '../store/cartStore';

export default function Navbar({ businessName, onCartOpen }) {
  const itemCount = useCartStore((s) => s.getItemCount());

  return (
    <header className="sticky top-0 z-40 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 no-underline text-inherit">
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-sm"
            style={{ backgroundColor: 'var(--primary)' }}
          >
            {(businessName || 'R')[0]}
          </div>
          <span className="font-semibold text-lg text-gray-900">
            {businessName || 'Mi Restaurante'}
          </span>
        </Link>

        <button
          onClick={onCartOpen}
          className="relative p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          aria-label="Abrir carrito"
        >
          <svg className="w-6 h-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
          </svg>
          {itemCount > 0 && (
            <span className="absolute -top-0.5 -right-0.5 bg-primary text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
              {itemCount > 99 ? '99+' : itemCount}
            </span>
          )}
        </button>
      </div>
    </header>
  );
}
