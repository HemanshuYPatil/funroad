import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Category } from "@/payload-types";

// CategoryDropdownProps - Props accepted by the CategoryDropdown component
interface CategoryDropdownProps {
  category: Category; // The category object to render
  isActive?: boolean; // Indicates if the current category is active
  isNavigationHovered: boolean; // Indicates if the navigation is currently hovered
}

// CategoryDropdown - Renders a stylized button for a category
// NOTE: Dropdown functionality is not implemented yet — only the button is rendered
export const CategoryDropdown = ({
  category,
  isActive,
  isNavigationHovered,
}: CategoryDropdownProps) => {
  return (
    <Button
      variant="elevated"
      className={cn(
        "h-11 px-4 bg-transparent border-transparent rounded-full hover:bg:white hover:border-primary text-black",
        isActive && !isNavigationHovered && "bg-white border-primary"
      )}
    >
      {category.name}
    </Button>
  );
};
