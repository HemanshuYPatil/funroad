import { Media, Tenant } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { z } from "zod";

// checkoutRouter - Defines checkout-related API procedures
export const checkoutRouter = createTRPCRouter({
  // getProducts - Fetches multiple products by their IDs and calculates total price
  getProducts: baseProcedure
    .input(
      z.object({
        ids: z.array(z.string()), // List of product IDs to fetch
      })
    )
    .query(async ({ ctx, input }) => {
      // Query the "products" collection with relational depth
      const data = await ctx.db.find({
        collection: "products", // Collection name to query
        depth: 2, // Fetch related fields like image, tenant, tenant.image, etc.
        where: {
          id: {
            in: input.ids, // Match products by IDs provided in input
          },
        },
      });

      // Throw an error if some products were not found
      if (data.totalDocs !== input.ids.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Product not found",
        });
      }

      // Calculate the total price of all fetched products
      const totalPrice = data.docs.reduce((acc, product) => {
        const price = Number(product.price);
        return acc + (isNaN(price) ? 0 : price);
      }, 0);

      // Return fetched products along with total price
      return {
        ...data, // Include pagination and meta fields (totalDocs, limit, totalPages, etc.)
        totalPrice: totalPrice, // Sum of all product prices in the fetched list
        docs: data.docs.map((doc) => ({
          ...doc, // Spread original product fields
          image: doc.image as Media | null, // Ensure image field is typed properly
          tenant: doc.tenant as Tenant & { image: Media | null }, // Ensure tenant field includes image
        })),
      };
    }),
});
