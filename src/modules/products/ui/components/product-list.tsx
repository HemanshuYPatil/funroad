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

  return <div>{JSON.stringify(data, null, 2)}</div>; // Render product data as JSON (WIP)
};

// ProductListSkeleton - Fallback component shown while loading product list
export const ProductListSkeleton = () => {
  return <div>Loading...</div>; // Display simple loading message
};
