// SubcategoryMenuProps - Defines the props for the SubcategoryMenu component
interface SubcategoryMenuProps {
  category: any; // The category object containing the subcategories to be displayed
  isOpen: boolean; // Indicates whether the dropdown menu is open or closed
  position: { top: number; left: number }; // Position where the menu should be rendered (top and left coordinates)
}

// SubcategoryMenu - Component to render the subcategory dropdown menu
export const SubcategoryMenu = ({
  category,
  isOpen,
  position,
}: SubcategoryMenuProps) => {
  return <div>SubcategoryMenu</div>; // Placeholder for the actual subcategory menu content
};
