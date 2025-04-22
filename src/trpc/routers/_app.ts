import { authRouter } from "@/modules/auth/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { productsRouter } from "@/modules/products/server/procedures";
import { createTRPCRouter } from "../init";

// appRouter - Registers all feature routers into a single app router
export const appRouter = createTRPCRouter({
  auth: authRouter, // API routes for authentication
  products: productsRouter, // API routes for product-related queries and mutations
  categories: categoriesRouter, // API routes for category-related queries and mutations
});

export type AppRouter = typeof appRouter;
