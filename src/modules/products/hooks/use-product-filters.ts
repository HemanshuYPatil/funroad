import { useQueryStates } from "nuqs";
import { createLoader, parseAsString } from "nuqs/server";

// params - Configuration for parsing minPrice and maxPrice from the URL query string
export const params = {
  minPrice: parseAsString.withOptions({
    clearOnDefault: true, // Clears the query param if it matches the default value
  }),
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true, // Clears the query param if it matches the default value
  }),
};

// useProductFilters - Hook for reading/writing price filters to the URL query string
export const useProductFilters = () => {
  return useQueryStates(params); // Returns the current values and a setter
};

// loadProductFilters - Server-side loader to parse filters from searchParams
export const loadProductFilters = createLoader(params);
