import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useCartStore from '../store/cartStore';
import CartItem from './CartItem';
import { formatPEN } from '../lib/formatters';

export default function Cart({ isOpen, onClose }) {
  const navigate = useNavigate();
  const {
    items, deliveryType, deliveryAddress,
    addItem, removeItem, clearItem,
    setDeliveryType, setDeliveryAddress,
    getSubtotal, getDeliveryFee, getTotal, minOrder,
  } = useCartStore();

  const [anim, setAnim] = useState('slideIn');

  const handleClose = () => {
    setAnim('slideOut');
    setTimeout(() => {
      setAnim('slideIn');
      onClose();
    }, 250);
  };

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();
  const belowMin = minOrder > 0 && total < minOrder;

  const handleCheckout = () => {
    handleClose();
    navigate('/checkout');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50">
      <div className="absolute inset-0 bg-black/50 animate-fade-in" onClick={handleClose} />

      <div
        className={`absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl flex flex-col ${anim === 'slideIn' ? 'animate-slide-in' : 'animate-slide-out'}`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-100">
          <h2 className="font-bold text-lg text-gray-900">Tu pedido</h2>
          <button onClick={handleClose} className="p-1 rounded-full hover:bg-gray-100 transition-colors cursor-pointer">
            <svg className="w-6 h-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-gray-400">
              <svg className="w-16 h-16 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z" />
              </svg>
              <p className="font-medium">Tu carrito está vacío</p>
              <p className="text-sm mt-1">Agrega productos del menú</p>
            </div>
          ) : (
            <>
              <div className="space-y-1">
                {items.map((item) => (
                  <CartItem
                    key={item.product.id}
                    item={item}
                    onAdd={addItem}
                    onRemove={removeItem}
                    onClear={clearItem}
                  />
                ))}
              </div>

              <div className="mt-5 pt-4 border-t border-gray-100">
                <h3 className="font-semibold text-sm text-gray-700 mb-2">Tipo de entrega</h3>
                <div className="flex gap-2">
                  <button
                    onClick={() => setDeliveryType('recojo')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      deliveryType === 'recojo'
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                    style={{ backgroundColor: deliveryType === 'recojo' ? 'var(--primary)' : undefined }}
                  >
                    Recoger en local
                  </button>
                  <button
                    onClick={() => setDeliveryType('delivery')}
                    className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                      deliveryType === 'delivery'
                        ? 'text-white'
                        : 'bg-gray-100 text-gray-600'
                    }`}
                    style={{ backgroundColor: deliveryType === 'delivery' ? 'var(--primary)' : undefined }}
                  >
                    Delivery
                  </button>
                </div>

                {deliveryType === 'delivery' && (
                  <textarea
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Dirección de entrega *"
                    className="w-full mt-2 p-3 rounded-lg border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2"
                    style={{ focusRingColor: 'var(--primary)' }}
                    rows={2}
                    required
                  />
                )}
              </div>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="border-t border-gray-100 p-4 space-y-2 bg-gray-50/80">
            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>{formatPEN(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-600">
              <span>Delivery</span>
              <span>{deliveryFee > 0 ? formatPEN(deliveryFee) : 'Gratis'}</span>
            </div>
            <div className="flex justify-between font-bold text-lg text-gray-900 pt-2 border-t border-gray-200">
              <span>TOTAL</span>
              <span style={{ color: 'var(--primary)' }}>{formatPEN(total)}</span>
            </div>

            {belowMin && (
              <p className="text-xs text-amber-600 text-center">
                Pedido mínimo: {formatPEN(minOrder)}
              </p>
            )}

            <button
              onClick={handleCheckout}
              disabled={belowMin}
              className="w-full py-3.5 rounded-xl text-white font-semibold text-base transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Ir a pagar — {formatPEN(total)}
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
