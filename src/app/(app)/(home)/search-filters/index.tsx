import { Categories } from "./categories";
import { SearchInput } from "./search-input";

// SearchFiltersProps - Props accepted by the SearchFilters component
interface SearchFiltersProps {
  data: any; // Data used for rendering filter options (e.g., categories, tags, etc.)
}

// SearchFilters - Component that renders a search input and filter data section
export const SearchFilters = ({ data }: SearchFiltersProps) => {
  return (
    <div className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full">
      {/* Search bar input field */}
      <SearchInput />

      {/* Categories filter section */}
      <Categories data={data} />
    </div>
  );
};
