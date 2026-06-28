const steps = [
  { key: 'nuevo', label: 'Recibido', icon: '📥' },
  { key: 'confirmado', label: 'Confirmado', icon: '✅' },
  { key: 'preparando', label: 'Preparando', icon: '👨‍🍳' },
  { key: 'listo', label: 'Listo', icon: '🍽️' },
  { key: 'entregado', label: 'Entregado', icon: '🎉' },
];

const statusIndex = {
  nuevo: 0,
  confirmado: 1,
  preparando: 2,
  listo: 3,
  entregado: 4,
  cancelado: -1,
};

export default function OrderTracker({ currentStatus }) {
  const idx = statusIndex[currentStatus] ?? 0;
  const isCancelled = currentStatus === 'cancelado';

  if (isCancelled) {
    return (
      <div className="text-center py-6">
        <span className="text-4xl">❌</span>
        <p className="font-semibold text-red-600 mt-2">Pedido cancelado</p>
      </div>
    );
  }

  return (
    <div className="py-6">
      <div className="flex items-start justify-between relative">
        {steps.map((step, i) => {
          const isCompleted = i <= idx;
          const isCurrent = i === idx;

          return (
            <div key={step.key} className="flex flex-col items-center flex-1 relative z-10">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center text-lg transition-all ${
                  isCompleted ? 'text-white' : 'bg-gray-100 text-gray-400'
                }`}
                style={{ backgroundColor: isCompleted ? 'var(--primary)' : undefined }}
              >
                {step.icon}
              </div>
              <p
                className={`text-xs mt-1 text-center font-medium ${
                  isCurrent ? 'text-gray-900' : isCompleted ? 'text-gray-600' : 'text-gray-400'
                }`}
              >
                {step.label}
              </p>
            </div>
          );
        })}

        <div className="absolute top-5 left-0 right-0 h-0.5 bg-gray-200 -z-0">
          <div
            className="h-full transition-all duration-500"
            style={{
              width: `${(idx / (steps.length - 1)) * 100}%`,
              backgroundColor: 'var(--primary)',
            }}
          />
        </div>
      </div>
    </div>
  );
}
