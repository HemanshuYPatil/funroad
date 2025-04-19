import config from "@payload-config";
import { initTRPC } from "@trpc/server";
import { getPayload } from "payload";

import { cache } from "react";
export const createTRPCContext = cache(async () => {
  /**
   * @see: https://trpc.io/docs/server/context
   */
  return { userId: "user_123" };
});
// Avoid exporting the entire t-object
// since it's not very descriptive.
// For instance, the use of a t variable
// is common in i18n libraries.
const t = initTRPC.create({
  /**
   * @see https://trpc.io/docs/server/data-transformers
   */
  // transformer: superjson,
});
// Base router and procedure helpers
export const createTRPCRouter = t.router;
export const createCallerFactory = t.createCallerFactory;
// baseProcedure - Wraps a procedure with Payload CMS initialization and attaches the DB context
export const baseProcedure = t.procedure.use(async ({ next }) => {
  // Initialize Payload CMS with the provided config
  const payload = await getPayload({ config });

  // Pass the Payload instance as db context for use in procedures
  return next({ ctx: { db: payload } });
});
