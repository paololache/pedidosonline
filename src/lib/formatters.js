export function formatPEN(amount) {
  return new Intl.NumberFormat('es-PE', {
    style: 'currency',
    currency: 'PEN',
  }).format(amount);
}

export function formatPhone(phone) {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 9) return cleaned;
  if (cleaned.length === 12 && cleaned.startsWith('51')) return cleaned.slice(2);
  return cleaned;
}

export function generateOrderNumber() {
  const date = new Date();
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const rand = Math.random().toString(36).slice(2, 4).toUpperCase();
  return `PZA-${day}${month}${rand}`;
}
