import { formatPEN } from '../lib/formatters';

export default function CartItem({ item, onAdd, onRemove, onClear }) {
  const { product, quantity } = item;

  return (
    <div className="flex gap-3 py-3 border-b border-gray-100 last:border-0">
      <div className="w-14 h-14 rounded-lg bg-gray-100 shrink-0 overflow-hidden">
        {product.image_url ? (
          <img src={product.image_url} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center font-bold text-gray-300 text-lg">
            {product.name[0]}
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-medium text-sm text-gray-900 truncate">{product.name}</h4>
        <p className="text-xs text-gray-500 mt-0.5">{formatPEN(product.price)} c/u</p>

        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center gap-1.5">
            <button
              onClick={() => onRemove(product.id)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              -
            </button>
            <span className="font-semibold text-sm w-5 text-center">{quantity}</span>
            <button
              onClick={() => onAdd(product)}
              className="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs font-bold transition-colors cursor-pointer"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              +
            </button>
          </div>
          <div className="flex items-center gap-2">
            <span className="font-semibold text-sm text-gray-700">
              {formatPEN(product.price * quantity)}
            </span>
            <button
              onClick={() => onClear(product.id)}
              className="text-gray-400 hover:text-red-500 transition-colors cursor-pointer"
              aria-label="Eliminar"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
