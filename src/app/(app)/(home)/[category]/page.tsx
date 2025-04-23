import { loadProductFilters } from "@/modules/products/search-params";
import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import type { SearchParams } from "nuqs/server";
import { Suspense } from "react";

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
      <div className="px-4 lg:px-12 py-8 flex flex-col gap-4">
        <div className="grid grid-cols-1 lg:grid-cols-6 xl:grid-cols-8 gap-y-6 gap-x-12">
          {/* Sidebar: Filters column */}
          <div className="lg:col-span-2 xl:col-span-2">
            <ProductFilters />
          </div>

          {/* Main content: Product list */}
          <div className="lg:col-span-4 xl:col-span-6">
            {/* Suspense fallback shown while ProductList loads */}
            <Suspense fallback={<ProductListSkeleton />}>
              <ProductList category={category} />
            </Suspense>
          </div>
        </div>
      </div>
    </HydrationBoundary>
  );
};

export default Page;
