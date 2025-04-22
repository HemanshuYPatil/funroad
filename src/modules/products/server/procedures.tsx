import { Category } from "@/payload-types";
import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { Where } from "payload";
import { z } from "zod";

// productsRouter - Defines product-related API procedures
export const productsRouter = createTRPCRouter({
  // getMany - Fetches products filtered by a category or subcategory
  getMany: baseProcedure
    .input(
      z.object({
        category: z.string().nullable().optional(), // Accepts an optional category slug to filter products
      })
    )
    .query(async ({ ctx, input }) => {
      // Initialize empty filter object for Payload query
      const where: Where = {};

      // If a category slug is provided in the input
      if (input.category) {
        // Query Payload CMS to find the category with the provided slug
        const categoriesData = await ctx.db.find({
          collection: "categories", // Look in the categories collection
          limit: 1, // Only expect one matching category
          depth: 1, // Include subcategories up to one level deep
          pagination: false, // Return all matches (no pagination)
          where: {
            slug: {
              equals: input.category, // Match category by slug
            },
          },
        });

        // Map the returned categories and flatten the subcategories field
        const formattedData = categoriesData.docs.map((doc) => ({
          ...doc, // Spread main category fields
          subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
            ...(doc as Category), // Ensure type casting to Category
          })),
        }));

        // Initialize array to hold subcategory slugs
        const subcategoriesSlugs: string[] = [];

        // Extract the parent category from the formatted result
        const parentCategory = formattedData[0];

        // Check if parentCategory and subcategories are defined
        if (parentCategory && parentCategory.subcategories) {
          // Push all subcategory slugs into the array
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );
          // Also include the parent category slug itself
          subcategoriesSlugs.push(parentCategory.slug);
        }

        // Apply a filter to the product query:
        where["category.slug"] = {
          in: subcategoriesSlugs, // Use the array of slugs
        };
      }

      // Fetch all matching products from the "products" collection
      const data = await ctx.db.find({
        collection: "products", // Query the products collection
        depth: 1, // Include relational fields (like images, category, etc.)
        where, // Apply the category filter (if any)
      });

      // Return the list of fetched products
      return data;
    }),
});
