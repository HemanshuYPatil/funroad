import {
  ProductList,
  ProductListSkeleton,
} from "@/modules/products/ui/components/product-list";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { Suspense } from "react";

// PageProps - Defines the shape of the route parameters passed to this page
interface PageProps {
  params: Promise<{
    subcategory: string; // Subcategory from the route
  }>;
}

// Page - Displays content based on the selected subcategory
const Page = async ({ params }: PageProps) => {
  const { subcategory } = await params; // Await the resolved params

  const queryClient = getQueryClient(); // Create a query client instance

  // Prefetch product data for the selected subcategory
  void queryClient.prefetchQuery(
    trpc.products.getMany.queryOptions({
      category: subcategory, // Pass subcategory as category slug
    })
  );

  return (
    // Wrap server-side data in HydrationBoundary for client hydration
    <HydrationBoundary state={dehydrate(queryClient)}>
      {/* Show skeleton fallback while loading data */}
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={subcategory} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
