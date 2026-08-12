import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const itemKey = (item) => `${item.productId}-${item.variant || ''}`;

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],

      addItem: (item) => {
        const key = itemKey(item);
        const existing = get().items.find((i) => itemKey(i) === key);

        if (existing) {
          const newQty = Math.min(existing.quantity + item.quantity, item.stock);
          set({
            items: get().items.map((i) => (itemKey(i) === key ? { ...i, quantity: newQty } : i)),
          });
        } else {
          set({ items: [...get().items, item] });
        }
      },

      updateQuantity: (key, quantity) => {
        set({
          items: get().items.map((i) =>
            itemKey(i) === key ? { ...i, quantity: Math.max(1, Math.min(quantity, i.stock)) } : i
          ),
        });
      },

      removeItem: (key) => {
        set({ items: get().items.filter((i) => itemKey(i) !== key) });
      },

      clearCart: () => set({ items: [] }),

      itemCount: () => get().items.reduce((acc, i) => acc + i.quantity, 0),

      subtotal: () => get().items.reduce((acc, i) => acc + i.price * i.quantity, 0),
    }),
    { name: 'leathertique-cart' }
  )
);

export { itemKey };
