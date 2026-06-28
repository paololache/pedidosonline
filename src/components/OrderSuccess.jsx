import { Link } from 'react-router-dom';
import { formatPEN } from '../lib/formatters';

export default function OrderSuccess({ order }) {
  if (!order) return null;

  return (
    <div className="flex flex-col items-center text-center px-4 py-12">
      <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mb-4">
        <svg className="w-10 h-10 text-green-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5}>
          <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>

      <h1 className="text-2xl font-bold text-gray-900">¡Pedido recibido!</h1>
      <p className="text-gray-500 mt-1">Tu pedido ya está en cocina</p>

      <div className="mt-6 bg-gray-50 rounded-xl p-4 w-full max-w-sm">
        <p className="text-xs text-gray-500 uppercase tracking-wide">Número de pedido</p>
        <p className="text-xl font-bold text-gray-900 mt-0.5">{order.orderNumber}</p>
      </div>

      <div className="mt-4 w-full max-w-sm space-y-2">
        {order.items?.map((item) => (
          <div key={item.product?.id || item.id} className="flex justify-between text-sm">
            <span className="text-gray-600">
              {item.quantity}x {item.product?.name || item.name}
            </span>
            <span className="font-medium text-gray-800">
              {formatPEN((item.product?.price || item.price) * item.quantity)}
            </span>
          </div>
        ))}
        <div className="border-t border-gray-200 pt-2 flex justify-between font-bold">
          <span>Total</span>
          <span style={{ color: 'var(--primary)' }}>{formatPEN(order.total)}</span>
        </div>
      </div>

      {order.paymentMethod === 'yape' && (
        <div className="mt-4 bg-amber-50 border border-amber-200 rounded-xl p-3 w-full max-w-sm">
          <p className="text-sm text-amber-800 font-medium">📱 No olvides enviar tu comprobante de Yape por WhatsApp</p>
        </div>
      )}

      <div className="flex flex-col gap-3 mt-8 w-full max-w-sm">
        <Link
          to={`/pedido/${order.orderNumber}`}
          className="w-full py-3 rounded-xl text-white font-semibold text-center text-base transition-colors no-underline"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          Seguir tu pedido
        </Link>
        <Link
          to="/"
          className="w-full py-3 rounded-xl bg-gray-100 text-gray-700 font-semibold text-center text-base transition-colors no-underline"
        >
          Ver menú de nuevo
        </Link>
      </div>
    </div>
  );
}
