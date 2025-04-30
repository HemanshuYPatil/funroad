import { stripe } from "@/lib/stripe";
import { Media, Tenant } from "@/payload-types";
import {
  baseProcedure,
  createTRPCRouter,
  protectedProcedures,
} from "@/trpc/init";
import { TRPCError } from "@trpc/server";
import Stripe from "stripe";
import { z } from "zod";
import { CheckoutMetadata, ProductMetadata } from "../types";

// checkoutRouter - Defines checkout-related API procedures
export const checkoutRouter = createTRPCRouter({
  // purchase - Creates a Stripe Checkout session for purchasing specified products from a tenant
  purchase: protectedProcedures
    .input(
      z.object({
        productIds: z.array(z.string()).min(1), // Array of product IDs to purchase
        tenantSlug: z.string().min(1), // Slug identifying the tenant/store
      })
    )
    .mutation(async ({ ctx, input }) => {
      // Fetch products that match the provided IDs and belong to the specified tenant
      const products = await ctx.db.find({
        collection: "products",
        depth: 2, // Fetch related fields (e.g., tenant, image)
        where: {
          and: [
            { id: { in: input.productIds } }, // Match product IDs
            { "tenant.slug": { equals: input.tenantSlug } }, // Match by tenant slug
          ],
        },
      });

      // Throw error if some products are missing (possible mismatch or filtering issue)
      if (products.totalDocs !== input.productIds.length) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Products not found",
        });
      }

      // Fetch the tenant by slug
      const tenantsData = await ctx.db.find({
        collection: "tenants",
        limit: 1,
        pagination: false,
        where: {
          slug: { equals: input.tenantSlug }, // Match the tenant by slug
        },
      });

      const tenant = tenantsData.docs[0]; // Extract the first tenant match

      // Throw error if the tenant is not found (invalid or outdated slug)
      if (!tenant) {
        throw new TRPCError({
          code: "NOT_FOUND",
          message: "Tenant not found",
        });
      }

      // NOTE: Add explicit check here to ensure tenant has a Stripe account ID configured
      // if (!tenant.stripeAccountId) throw new TRPCError({ ... });

      // Construct line items for each product to be used in the checkout session
      const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] =
        products.docs.map((product) => ({
          quantity: 1, // Each product has a quantity of 1
          price_data: {
            unit_amount: product.price * 100, // Convert price to cents (required by Stripe)
            currency: "usd", // Currency set to USD
            product_data: {
              name: product.name, // Product name shown in Stripe checkout
              metadata: {
                stripeAccountId: tenant.stripeAccountId, // Use the tenant’s Stripe account
                id: product.id, // Store product ID in metadata
                name: product.name, // Store product name in metadata
                price: product.price, // Store product price in metadata
              } as ProductMetadata,
            },
          },
        }));

      // Create a new Stripe Checkout session
      const checkout = await stripe.checkout.sessions.create({
        customer_email: ctx.session.user.email, // Send receipt to the logged-in user’s email
        success_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${input.tenantSlug}/checkout?success=true`, // Redirect URL on successful payment
        cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/tenants/${input.tenantSlug}/checkout?cancel=true`, // Redirect URL if user cancels checkout
        mode: "payment", // Use one-time payment mode
        line_items: lineItems, // Add all mapped line items
        invoice_creation: {
          enabled: true, // Generate a Stripe invoice
        },
        metadata: {
          userId: ctx.session.user.id, // Attach the user ID for tracking in Stripe
        } as CheckoutMetadata,
      });

      // Validate that a checkout URL was returned from Stripe
      if (!checkout.url) {
        throw new TRPCError({
          code: "INTERNAL_SERVER_ERROR",
          message: "Failed to create checkout session",
        });
      }

      // Return the checkout session URL to the client so it can redirect
      return {
        url: checkout.url,
      };
    }),

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
