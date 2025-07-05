import { Footer } from "@/modules/home/ui/components/footer";
import { Navbar } from "@/modules/home/ui/components/navbar";
import { getQueryClient, trpc } from "@/trpc/server";
import { dehydrate } from "@tanstack/react-query";
import { ClientOnlyFilters } from "@/modules/home/ui/components/search-filters/createdynamic";
import { SearchFilters } from "@/modules/home/ui/components/search-filters";
import { usePathname } from "next/navigation";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout = async ({ children }: LayoutProps) => {
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery(trpc.categories.getMany.queryOptions());
  const dehydratedState = dehydrate(queryClient);
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <ClientOnlyFilters dehydratedState={dehydratedState} />
      {/* <SearchFilters /> */}
      <div className="flex-1 bg-[#F4F4F0]">{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;