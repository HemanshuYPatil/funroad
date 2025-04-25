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
