import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { headers as getHeaders } from "next/headers";

// authRouter - Defines auth-related API procedures
export const authRouter = createTRPCRouter({
  // session - Returns the current session from Payload CMS based on request headers
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders(); // Get headers from the request

    const session = await ctx.db.auth({ headers }); // Payload CMS auth using headers

    return session; // Returns user and permissions from Payload
  }),
});
