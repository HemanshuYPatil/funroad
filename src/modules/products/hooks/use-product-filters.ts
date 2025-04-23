import { parseAsArrayOf, parseAsString, useQueryStates } from "nuqs";

// params - Configuration for parsing the URL query string parameters
const params = {
  // minPrice - Represents the minimum price filter from the URL query string
  minPrice: parseAsString.withOptions({
    clearOnDefault: true, // Clears the query param if it matches the default value (empty or null)
  }),

  // maxPrice - Represents the maximum price filter from the URL query string
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true, // Clears the query param if it matches the default value (empty or null)
  }),

  // tags - Array of selected tag slugs for filtering by tags from the URL query string
  tags: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true, // Clears the query param if the array is empty
  }),
};

// useProductFilters - Hook for reading and writing the price and tag filters to the URL query string
export const useProductFilters = () => {
  return useQueryStates(params); // Uses the params configuration to manage query state
};
