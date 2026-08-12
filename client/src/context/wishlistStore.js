import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useWishlistStore = create(
  persist(
    (set, get) => ({
      productIds: [],

      toggle: (productId) => {
        const exists = get().productIds.includes(productId);
        set({
          productIds: exists
            ? get().productIds.filter((id) => id !== productId)
            : [...get().productIds, productId],
        });
      },

      isWishlisted: (productId) => get().productIds.includes(productId),
    }),
    { name: 'leathertique-wishlist' }
  )
);
