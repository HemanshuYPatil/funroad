import { Category } from "@/payload-types"; // Import the Category type from Payload
import { baseProcedure, createTRPCRouter } from "@/trpc/init"; // Import baseProcedure and router initializer
import { Where } from "payload"; // Import Where type for query filters
import { z } from "zod"; // Import Zod for input validation

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

        // If a valid category was found
        if (parentCategory) {
          // Push all subcategory slugs into the array
          subcategoriesSlugs.push(
            ...parentCategory.subcategories.map(
              (subcategory) => subcategory.slug
            )
          );
        }

        // Apply a filter to the product query:
        // If the slug refers to a parent category, it matches the parent and all subcategories
        // If it's already a subcategory, only its slug will match
        where["category.slug"] = {
          in: [parentCategory.slug, ...subcategoriesSlugs],
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
