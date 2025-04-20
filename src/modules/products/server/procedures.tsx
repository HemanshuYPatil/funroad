import { baseProcedure, createTRPCRouter } from "@/trpc/init";

// productsRouter - Defines product-related API procedures
export const productsRouter = createTRPCRouter({
  // getMany - Fetches all products
  getMany: baseProcedure.query(async ({ ctx }) => {
    // Fetch all products from the "products" collection
    const data = await ctx.db.find({
      collection: "products", // Collection to query
      depth: 1, // Populate referenced fields (e.g., category and images)
    });

    return data; // Return the fetched list of top-level products
  }),
});
