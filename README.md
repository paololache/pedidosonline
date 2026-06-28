# Pizza Aldo 🍕 — Pedidos Online

Plataforma de pedidos online para pizzería. Cliente puede navegar el menú, agregar al carrito, elegir método de pago y recibir confirmación por WhatsApp.

## Stack

- **Frontend:** React + Vite + Tailwind CSS
- **Estado:** Zustand con persistencia en localStorage
- **Backend:** Node.js + Express (pendiente de implementar)
- **Base de datos:** Supabase (PostgreSQL) — pendiente de conectar
- **Pagos:** Culqi / Yape / Efectivo

## Scripts

```bash
npm run dev      # desarrollo
npm run build    # producción
npm run preview  # previsualizar build
```

## Variables de entorno

Copiar `.env.example` a `.env` y completar:

```
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
VITE_APP_NAME=Pizza Express Tarapoto
VITE_WHATSAPP_NUMBER=51987654321
```

## Estructura

```
src/
├── components/     # UI reutilizable (Navbar, Cart, ProductCard, etc.)
├── pages/          # Menu, Checkout, OrderStatus, Admin
├── store/          # Zustand store del carrito
└── lib/            # Helpers (formatters, whatsapp, culqi, supabase)
```

## Personalizar

Editar `BUSINESS_CONFIG` en `src/pages/Menu.jsx`:
- Nombre del negocio
- Número de WhatsApp
- Precio de delivery
- Pedido mínimo
- Color primario
- Horario y dirección
