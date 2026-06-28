import { useEffect } from 'react';
import useCartStore from '../store/cartStore';
import { formatPEN } from '../lib/formatters';

export default function ProductModal({ product, onClose }) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);

  const cartItem = items.find((i) => i.product.id === product?.id);
  const qty = cartItem?.quantity || 0;

  useEffect(() => {
    if (!product) return;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, [product]);

  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center" onClick={onClose}>
      <div className="absolute inset-0 bg-black/50 animate-fade-in" />

      <div
        className="relative bg-white w-full sm:max-w-md sm:rounded-2xl rounded-t-2xl max-h-[90vh] overflow-y-auto animate-scale-in"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow cursor-pointer"
        >
          <svg className="w-5 h-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <div className="aspect-square bg-gray-100 overflow-hidden">
          {product.image_url ? (
            <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-6xl font-bold text-gray-300">
              {product.name[0]}
            </div>
          )}
        </div>

        <div className="p-5">
          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          {product.description && (
            <p className="text-gray-500 text-sm mt-1">{product.description}</p>
          )}

          <div className="flex items-center justify-between mt-5">
            <span className="text-2xl font-bold" style={{ color: 'var(--primary)' }}>
              {formatPEN(product.price)}
            </span>

            {product.is_available ? (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => removeItem(product.id)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors cursor-pointer"
                  style={{ backgroundColor: qty > 0 ? 'var(--primary)' : '#d1d5db' }}
                  disabled={qty === 0}
                >
                  -
                </button>
                <span className="font-bold text-lg w-6 text-center">{qty}</span>
                <button
                  onClick={() => addItem(product)}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-white font-bold text-lg transition-colors cursor-pointer"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  +
                </button>
              </div>
            ) : (
              <span className="text-gray-400 font-medium">Agotado</span>
            )}
          </div>

          {qty > 0 && (
            <button
              onClick={onClose}
              className="w-full mt-5 py-3 rounded-xl text-white font-semibold text-base transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Listo — {formatPEN(product.price * qty)}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
