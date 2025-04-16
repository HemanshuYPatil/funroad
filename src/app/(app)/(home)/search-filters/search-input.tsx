import { Input } from "@/components/ui/input";
import { SearchIcon } from "lucide-react";

// SearchInputProps - Props accepted by the SearchInput component
interface SearchInputProps {
  disabled?: boolean; // Optional flag to disable the input field
}

// SearchInput - Input field with a search icon used to filter/search for products
export const SearchInput = ({ disabled }: SearchInputProps) => {
  return (
    // Wrapper div for layout and spacing
    <div className="flex items-center gap-2 w-full">
      {/* Search input with icon */}
      <div className="relative w-full">
        {/* Icon positioned inside the input on the left */}
        <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-neutral-500" />

        {/* Input field for entering search terms */}
        <Input
          className="pl-8" // Padding left to make space for the icon
          placeholder="Search products"
        />
      </div>

      {/* TODO: Add categories "View All" button */}
      {/* TODO: Add library button */}
    </div>
  );
};
