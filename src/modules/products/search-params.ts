import { createLoader, parseAsArrayOf, parseAsString } from "nuqs/server";

// params - Configuration for parsing and validating query string parameters on the server
const params = {
  // minPrice - Represents the minimum price filter parsed from the URL query string
  minPrice: parseAsString.withOptions({
    clearOnDefault: true, // Clears the query param if it matches the default value (empty or null)
  }),

  // maxPrice - Represents the maximum price filter parsed from the URL query string
  maxPrice: parseAsString.withOptions({
    clearOnDefault: true, // Clears the query param if it matches the default value (empty or null)
  }),

  // tags - Array of selected tag slugs for filtering by tags parsed from the URL query string
  tags: parseAsArrayOf(parseAsString).withOptions({
    clearOnDefault: true, // Clears the query param if the array is empty
  }),
};

// loadProductFilters - Server-side loader to parse filters from the searchParams of the request
export const loadProductFilters = createLoader(params);
