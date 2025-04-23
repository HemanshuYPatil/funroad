import { useQueryStates } from "nuqs";
import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

// params - Configuration for parsing and validating query string parameters
export const params = {
  // minPrice - Represents the minimum price filter
  minPrice: parseAsString.withOptions({
    clearOnDefault: true, // Clears the query param if it matches the default value
  }),

  // maxPrice - Represents the maximum price filter
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true, // Clears the query param if it matches the default value
  }),

  // tags - Array of selected tag slugs for filtering by tags
  tags: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true, // Removes the query param if the array is empty
  }),
};

// useProductFilters - Hook for reading/writing price filters to the URL query string
export const useProductFilters = () => {
  return useQueryStates(params); // Returns the current values and a setter
};

// loadProductFilters - Server-side loader to parse filters from searchParams
export const loadProductFilters = createLoader(params);
