import type { CollectionConfig } from "payload";

// Products - Collection configuration for storing product entries
export const Products: CollectionConfig = {
  // slug - Used as the API endpoint path (e.g., /api/products)
  slug: "products",

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

    // images - Upload field for product images
    {
      name: "images", // Field name
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
  ],
};
