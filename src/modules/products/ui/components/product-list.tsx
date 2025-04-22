"use client"; // Enables client-side rendering

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";

// ProductListProps - Defines props accepted by the ProductList component
interface ProductListProps {
  category?: string; // Optional category or subcategory slug used to filter the product list
}

// ProductList - Displays a list of products based on selected category or subcategory
export const ProductList = ({ category }: ProductListProps) => {
  const trpc = useTRPC(); // Initialize TRPC client

  const { data } = useSuspenseQuery(
    trpc.products.getMany.queryOptions({
      category, // Pass category or subcategory slug to query
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
