import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

// cn - Utility to merge and deduplicate Tailwind class names
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs)); // Merge class values and resolve Tailwind conflicts
}

// generateTenantURL - Constructs a route path for the given tenant slug
export function generateTenantURL(tenantSlug: string) {
  return `/tenants/${tenantSlug}`; // Return full route to tenant page
}

// formatCurrency - Formats a number or string as USD currency with no decimal places
export function formatCurrency(value: number | string) {
  return new Intl.NumberFormat("en-US", {
    style: "currency", // Format output as currency
    currency: "USD", // Use US Dollars
    maximumFractionDigits: 0, // Round to whole number
  }).format(Number(value)); // Convert value to number and apply formatting
}
