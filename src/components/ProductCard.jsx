import useCartStore from '../store/cartStore';
import { formatPEN } from '../lib/formatters';

export default function ProductCard({ product, onOpen }) {
  const items = useCartStore((s) => s.items);
  const addItem = useCartStore((s) => s.addItem);
  const removeItem = useCartStore((s) => s.removeItem);

  const cartItem = items.find((i) => i.product.id === product.id);
  const qty = cartItem?.quantity || 0;

  return (
    <div className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 transition-all hover:shadow-md">
      <div className="relative aspect-square overflow-hidden bg-gray-100" onClick={() => onOpen(product)}>
        {product.image_url ? (
          <img
            src={product.image_url}
            alt={product.name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-4xl font-bold text-gray-300">
            {product.name[0]}
          </div>
        )}

        {product.is_featured && (
          <span className="absolute top-2 left-2 bg-amber-400 text-amber-900 text-xs font-bold px-2 py-0.5 rounded-full">
            Destacado
          </span>
        )}
        {!product.is_available && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <span className="bg-white text-gray-800 font-semibold px-3 py-1 rounded-full text-sm">
              Agotado
            </span>
          </div>
        )}
      </div>

      <div className="p-3">
        <h3 className="font-semibold text-base text-gray-900 truncate">{product.name}</h3>
        {product.description && (
          <p className="text-gray-500 text-xs mt-0.5 line-clamp-2">{product.description}</p>
        )}
        <div className="flex items-center justify-between mt-2">
          <span className="font-semibold text-base" style={{ color: 'var(--primary)' }}>
            {formatPEN(product.price)}
          </span>

          {product.is_available ? (
            qty > 0 ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={(e) => { e.stopPropagation(); removeItem(product.id); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors cursor-pointer"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  -
                </button>
                <span className="font-semibold text-sm w-5 text-center">{qty}</span>
                <button
                  onClick={(e) => { e.stopPropagation(); addItem(product); }}
                  className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors cursor-pointer"
                  style={{ backgroundColor: 'var(--primary)' }}
                >
                  +
                </button>
              </div>
            ) : (
              <button
                onClick={(e) => { e.stopPropagation(); addItem(product); }}
                className="w-7 h-7 rounded-full flex items-center justify-center text-white text-sm font-bold transition-colors cursor-pointer"
                style={{ backgroundColor: 'var(--primary)' }}
              >
                +
              </button>
            )
          ) : (
            <button
              disabled
              className="w-7 h-7 rounded-full flex items-center justify-center bg-gray-200 text-gray-400 text-sm cursor-not-allowed"
            >
              +
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
