import { useState, useEffect } from 'react';
import { formatPEN } from '../lib/formatters';

const DEMO_ORDERS = [
  { id: '1', orderNumber: 'TAR-1506AB', customer_name: 'Juan Pérez', total: 61.00, payment_method: 'culqi', payment_status: 'paid', order_status: 'preparando', created_at: new Date().toISOString() },
  { id: '2', orderNumber: 'TAR-1506AC', customer_name: 'María García', total: 32.00, payment_method: 'yape', payment_status: 'paid', order_status: 'nuevo', created_at: new Date().toISOString() },
  { id: '3', orderNumber: 'TAR-1506AD', customer_name: 'Carlos López', total: 85.00, payment_method: 'efectivo', payment_status: 'pending', order_status: 'confirmado', created_at: new Date().toISOString() },
];

const STATUSES = ['nuevo', 'confirmado', 'preparando', 'listo', 'entregado', 'cancelado'];

function StatusBadge({ status }) {
  const styles = {
    nuevo: 'bg-gray-100 text-gray-700',
    confirmado: 'bg-blue-100 text-blue-700',
    preparando: 'bg-amber-100 text-amber-700',
    listo: 'bg-green-100 text-green-700',
    entregado: 'bg-emerald-100 text-emerald-700',
    cancelado: 'bg-red-100 text-red-700',
  };
  return (
    <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${styles[status] || styles.nuevo}`}>
      {status}
    </span>
  );
}

export default function Admin() {
  const [activeTab, setActiveTab] = useState('pedidos');
  const [orders, setOrders] = useState(DEMO_ORDERS);
  const [filter, setFilter] = useState('todos');

  // Auth placeholder
  const [isAuth, setIsAuth] = useState(false);
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');

  if (!isAuth) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center px-4">
        <div className="bg-gray-800 rounded-2xl p-6 w-full max-w-sm">
          <h1 className="text-white font-bold text-xl mb-5">Admin</h1>
          <div className="space-y-3">
            <input
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 rounded-lg bg-gray-700 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2"
            />
            <input
              type="password"
              value={loginPass}
              onChange={(e) => setLoginPass(e.target.value)}
              placeholder="Contraseña"
              className="w-full p-3 rounded-lg bg-gray-700 text-white text-sm border border-gray-600 focus:outline-none focus:ring-2"
            />
            <button
              onClick={() => setIsAuth(true)}
              className="w-full py-3 rounded-lg text-white font-semibold cursor-pointer"
              style={{ backgroundColor: 'var(--primary)' }}
            >
              Ingresar
            </button>
          </div>
        </div>
      </div>
    );
  }

  const filteredOrders = filter === 'todos' ? orders : orders.filter((o) => o.order_status === filter);

  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <div className="max-w-5xl mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-bold">Panel de administración</h1>
          <button
            onClick={() => setIsAuth(false)}
            className="text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
          >
            Cerrar sesión
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 border-b border-gray-700 mb-5">
          {['pedidos', 'productos', 'configuración'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`pb-3 text-sm font-medium capitalize transition-colors cursor-pointer ${
                activeTab === tab ? 'border-b-2 text-white' : 'text-gray-400'
              }`}
              style={{ borderColor: activeTab === tab ? 'var(--primary)' : 'transparent' }}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Pedidos */}
        {activeTab === 'pedidos' && (
          <div>
            <div className="flex gap-2 mb-4 overflow-x-auto">
              {['todos', ...STATUSES].map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors cursor-pointer ${
                    filter === s ? 'text-white' : 'bg-gray-800 text-gray-400 hover:bg-gray-700'
                  }`}
                  style={{ backgroundColor: filter === s ? 'var(--primary)' : undefined }}
                >
                  {s === 'todos' ? 'Todos' : s}
                </button>
              ))}
            </div>

            <div className="space-y-3">
              {filteredOrders.map((order) => (
                <div
                  key={order.id}
                  className="bg-gray-800 rounded-xl p-4 flex items-center justify-between"
                >
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-sm">{order.orderNumber}</span>
                      <StatusBadge status={order.order_status} />
                    </div>
                    <p className="text-sm text-gray-400 mt-0.5">{order.customer_name}</p>
                    <p className="text-xs text-gray-500 mt-0.5">
                      {new Date(order.created_at).toLocaleString('es-PE')}
                    </p>
                  </div>
                  <div className="text-right shrink-0 ml-4">
                    <p className="font-bold">{formatPEN(order.total)}</p>
                    <select
                      value={order.order_status}
                      onChange={(e) => {
                        setOrders((prev) =>
                          prev.map((o) =>
                            o.id === order.id ? { ...o, order_status: e.target.value } : o
                          )
                        );
                      }}
                      className="mt-1 text-xs bg-gray-700 border border-gray-600 rounded-lg px-2 py-1 text-gray-200 focus:outline-none cursor-pointer"
                    >
                      {STATUSES.map((s) => (
                        <option key={s} value={s}>{s}</option>
                      ))}
                    </select>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Productos placeholder */}
        {activeTab === 'productos' && (
          <div className="text-center py-12 text-gray-500">
            <p className="font-medium">Gestión de productos</p>
            <p className="text-sm mt-1">Agregar, editar y desactivar productos del menú</p>
          </div>
        )}

        {/* Config placeholder */}
        {activeTab === 'configuración' && (
          <div className="text-center py-12 text-gray-500">
            <p className="font-medium">Configuración del negocio</p>
            <p className="text-sm mt-1">Editar nombre, WhatsApp, colores, delivery, etc.</p>
          </div>
        )}
      </div>
    </div>
  );
}
