import { useCartStore } from "../store/use-cart-store";

// useCart - Hook for managing cart state scoped to a specific tenant
export const useCart = (tenantSlug: string) => {
  // Destructure cart actions and selectors from Zustand store
  const {
    getCartByTenant,
    addProduct,
    removeProduct,
    clearAllCarts,
    clearCart,
  } = useCartStore();

  // Get current product IDs in the tenant's cart
  const productIds = getCartByTenant(tenantSlug);

  // toggleProduct - Add or remove a product from the cart depending on its presence
  const toggleProduct = (productId: string) => {
    if (productIds.includes(productId)) {
      removeProduct(tenantSlug, productId); // If already in cart, remove it
    } else {
      addProduct(tenantSlug, productId); // Otherwise, add it
    }
  };

  // isProductInCart - Returns true if the product is already in the cart
  const isProductInCart = (productId: string) => {
    return productIds.includes(productId);
  };

  // clearTenantCard - Clears the cart for the current tenant
  const clearTenantCard = () => {
    clearCart(tenantSlug);
  };

  // Return all cart-related utilities for the specified tenant
  return {
    productIds, // Current list of product IDs in the tenant’s cart
    addProduct: (productId: string) => addProduct(tenantSlug, productId), // Scoped add
    removeProduct: (productId: string) => removeProduct(tenantSlug, productId), // Scoped remove
    clearCart: clearTenantCard, // Scoped clear
    clearAllCarts, // Global clear (all tenants)
    toggleProduct, // Toggle inclusion of a product in the cart
    isProductInCart, // Check if a product is already in the cart
    totalItems: productIds.length, // Count of products in the tenant’s cart
  };
};
