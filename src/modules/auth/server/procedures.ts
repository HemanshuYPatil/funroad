import { baseProcedure, createTRPCRouter } from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import { cookies as getCookies, headers as getHeaders } from "next/headers";
import { AUTH_COOKIE } from "../constants";
import { loginSchema, registerSchema } from "../schemas";

// authRouter - Defines auth-related API procedures
export const authRouter = createTRPCRouter({
  // session - Returns the current session from Payload CMS based on request headers
  session: baseProcedure.query(async ({ ctx }) => {
    const headers = await getHeaders(); // Get headers from the request

    const session = await ctx.db.auth({ headers }); // Payload CMS auth using headers

    return session; // Returns user and permissions from Payload
  }),

  // logout - Logs the user out by deleting the authentication cookie, invalidating the session
  logout: baseProcedure.mutation(async () => {
    const cookies = await getCookies(); // Retrieve cookies from the request

    cookies.delete(AUTH_COOKIE); // Delete the authentication cookie by its name (AUTH_COOKIE)

    // No return value needed; just clearing the auth cookie to log out the user
  }),

  // register - Creates a new user in the Payload CMS "users" collection
  register: baseProcedure
    .input(registerSchema) // Validate the input using the register schema
    .mutation(async ({ input, ctx }) => {
      // Check if a user with the same username already exists
      const existingData = await ctx.db.find({
        collection: "users",
        limit: 1,
        where: {
          username: {
            equals: input.username,
          },
        },
      });

      // Extract the first matching user from the result set (if any)
      const existingUser = existingData.docs[0];

      // If the username is already taken, throw an error
      if (existingUser) {
        throw new TRPCError({
          code: "BAD_REQUEST",
          message: "Username already taken",
        });
      }

      // Create a new user record in the Payload CMS database
      await ctx.db.create({
        collection: "users",
        data: {
          email: input.email,
          username: input.username,
          password: input.password,
        },
      });

      // Attempt to log in using Payload's login method
      const data = await ctx.db.login({
        collection: "users", // The collection from which the user is being authenticated
        data: {
          email: input.email, // User's email address for authentication
          password: input.password, // User's password for authentication
        },
      });

      // If login failed or no token is returned, throw an error
      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED", // Error code indicating authentication failure
          message: "Failed to login", // Error message indicating login failure
        });
      }

      // Set auth cookie with the returned token
      const cookies = await getCookies(); // Get the cookies from the request

      cookies.set({
        name: AUTH_COOKIE, // The name of the cookie storing the authentication token
        value: data.token, // The authentication token received after successful login
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie (security measure)
        path: "/", // Cookie will be available across the entire site (accessible from all routes)
        // TODO: Ensure cross-domain cookie sharing if needed (uncomment to enable in future)
        // sameSite: "none" // Enable cross-domain cookie sharing (requires secure connection)
        // domain: "" // Specify a domain for cookie if cross-domain is required (optional)
      });

      return data; // Return session data with user info and the authentication token
    }),

  // login - Authenticates a user and sets an auth cookie using Payload CMS
  login: baseProcedure
    .input(loginSchema) // Validate the input using the login schema
    .mutation(async ({ input, ctx }) => {
      // Attempt to log in using Payload's login method
      const data = await ctx.db.login({
        collection: "users",
        data: {
          email: input.email,
          password: input.password,
        },
      });

      // If login failed or no token is returned, throw an error
      if (!data.token) {
        throw new TRPCError({
          code: "UNAUTHORIZED",
          message: "Failed to login",
        });
      }

      // Set auth cookie with returned token
      const cookies = await getCookies();

      cookies.set({
        name: AUTH_COOKIE, // The name of the cookie storing the authentication token
        value: data.token, // The token value received after successful login
        httpOnly: true, // Prevents client-side JavaScript access to the cookie
        path: "/", // Cookie will be available across the entire site
        // TODO: Ensure cross-domain cookie sharing if needed (uncomment to enable in future)
        // sameSite: "none" // Enable for cross-domain cookie sharing, needs to be secure
        // domain: "" // Specify a domain for cookie if cross-domain is required
      });

      return data; // Return session data with user info and token
    }),
});
