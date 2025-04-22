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
      {/* Displays skeleton while loading the ProductList component */}
      <Suspense fallback={<ProductListSkeleton />}>
        <ProductList category={category} />
      </Suspense>
    </HydrationBoundary>
  );
};

export default Page;
