import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useCart } from "@/modules/checkout/hooks/use-cart";

// CartButtonProps - Props for rendering the cart toggle button
interface CartButtonProps {
  tenantSlug: string; // Tenant identifier used to scope cart actions
  productId: string; // ID of the product to add or remove from the cart
}

// CartButton - Renders a button that toggles the product in the cart
export const CartButton = ({ tenantSlug, productId }: CartButtonProps) => {
  const cart = useCart(tenantSlug); // Access cart utilities scoped to the tenant

  return (
    <Button
      variant={"elevated"} // Styled as an elevated button
      className={cn(
        "flex-1 bg-pink-400",
        cart.isProductInCart(productId) && "bg-white"
      )} // Full width with pink background
      onClick={() => cart.toggleProduct(productId)} // Toggle product in cart (add if not present, remove if already in cart)
    >
      {/* Toggle label */}
      {cart.isProductInCart(productId) ? "Remove from cart" : "Add to cart"}
    </Button>
  );
};
