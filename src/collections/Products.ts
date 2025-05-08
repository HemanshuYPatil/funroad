import { isSuperAdmin } from "@/lib/access";
import { Tenant } from "@/payload-types";
import type { CollectionConfig } from "payload";

// Products - Collection configuration for storing product entries
export const Products: CollectionConfig = {
  // slug - Used as the API endpoint path (e.g., /api/products)
  slug: "products",

  // access - Access control configuration for the products collection
  access: {
    create: ({ req }) => {
      // If the user is a super admin, allow them to create products
      if (isSuperAdmin(req.user)) return true;

      // Get the tenant from the user
      const tenant = req.user?.tenants?.[0]?.tenant as Tenant;

      // Check if the tenant has submitted their stripe details
      return Boolean(tenant?.stripeDetailsSubmitted);
    },
  },

  // admin - Admin panel configuration
  admin: {
    useAsTitle: "name", // Display the 'name' field as the document title in admin UI
    description: "You must verify your account before you can create products.", // Help text shown in the admin UI
  },

  // fields - Defines the schema/structure of the collection
  fields: [
    // name - The display name of the product (e.g., 'T-shirt', 'Laptop')
    {
      name: "name", // Field name used internally and in the database
      type: "text", // Text input field
      required: true, // Must be provided when creating/editing a product
    },

    // description - Short text describing the product
    {
      name: "description", // Field name
      type: "text", // Text input field
    },

    // price - Numeric value representing the cost of the product
    {
      name: "price", // Field name
      type: "number", // Numeric input field
      required: true, // Must be provided when creating/editing a product
      admin: {
        description: "Price in USD", // Help text shown in the admin UI
      },
    },

    // category - Relationship to a category this product belongs to
    {
      name: "category", // Field name
      type: "relationship", // References another document
      relationTo: "categories", // Points to the categories collection
      hasMany: false, // Only one category allowed
    },

    // tags - Relationship to multiple tags assigned to this product
    {
      name: "tags", // Field name
      type: "relationship", // References another document
      relationTo: "tags", // Points to the tags collection
      hasMany: true, // A product can have many tags
    },

    // image - Upload field for product image
    {
      name: "image", // Field name
      type: "upload", // File upload input
      relationTo: "media", // Points to the media collection
      hasMany: true, // Multiple images allowed
    },

    // refundPolicy - Enum representing refund rules for this product
    {
      name: "refundPolicy", // Field name
      type: "select", // Dropdown select field
      options: ["30-day", "14-day", "7-day", "3-day", "1-day", "no-refunds"], // Allowed refund options
      defaultValue: "30-day", // Default refund policy
    },

    // content - Protected content only visible to customers after purchase
    {
      name: "content", // Field name
      type: "textarea", // Textarea field
      admin: {
        description:
          "Protected content only visible to customers after purchase. Add product documentation, downloadables files, getting started guides, and bonus materials. Support markdown formatting.", // Help text shown in the admin UI
      },
    },
  ],
};
