import { Category } from "@/payload-types";
import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";
import { CustomCategory } from "./types";

// LayoutProps - Props accepted by the Layout component
interface LayoutProps {
  children: React.ReactNode; // Main content to be rendered within the layout
}

// Layout - Defines the page structure with Navbar, filters content area, and Footer
const Layout = async ({ children }: LayoutProps) => {
  // Initialize Payload CMS with the config
  const payload = await getPayload({
    config: configPromise,
  });

  // Fetch all top-level categories (i.e., categories without a parent)
  const data = await payload.find({
    collection: "categories",
    pagination: false, // Retrieve all categories without pagination
    depth: 1, // Also include subcategories one level deep
    where: {
      parent: {
        exists: false,
      },
    },
  });

  // Format the data to flatten subcategories and remove nested sub-subcategories
  const formattedData: CustomCategory[] = data.docs.map((doc) => ({
    ...doc,
    subcategories: (doc.subcategories?.docs ?? []).map((doc) => ({
      ...(doc as Category), // Cast to Category since depth: 1 ensures proper typing
      subcategories: undefined, // Prevent further nesting for simplicity
    })),
  }));

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top navigation bar */}
      <Navbar />

      {/* Search filter input */}
      <SearchFilters data={formattedData} />

      {/* Main content area */}
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>

      {/* Bottom footer */}
      <Footer />
    </div>
  );
};

export default Layout;
