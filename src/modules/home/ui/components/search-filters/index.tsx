"use client"; // Enables client-side rendering

import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import { Categories } from "./categories";
import { SearchInput } from "./search-input";

// SearchFilters - Component that renders a search input and filter data section
export const SearchFilters = () => {
  const trpc = useTRPC(); // Access the tRPC client
  const { data } = useSuspenseQuery(trpc.categories.getMany.queryOptions()); // Fetch category data with suspense-enabled query

  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      {/* Search bar input field */}
      <SearchInput />

      {/* Categories filter section (only visible on large screens) */}
      <div className="hidden lg:block">
        <Categories data={data} />
      </div>
    </div>
  );
};

// SearchFiltersSkeleton - Fallback skeleton UI shown while filters are loading
export const SearchFiltersSkeleton = () => {
  return (
    <div
      className="px-4 lg:px-12 py-8 border-b flex flex-col gap-4 w-full"
      style={{ backgroundColor: "#F5F5F5" }}
    >
      {/* Disabled search input as placeholder */}
      <SearchInput disabled />
      <div className="hidden lg:block">
        {/* Empty space simulating category list */}
        <div className="h-11" />
      </div>
    </div>
  );
};
