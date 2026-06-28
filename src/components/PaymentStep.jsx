import { useState } from 'react';
import { formatPEN } from '../lib/formatters';

export default function PaymentStep({ total, deliveryType, onSubmit, paymentData, onPaymentDataChange }) {
  const [method, setMethod] = useState(null);

  const handleSelect = (m) => {
    setMethod(m);
    onPaymentDataChange('method', m);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 16);
    return v.replace(/(\d{4})(?=\d)/g, '$1 ');
  };

  const formatExpiry = (value) => {
    const v = value.replace(/\D/g, '').slice(0, 4);
    if (v.length > 2) return v.slice(0, 2) + '/' + v.slice(2);
    return v;
  };

  return (
    <div className="space-y-5">
      <h2 className="font-bold text-lg text-gray-900">Método de pago</h2>
      <p className="text-sm text-gray-500">Total a pagar: <span className="font-bold text-gray-900">{formatPEN(total)}</span></p>

      {/* Culqi */}
      <div
        className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${method === 'culqi' ? 'border-[var(--primary)]' : 'border-gray-200'}`}
        onClick={() => handleSelect('culqi')}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'culqi' ? 'border-[var(--primary)]' : 'border-gray-300'}`}>
            {method === 'culqi' && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />}
          </div>
          <span className="font-medium text-gray-800 text-sm">Tarjeta Visa / Mastercard</span>
        </div>

        {method === 'culqi' && (
          <div className="mt-4 space-y-3">
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Número de tarjeta</label>
              <input
                type="text"
                value={paymentData.cardNumber || ''}
                onChange={(e) => onPaymentDataChange('cardNumber', formatCardNumber(e.target.value))}
                placeholder="4111 1111 1111 1111"
                className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                style={{ focusRingColor: 'var(--primary)' }}
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-gray-600 mb-1">Nombre en la tarjeta</label>
              <input
                type="text"
                value={paymentData.cardName || ''}
                onChange={(e) => onPaymentDataChange('cardName', e.target.value)}
                placeholder="JUAN PÉREZ"
                className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 uppercase"
                style={{ focusRingColor: 'var(--primary)' }}
              />
            </div>
            <div className="flex gap-3">
              <div className="flex-1">
                <label className="block text-xs font-medium text-gray-600 mb-1">Vencimiento</label>
                <input
                  type="text"
                  value={paymentData.expiry || ''}
                  onChange={(e) => onPaymentDataChange('expiry', formatExpiry(e.target.value))}
                  placeholder="MM/AA"
                  className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                  style={{ focusRingColor: 'var(--primary)' }}
                />
              </div>
              <div className="w-24">
                <label className="block text-xs font-medium text-gray-600 mb-1">CVV</label>
                <input
                  type="text"
                  value={paymentData.cvv || ''}
                  onChange={(e) => onPaymentDataChange('cvv', e.target.value.replace(/\D/g, '').slice(0, 4))}
                  placeholder="123"
                  className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                  style={{ focusRingColor: 'var(--primary)' }}
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Yape */}
      <div
        className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${method === 'yape' ? 'border-[var(--primary)]' : 'border-gray-200'}`}
        onClick={() => handleSelect('yape')}
      >
        <div className="flex items-center gap-3">
          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'yape' ? 'border-[var(--primary)]' : 'border-gray-300'}`}>
            {method === 'yape' && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />}
          </div>
          <span className="font-medium text-gray-800 text-sm">Yape</span>
        </div>

        {method === 'yape' && (
          <div className="mt-4 text-center space-y-3">
            <div className="w-48 h-48 mx-auto bg-gray-100 rounded-xl flex items-center justify-center border border-gray-200">
              {paymentData.yapeQr ? (
                <img src={paymentData.yapeQr} alt="QR Yape" className="w-full h-full object-contain p-2" />
              ) : (
                <div className="text-center text-gray-400">
                  <svg className="w-12 h-12 mx-auto mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                  </svg>
                  <p className="text-xs">QR del negocio</p>
                </div>
              )}
            </div>
            <div className="text-left text-sm text-gray-600 space-y-1">
              <p>1. Abre tu app Yape</p>
              <p>2. Escanea este código QR</p>
              <p>3. El monto exacto es <strong>{formatPEN(total)}</strong></p>
              <p>4. Envía tu captura de pago por WhatsApp</p>
            </div>
          </div>
        )}
      </div>

      {/* Efectivo */}
      {deliveryType === 'recojo' && (
        <div
          className={`border-2 rounded-xl p-4 transition-all cursor-pointer ${method === 'efectivo' ? 'border-[var(--primary)]' : 'border-gray-200'}`}
          onClick={() => handleSelect('efectivo')}
        >
          <div className="flex items-center gap-3">
            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${method === 'efectivo' ? 'border-[var(--primary)]' : 'border-gray-300'}`}>
              {method === 'efectivo' && <div className="w-3 h-3 rounded-full" style={{ backgroundColor: 'var(--primary)' }} />}
            </div>
            <span className="font-medium text-gray-800 text-sm">Efectivo al recoger</span>
          </div>

          {method === 'efectivo' && (
            <div className="mt-4">
              <label className="block text-xs font-medium text-gray-600 mb-1">¿Con cuánto vas a pagar?</label>
              <input
                type="text"
                value={paymentData.cashAmount || ''}
                onChange={(e) => onPaymentDataChange('cashAmount', e.target.value.replace(/\D/g, ''))}
                placeholder="Ej: 50"
                className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
                style={{ focusRingColor: 'var(--primary)' }}
              />
              {paymentData.cashAmount && parseFloat(paymentData.cashAmount) >= total && (
                <p className="text-sm text-green-600 mt-1">
                  Vuelto: {formatPEN(parseFloat(paymentData.cashAmount) - total)}
                </p>
              )}
            </div>
          )}
        </div>
      )}

      <button
        onClick={onSubmit}
        disabled={!method}
        className="w-full py-3.5 rounded-xl text-white font-semibold text-base transition-all cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        Confirmar pedido
      </button>
    </div>
  );
}
