import { categoriesRouter } from "@/modules/categories/server/procedures";
import { createTRPCRouter } from "../init";

// appRouter - Registers all feature routers into a single app router
export const appRouter = createTRPCRouter({
  categories: categoriesRouter, // API routes for category-related queries and mutations
});

export type AppRouter = typeof appRouter;
