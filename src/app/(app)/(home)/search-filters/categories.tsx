import { Category } from "@/payload-types";
import { CategoryDropdown } from "./category-dropdown";

// CategoriesProps - Props accepted by the Categories component
interface CategoriesProps {
  data: any; // Data used for rendering filter options (e.g., top-level categories)
}

// Categories - Renders a list of category dropdown buttons for filtering
export const Categories = ({ data }: CategoriesProps) => {
  return (
    <div>
      {/* Loop through each category and render a CategoryDropdown */}
      {data.map((category: Category) => (
        <div key={category.id}>
          <CategoryDropdown
            category={category} // The individual category object
            isActive={false} // Currently hardcoded - can be used for active styles
            isNavigationHovered={false} // Currently hardcoded - reserved for hover state logic
          />
        </div>
      ))}
    </div>
  );
};
