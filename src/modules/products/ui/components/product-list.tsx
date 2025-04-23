"use client"; // Enables client-side rendering

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { useProductFilters } from "../../hooks/use-product-filters";

// ProductListProps - Defines props accepted by the ProductList component
interface ProductListProps {
  category?: string; // Optional category or subcategory slug used to filter the product list
}

// ProductList - Displays a list of products based on selected category or subcategory
export const ProductList = ({ category }: ProductListProps) => {
  const [filters] = useProductFilters(); // Read filters (e.g. minPrice, maxPrice) from URL state
  const trpc = useTRPC(); // Initialize TRPC client

  // Fetch products using filters and category slug
  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category, // Category or subcategory slug to filter results
      ...filters, // Spread additional query filters
    })
  );

  return (
    // Render a responsive product grid layout
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-4">
      {data.docs.map((product) => (
        <div key={product.id} className="border rounded-md bg-white p-4">
          {/* Product name */}
          <h2 className="text-xl font-medium">{product.name}</h2>
          {/* Product price */}
          <p>${product.price}</p>
        </div>
      ))}
    </div>
  );
};

// ProductListSkeleton - Fallback component shown while loading product list
export const ProductListSkeleton = () => {
  return <div>Loading...</div>; // Display simple loading message
};
