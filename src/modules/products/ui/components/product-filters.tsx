"use client"; // Enables client-side rendering

import { cn } from "@/lib/utils";
import { ChevronDownIcon, ChevronRightIcon } from "lucide-react";
import { useState } from "react";
import { useProductFilters } from "../../hooks/use-product-filters";
import { PriceFilter } from "./price-filter";

// ProductFilterProps - Props for the collapsible ProductFilter section
interface ProductFilterProps {
  title: string; // Title of the filter section
  className?: string; // Optional custom class name
  children: React.ReactNode; // Filter UI (inputs, sliders, etc.)
}

// ProductFilter - Togglable section used to group related filters
const ProductFilter = ({ title, className, children }: ProductFilterProps) => {
  const [isOpen, setIsOpen] = useState(false); // Track expanded/collapsed state

  // Choose icon based on open state
  const Icon = isOpen ? ChevronDownIcon : ChevronRightIcon;

  return (
    <div className={cn("p-4 border-b flex flex-col gap-2", className)}>
      {/* Section header with clickable toggle */}
      <div
        onClick={() => setIsOpen((current) => !current)} // Toggle open state
        className="flex items-center justify-between cursor-pointer"
      >
        <p className="font-medium">{title}</p>
        <Icon className="size-5" /> {/* Icon indicating open/closed state */}
      </div>

      {/* Render filter content only when expanded */}
      {isOpen && children}
    </div>
  );
};

// ProductFilters - Wrapper component for all available product filters
export const ProductFilters = () => {
  const [filters, setFilters] = useProductFilters(); // Sync filter state with URL query params

  // hasAnyFilters - Checks if any filter has a non-empty or non-null value
  const hasAnyFilters = Object.entries(filters).some(([, value]) => {
    if (typeof value === "string") {
      return value !== "";
    }

    return value !== null;
  });

  // onClear - Reset all filter values to empty
  const onClear = () => {
    setFilters({
      minPrice: "",
      maxPrice: "",
    });
  };

  // onChange - Update a single filter value by key
  const onChange = (key: keyof typeof filters, value: unknown) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div className="border rounded-md bg-white">
      {/* Filters header with conditional clear button */}
      <div className="p-4 border-b flex items-center justify-between">
        <p className="font-medium">Filters</p>
        {hasAnyFilters && (
          <button
            className="underline cursor-pointer"
            onClick={onClear}
            type="button"
          >
            Clear
          </button>
        )}
      </div>

      {/* Collapsible section for price-related filters */}
      <ProductFilter title="Price" className="border-b-0">
        <PriceFilter
          minPrice={filters.minPrice}
          maxPrice={filters.maxPrice}
          onMinPriceChange={(value) => onChange("minPrice", value)}
          onMaxPriceChange={(value) => onChange("maxPrice", value)}
        />
      </ProductFilter>
    </div>
  );
};
