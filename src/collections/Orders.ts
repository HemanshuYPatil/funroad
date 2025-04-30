import type { CollectionConfig } from "payload";

// Orders - Collection configuration for storing order records
export const Orders: CollectionConfig = {
  // slug - Used as the API endpoint path (e.g., /api/orders)
  slug: "orders",

  // admin - Admin panel configuration
  admin: {
    useAsTitle: "name", // Display the 'name' field as the document title in admin UI
  },

  // fields - Defines the schema/structure of the orders collection
  fields: [
    // name - Human-readable label for the order (e.g., "Order #123")
    {
      name: "name", // Field name
      type: "text", // Text input field
      required: true, // Must be provided
    },

    // user - Relationship to the user who placed the order
    {
      name: "user", // Field name
      type: "relationship", // Relationship input field
      relationTo: "users", // Points to the users collection
      required: true, // Must be provided
      hasMany: false, // Single user per order
    },

    // product - Relationship to the product being purchased
    {
      name: "product", // Field name
      type: "relationship", // Relationship input field
      relationTo: "products", // Points to the products collection
      required: true, // Must be provided
      hasMany: false, // Single product per order
    },

    // stripeCheckoutSessionId - Identifier for the Stripe Checkout session
    {
      name: "stripeCheckoutSessionId", // Field name
      type: "text", // Text input field
      required: true, // Must be provided
    },
  ],
};
