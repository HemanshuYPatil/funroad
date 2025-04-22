import { ProductFilters } from "@/modules/products/ui/components/product-filters";
import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

// PageProps - Defines the shape of the route parameters passed to this page
interface PageProps {
  params: Promise<{ category: string }>; // Route parameter for the selected category
}

// Page - Displays product list for a selected category
const Page = async ({ params }: PageProps) => {
  const { category } = await params; // Extract category from dynamic route parameters

  const queryClient = getQueryClient(); // Initialize a new query client

  // Prefetch the product list for the given category before rendering
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category, // Pass category slug to the product fetcher
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
