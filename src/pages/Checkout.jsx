import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import CheckoutForm from '../components/CheckoutForm';
import PaymentStep from '../components/PaymentStep';
import OrderSuccess from '../components/OrderSuccess';
import useCartStore from '../store/cartStore';
import { formatPEN, generateOrderNumber } from '../lib/formatters';
import { generateWhatsAppMessage } from '../lib/whatsapp';

const STEPS = { FORM: 1, PAYMENT: 2, CONFIRMATION: 3 };

export default function Checkout() {
  const navigate = useNavigate();
  const { items, deliveryType, deliveryAddress, getSubtotal, getDeliveryFee, getTotal, clearCart } = useCartStore();
  const [step, setStep] = useState(STEPS.FORM);
  const [customer, setCustomer] = useState({ name: '', phone: '', email: '', notes: '' });
  const [paymentData, setPaymentData] = useState({ method: null, cardNumber: '', cardName: '', expiry: '', cvv: '', cashAmount: '' });
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(false);

  const subtotal = getSubtotal();
  const deliveryFee = getDeliveryFee();
  const total = getTotal();

  useEffect(() => {
    if (items.length === 0 && !order) {
      navigate('/');
    }
  }, [items, order, navigate]);

  if (order) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="w-full max-w-md mx-auto">
          <OrderSuccess order={order} />
        </div>
      </div>
    );
  }

  if (items.length === 0) return null;

  const handleCustomerSubmit = () => {
    if (!customer.name.trim()) {
      toast.error('Ingresa tu nombre');
      return;
    }
    if (!customer.phone.trim() || !/^9\d{8}$/.test(customer.phone.replace(/\D/g, ''))) {
      toast.error('Ingresa un teléfono válido de 9 dígitos');
      return;
    }
    if (deliveryType === 'delivery' && !deliveryAddress.trim()) {
      toast.error('Ingresa la dirección de delivery');
      return;
    }
    setStep(STEPS.PAYMENT);
  };

  const handlePlaceOrder = async () => {
    setLoading(true);
    try {
      const orderNumber = generateOrderNumber();
      const newOrder = {
        orderNumber,
        customerName: customer.name,
        customerPhone: customer.phone,
        customerEmail: customer.email,
        deliveryType,
        deliveryAddress,
        items: items.map((i) => ({
          product: { id: i.product.id, name: i.product.name, price: i.product.price },
          quantity: i.quantity,
        })),
        subtotal,
        deliveryFee,
        total,
        paymentMethod: paymentData.method,
        paymentStatus: paymentData.method === 'efectivo' ? 'pending' : 'paid',
        orderStatus: 'nuevo',
        notes: customer.notes,
      };

      setOrder(newOrder);
      setStep(STEPS.CONFIRMATION);

      const whatsappUrl = generateWhatsAppMessage(
        { ...newOrder, items: items },
        { name: customer.name, phone: customer.phone, email: customer.email },
        '51987654321'
      );
      window.open(whatsappUrl, '_blank');

      clearCart();
      toast.success('¡Pedido registrado con éxito!');
    } catch (err) {
      toast.error('Error al procesar el pedido. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const handleCustomerChange = (field, value) => {
    setCustomer((prev) => ({ ...prev, [field]: value }));
  };

  const handlePaymentDataChange = (field, value) => {
    setPaymentData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-md mx-auto px-4 py-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          {step > 1 ? (
            <button
              onClick={() => setStep(step - 1)}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          ) : (
            <button
              onClick={() => navigate('/')}
              className="p-1 rounded-full hover:bg-gray-200 transition-colors cursor-pointer"
            >
              <svg className="w-6 h-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
          <div>
            <h1 className="font-bold text-lg text-gray-900">Checkout</h1>
            <p className="text-xs text-gray-500">Paso {step} de 3</p>
          </div>
        </div>

        {/* Steps indicator */}
        <div className="flex gap-1 mb-6">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className="flex-1 h-1.5 rounded-full transition-colors"
              style={{ backgroundColor: s <= step ? 'var(--primary)' : '#e5e7eb' }}
            />
          ))}
        </div>

        {/* Cart Summary */}
        <div className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 mb-5">
          <h3 className="font-semibold text-sm text-gray-700 mb-2">Resumen del pedido</h3>
          {items.map((item) => (
            <div key={item.product.id} className="flex justify-between text-sm py-1">
              <span className="text-gray-600">{item.quantity}x {item.product.name}</span>
              <span className="font-medium">{formatPEN(item.product.price * item.quantity)}</span>
            </div>
          ))}
          <div className="border-t border-gray-100 mt-2 pt-2 space-y-1">
            <div className="flex justify-between text-sm text-gray-500">
              <span>Subtotal</span>
              <span>{formatPEN(subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm text-gray-500">
              <span>Delivery</span>
              <span>{deliveryFee > 0 ? formatPEN(deliveryFee) : 'Gratis'}</span>
            </div>
            <div className="flex justify-between font-bold text-base pt-1 border-t border-gray-100">
              <span>TOTAL</span>
              <span style={{ color: 'var(--primary)' }}>{formatPEN(total)}</span>
            </div>
          </div>
        </div>

        {/* Step Content */}
        {step === STEPS.FORM && (
          <CheckoutForm
            data={customer}
            onChange={handleCustomerChange}
            onSubmit={handleCustomerSubmit}
          />
        )}

        {step === STEPS.PAYMENT && (
          <PaymentStep
            total={total}
            deliveryType={deliveryType}
            paymentData={paymentData}
            onPaymentDataChange={handlePaymentDataChange}
            onSubmit={handlePlaceOrder}
          />
        )}
      </div>
    </div>
  );
}
