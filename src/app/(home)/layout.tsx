import { Footer } from "./footer";
import { Navbar } from "./navbar";

// LayoutProps - Props accepted by the Layout component
interface LayoutProps {
  children: React.ReactNode; // Main content to be rendered within the layout
}

// Layout - Defines the page structure with Navbar, content area, and Footer
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Top navigation bar (persistent across pages) */}
      <Navbar />

      {/* Main content area (dynamic page content) */}
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>

      {/* Bottom footer (static across pages) */}
      <Footer />
    </div>
  );
};

export default Layout;
