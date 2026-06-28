import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      deliveryType: 'recojo',
      deliveryAddress: '',
      deliveryFee: 0,
      minOrder: 0,

      setBusinessConfig: (config) =>
        set({
          deliveryFee: parseFloat(config.delivery_fee || 0),
          minOrder: parseFloat(config.min_order || 0),
        }),

      addItem: (product) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === product.id);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.product.id === product.id
                  ? { ...i, quantity: i.quantity + 1 }
                  : i
              ),
            };
          }
          return { items: [...state.items, { product, quantity: 1 }] };
        }),

      removeItem: (id) =>
        set((state) => {
          const existing = state.items.find((i) => i.product.id === id);
          if (existing && existing.quantity > 1) {
            return {
              items: state.items.map((i) =>
                i.product.id === id ? { ...i, quantity: i.quantity - 1 } : i
              ),
            };
          }
          return { items: state.items.filter((i) => i.product.id !== id) };
        }),

      clearItem: (id) =>
        set((state) => ({
          items: state.items.filter((i) => i.product.id !== id),
        })),

      clearCart: () => set({ items: [] }),

      setDeliveryType: (type) => set({ deliveryType: type }),
      setDeliveryAddress: (address) => set({ deliveryAddress: address }),

      getSubtotal: () => {
        const { items } = get();
        return items.reduce((sum, i) => sum + i.product.price * i.quantity, 0);
      },

      getDeliveryFee: () => {
        const { deliveryType, deliveryFee } = get();
        return deliveryType === 'delivery' ? deliveryFee : 0;
      },

      getTotal: () => get().getSubtotal() + get().getDeliveryFee(),

      getItemCount: () => {
        return get().items.reduce((sum, i) => sum + i.quantity, 0);
      },
    }),
    {
      name: 'koditub-cart',
    }
  )
);

export default useCartStore;
