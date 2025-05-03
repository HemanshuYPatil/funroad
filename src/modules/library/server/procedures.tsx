import { DEFAULT_LIMIT } from "@/constants";
import { Media, Tenant } from "@/payload-types";
import { createTRPCRouter, protectedProcedures } from "@/trpc/init";
import { z } from "zod";

// libraryRouter - Defines library-related API procedures for purchased products
export const libraryRouter = createTRPCRouter({
  // getMany - Fetches products that have been purchased by the logged-in user
  getMany: protectedProcedures
    .input(
      z.object({
        cursor: z.number().default(1), // The page number or cursor for pagination, defaults to 1
        limit: z.number().default(DEFAULT_LIMIT), // The number of products to fetch per page, defaults to DEFAULT_LIMIT
      })
    )
    .query(async ({ ctx, input }) => {
      // Query the orders collection to get the current user's purchases
      const ordersData = await ctx.db.find({
        collection: "orders", // Target the "orders" collection
        depth: 0, // Only fetch basic references (e.g., product ID)
        page: input.cursor, // Set the pagination cursor (page number)
        limit: input.limit, // Limit the number of results to fetch
        where: {
          user: {
            equals: ctx.session.user.id, // Filter orders by the currently authenticated user
          },
        },
      });

      // Extract all product IDs from the returned order documents
      const productIds = ordersData.docs.map((order) => order.product);

      // Query the products collection to fetch full product details for those IDs
      const productsData = await ctx.db.find({
        collection: "products", // Target the "products" collection
        pagination: false, // Disable server-side pagination for this query
        where: {
          id: {
            in: productIds, // Only fetch products matching the extracted IDs
          },
        },
      });

      // Return the fetched products with properly casted relational fields
      return {
        ...productsData, // Spread base pagination metadata (e.g., totalDocs, etc.)
        docs: productsData.docs.map((doc) => ({
          ...doc, // Spread individual product fields
          image: doc.image as Media | null, // Ensure the image field is typed as Media or null
          tenant: doc.tenant as Tenant & { image: Media | null }, // Ensure tenant includes an image property for consistency
        })),
      };
    }),
});
