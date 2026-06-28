import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import OrderTracker from '../components/OrderTracker';
import { formatPEN } from '../lib/formatters';

// Demo order for UI testing
const DEMO_ORDER = {
  orderNumber: 'TAR-1506AB',
  customerName: 'Juan Pérez',
  items: [
    { product: { name: 'Lomo Saltado', price: 28.00 }, quantity: 2 },
    { product: { name: 'Inca Kola 500ml', price: 5.00 }, quantity: 1 },
  ],
  subtotal: 61.00,
  deliveryFee: 0,
  total: 61.00,
  paymentMethod: 'culqi',
  orderStatus: 'preparando',
  deliveryType: 'recojo',
};

function getStatusMessage(status) {
  const msgs = {
    nuevo: 'Tu pedido ha sido recibido y está en revisión',
    confirmado: 'Tu pedido ha sido confirmado',
    preparando: 'Estamos preparando tu pedido',
    listo: 'Tu pedido está listo para recoger/entregar',
    entregado: 'Pedido entregado. ¡Buen provecho!',
    cancelado: 'Este pedido fue cancelado',
  };
  return msgs[status] || '';
}

export default function OrderStatus() {
  const { orderNumber } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    const timer = setTimeout(() => {
      setOrder({ ...DEMO_ORDER, orderNumber: orderNumber || DEMO_ORDER.orderNumber });
      setLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, [orderNumber]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-10 h-10 border-4 border-gray-200 border-t-[var(--primary)] rounded-full animate-spin mx-auto" />
          <p className="text-gray-500 mt-3 text-sm">Buscando tu pedido...</p>
        </div>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center px-4">
        <span className="text-4xl">🔍</span>
        <h2 className="font-bold text-lg text-gray-900 mt-3">Pedido no encontrado</h2>
        <p className="text-gray-500 text-sm mt-1">Verifica el número de pedido</p>
        <Link
          to="/"
          className="mt-6 py-3 px-6 rounded-xl text-white font-semibold text-sm no-underline"
          style={{ backgroundColor: 'var(--primary)' }}
        >
          Volver al menú
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1 text-sm font-medium no-underline mb-4"
          style={{ color: 'var(--primary)' }}
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
          </svg>
          Volver al menú
        </Link>

        <div className="bg-white rounded-xl p-5 shadow-sm border border-gray-100">
          <div className="text-center mb-4">
            <p className="text-xs text-gray-500 uppercase tracking-wide">Pedido</p>
            <h1 className="text-xl font-bold text-gray-900">{order.orderNumber}</h1>
          </div>

          <OrderTracker currentStatus={order.orderStatus} />

          <p className="text-center text-sm text-gray-600 mt-4">
            {getStatusMessage(order.orderStatus)}
          </p>

          <div className="mt-6 space-y-2">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex justify-between text-sm">
                <span className="text-gray-600">
                  {item.quantity}x {item.product?.name || item.name}
                </span>
                <span className="font-medium">
                  {formatPEN((item.product?.price || item.price) * item.quantity)}
                </span>
              </div>
            ))}
            <div className="border-t border-gray-100 pt-2 flex justify-between font-bold text-base">
              <span>Total</span>
              <span style={{ color: 'var(--primary)' }}>{formatPEN(order.total)}</span>
            </div>
          </div>

          <div className="mt-4 text-xs text-gray-500 space-y-1">
            <p>Pago: {order.paymentMethod === 'culqi' ? 'Tarjeta' : order.paymentMethod === 'yape' ? 'Yape' : 'Efectivo'}</p>
            <p>Tipo: {order.deliveryType === 'delivery' ? 'Delivery' : 'Recojo en local'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
