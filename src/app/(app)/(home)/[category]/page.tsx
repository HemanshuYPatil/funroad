import { loadProductFilters } from "@/modules/products/search-params";
import { ProductListView } from "@/modules/products/ui/views/product-list-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";

// PageProps - Defines the route and query parameters passed to the category page
interface PageProps {
  params: Promise<{ category: string }>; // Dynamic segment from the route (category slug)
  searchParams: Promise<SearchParams>; // URL query params (minPrice, maxPrice, etc.)
}

// Page - Displays product list for a selected category
const Page = async ({ params, searchParams }: PageProps) => {
  const { category } = await params; // Extract category from dynamic route parameters
  const filters = await loadProductFilters(searchParams); // Parse filters from search params

  const queryClient = getQueryClient(); // Initialize a new query client

  // Prefetch products based on selected category and filters before rendering
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category, // Pass selected category
      ...filters, // Include minPrice, maxPrice filters
    })
  );

  return (
    // Wraps server-side data for hydration on client
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductListView category={category} />
    </HydrationBoundary>
  );
};

export default Page;
