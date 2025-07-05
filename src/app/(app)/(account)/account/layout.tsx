import { Navbar } from "@/modules/home/ui/components/navbar";
import { Footer } from "@/modules/home/ui/components/footer";
import { getQueryClient, trpc } from "@/trpc/server";
import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { ReactNode } from "react";

interface AccountLayoutProps {
  children: ReactNode;
}

export default async function AccountLayout({ children }: AccountLayoutProps) {
  const queryClient = getQueryClient();

  // Fetch session data on server
  const session = await queryClient.fetchQuery(
    trpc.auth.session.queryOptions()
  );

  const isLoggedIn = !!session?.user;

  return (
    <div className="flex flex-col min-h-screen">
      {/* <Navbar /> */}

      <main className="flex-1 bg-[#F4F4F0]">
        <HydrationBoundary state={dehydrate(queryClient)}>
          {isLoggedIn ? children : <LoginPrompt />}
        </HydrationBoundary>
      </main>

      {/* <Footer /> */}
    </div>
  );
}

// You can move this to a shared file if reused
function LoginPrompt() {
  return (
    <div className="px-4 lg:px-12 py-16 flex flex-col items-center justify-center min-h-[60vh]">
      <div className="max-w-md w-full bg-white border rounded-lg p-8 text-center">
        <div className="mb-6">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">🔒</span>
          </div>
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">
            Access Required
          </h2>
          <p className="text-gray-600">
            Please log in to access your account settings and manage your
            profile.
          </p>
        </div>

        <div className="space-y-3">
          <button className="w-full h-11 bg-black text-white rounded-full hover:bg-gray-800">
            Log In
          </button>
          <button className="w-full h-11 border border-gray-300 rounded-full bg-transparent hover:bg-gray-50 text-black">
            Create Account
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-4">
          Don't have an account? Sign up to get started.
        </p>
      </div>
    </div>
  );
}
