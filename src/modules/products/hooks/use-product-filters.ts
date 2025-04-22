import { parseAsString, useQueryStates } from "nuqs";

// useProductFilters - Hook for managing min/max price query parameters
export const useProductFilters = () => {
  return useQueryStates({
    minPrice: parseAsString.withOptions({
      clearOnDefault: true, // Clears the query param if it matches the default value
    }),
    maxPrice: parseAsString.withOptions({
      clearOnDefault: true, // Clears the query param if it matches the default value
    }),
  });
};
