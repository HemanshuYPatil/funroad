import { Footer } from "@/modules/tenants/ui/components/footer";
import { Navbar } from "@/modules/tenants/ui/components/navbar";

// LayoutProps - Props accepted by the Layout component
interface LayoutProps {
  children: React.ReactNode; // Main content to be rendered within the layout
  params: Promise<{ slug: string }>; // Dynamic route parameter for identifying the tenant
}

// Layout - Defines the page structure with Navbar, filters content area, and Footer
const Layout = async ({ children }: LayoutProps) => {
  return (
    <div className="min-h-screen bg-[#F4F4F0] flex flex-col">
      {/* Top navigation bar for the tenant site */}
      <Navbar />

      {/* Main content area grows to fill vertical space */}
      <div className="flex-1">
        {/* Constrain content to max width on large screens */}
        <div className="mx-w-(--breakpoint-xl) mx-auto">{children}</div>
      </div>

      {/* Footer with tenant-specific links and info */}
      <Footer />
    </div>
  );
};

export default Layout;
