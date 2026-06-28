import { formatPEN } from './formatters';

export function generateWhatsAppMessage(order, customer, businessPhone) {
  const items = order.items
    .map((i) => `• ${i.quantity}x ${i.product.name} ${formatPEN(i.product.price * i.quantity)}`)
    .join('\n');

  const msg = [
    `🛒 *Nuevo pedido #${order.orderNumber}*`,
    `Cliente: ${customer.name}`,
    `Tel: ${customer.phone}`,
    customer.email ? `Email: ${customer.email}` : '',
    '',
    '*Productos:*',
    items,
    '',
    `*Subtotal:* ${formatPEN(order.subtotal)}`,
    order.deliveryFee > 0 ? `*Delivery:* ${formatPEN(order.deliveryFee)}` : '*Delivery:* Gratis',
    `*Total:* ${formatPEN(order.total)}`,
    `*Pago:* ${order.paymentMethod}`,
    `*Tipo:* ${order.deliveryType}`,
    order.deliveryAddress ? `*Dirección:* ${order.deliveryAddress}` : '',
    order.notes ? `*Notas:* ${order.notes}` : '',
  ]
    .filter(Boolean)
    .join('\n');

  const number = businessPhone.replace(/\D/g, '');
  return `https://wa.me/${number}?text=${encodeURIComponent(msg)}`;
}
