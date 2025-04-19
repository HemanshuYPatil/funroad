import { authRouter } from "@/modules/auth/server/procedures";
import { categoriesRouter } from "@/modules/categories/server/procedures";
import { createTRPCRouter } from "../init";

// appRouter - Registers all feature routers into a single app router
export const appRouter = createTRPCRouter({
  auth: authRouter, // API routes for authentication
  categories: categoriesRouter, // API routes for category-related queries and mutations
});

export type AppRouter = typeof appRouter;
