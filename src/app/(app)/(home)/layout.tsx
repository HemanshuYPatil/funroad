import configPromise from "@payload-config";
import { getPayload } from "payload";
import { Footer } from "./footer";
import { Navbar } from "./navbar";
import { SearchFilters } from "./search-filters";

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
    depth: 1, // Also fetch nested subcategories
    where: {
      parent: {
        exists: false,
      },
    },
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Top navigation bar */}
      <Navbar />

      {/* Search filter input */}
      <SearchFilters data={data} />

      {/* Main content area */}
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>

      {/* Bottom footer */}
      <Footer />
    </div>
  );
};

export default Layout;
