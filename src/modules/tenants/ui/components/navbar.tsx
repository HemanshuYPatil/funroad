"use client"; // Enables client-side rendering

import { generateTenantUrl } from "@/lib/utils";
import { useTRPC } from "@/trpc/client";
import { useSuspenseQuery } from "@tanstack/react-query";
import Image from "next/image";
import Link from "next/link";

// NavbarProps - Props required by the tenant navigation bar
interface NavbarProps {
  slug: string; // Tenant slug used to fetch data and generate tenant-specific URLs
}

// Navbar - Main navigation bar for the tenant page
export const Navbar = ({ slug }: NavbarProps) => {
  const trpc = useTRPC(); // Initialize tRPC client
  const { data } = useSuspenseQuery(trpc.tenants.getOne.queryOptions({ slug })); // Fetch tenant data

  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <Link
          href={generateTenantUrl(slug)}
          className="flex items-center gap-2"
        >
          {/* Display tenant logo if available */}
          {data.image?.url && (
            <Image
              src={data.image.url}
              width={32}
              height={32}
              className="rounded-full border shrink-0 size-[32px]"
              alt={slug}
            />
          )}
          {/* Display tenant name */}
          <p className="text-xl">{data.name}</p>
        </Link>
      </div>
    </nav>
  );
};

// NavbarSkeleton - Fallback skeleton displayed while tenant data is loading
export const NavbarSkeleton = () => {
  return (
    <nav className="h-20 border-b font-medium bg-white">
      <div className="max-w-(--breakpoint-xl) mx-auto flex justify-between items-center h-full px-4 lg:px-12">
        <div />
        {/* TODO: Skeleton for checkout button */}
      </div>
    </nav>
  );
};
