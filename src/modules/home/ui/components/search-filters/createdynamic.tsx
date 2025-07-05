"use client";

import { usePathname } from "next/navigation";
import {
  SearchFilters,
  SearchFiltersSkeleton,
} from "@/modules/home/ui/components/search-filters";
import { HydrationBoundary } from "@tanstack/react-query";
import { Suspense } from "react";

// Option 1: Exact match for home route only
const FILTER_ROUTES = ["/"];

// Option 2: If you want to include specific routes, be explicit
// const FILTER_ROUTES = ['/', '/search', '/products'];

interface Props {
  dehydratedState: unknown;
}

export const ClientOnlyFilters = ({ dehydratedState }: Props) => {
  const pathname = usePathname();

 
  console.log(pathname);

 

  if (pathname === "/account") return <></>;

  return <SearchFilters />;
};
