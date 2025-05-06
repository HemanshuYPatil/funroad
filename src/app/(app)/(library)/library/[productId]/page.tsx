import { ProductView } from "@/modules/library/ui/views/product-view";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

// PageProps - Expected route parameters for the product page
interface PageProps {
  params: Promise<{
    productId: string; // The ID of the purchased product to display
  }>;
}

// Page - Displays the user's purchased product
const Page = async ({ params }: PageProps) => {
  const { productId } = await params; // Await the dynamic route params
  const queryClient = getQueryClient(); // Initialize a new query client

  // Prefetch purchased products using infinite query for library view
  void queryClient.prefetchQuery(
    trpc.library.getOne.queryOptions({
      productId, // Define how many items to fetch per page
    })
  );

  return (
    // Wraps server-side data for hydration on client
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ProductView productId={productId} />
    </HydrationBoundary>
  );
};

export default Page;
