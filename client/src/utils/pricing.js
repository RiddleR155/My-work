export const SHIPPING_COST = 500;
export const FREE_SHIPPING_THRESHOLD = 15000;

export const getShippingCost = (subtotal) => (subtotal >= FREE_SHIPPING_THRESHOLD ? 0 : SHIPPING_COST);
