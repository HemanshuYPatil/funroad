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
        category: z.string().nullable().optional(), // Optional category or subcategory slug
        minPrice: z.string().nullable().optional(), // Optional minimum price filter
        maxPrice: z.string().nullable().optional(), // Optional maximum price filter
      })
    )
    .query(async ({ ctx, input }) => {
      // Initialize an empty 'where' filter for the product query
      const where: Where = {};

      // Add minimum price filter if provided
      if (input.minPrice) {
        where.price = {
          greater_than_equal: input.minPrice,
        };
      }

      // Add maximum price filter if provided
      if (input.maxPrice) {
        where.price = {
          less_than_equal: input.maxPrice,
        };
      }

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

        // If a valid category was found
        if (parentCategory) {
          // Push all subcategory slugs into the array
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );

          // Add category and subcategory slugs to the product query
          where["category.slug"] = {
            in: [parentCategory.slug, ...subcategoriesSlugs],
          };
        }
      }

      // Query the products collection using the constructed filter
      const data = await ctx.db.find({
        collection: "products", // Query the products collection
        depth: 1, // Include relational fields (like images, category, etc.)
        where, // Apply the category filter (if any)
      });

      // Return the final product list
      return data;
    }),
});
