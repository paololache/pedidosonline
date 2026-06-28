export default function CheckoutForm({ data, onChange, onSubmit }) {
  return (
    <div className="space-y-4">
      <h2 className="font-bold text-lg text-gray-900">Tus datos</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo *</label>
        <input
          type="text"
          value={data.name}
          onChange={(e) => onChange('name', e.target.value)}
          placeholder="Ej: Juan Pérez"
          className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
          style={{ focusRingColor: 'var(--primary)' }}
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono *</label>
        <input
          type="tel"
          value={data.phone}
          onChange={(e) => onChange('phone', e.target.value)}
          placeholder="Ej: 987654321"
          className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
          style={{ focusRingColor: 'var(--primary)' }}
          required
        />
        <p className="text-xs text-gray-400 mt-1">Formato: 9 dígitos, empieza en 9</p>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Email (opcional)</label>
        <input
          type="email"
          value={data.email}
          onChange={(e) => onChange('email', e.target.value)}
          placeholder="Ej: juan@ejemplo.com"
          className="w-full p-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2"
          style={{ focusRingColor: 'var(--primary)' }}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Notas adicionales</label>
        <textarea
          value={data.notes}
          onChange={(e) => onChange('notes', e.target.value)}
          placeholder="Sin cebolla, extra salsa, etc."
          className="w-full p-3 rounded-lg border border-gray-200 text-sm resize-none focus:outline-none focus:ring-2"
          style={{ focusRingColor: 'var(--primary)' }}
          rows={2}
        />
      </div>

      <button
        onClick={onSubmit}
        className="w-full py-3.5 rounded-xl text-white font-semibold text-base transition-colors cursor-pointer mt-2"
        style={{ backgroundColor: 'var(--primary)' }}
      >
        Continuar al pago →
      </button>
    </div>
  );
}
