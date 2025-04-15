import { Navbar } from "./navbar";

// LayoutProps - Props accepted by the layout component
interface LayoutProps {
  children: React.ReactNode; // The main page content to be rendered within the layout
}

// Layout - Defines the layout for the (home) segment of the app
const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Persistent Navbar displayed at the top of every page */}
      <Navbar />

      {/* Render the main content passed from the specific route */}
      {children}
    </div>
  );
};

export default Layout;
