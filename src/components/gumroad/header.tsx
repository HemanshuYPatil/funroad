"use client"; // if using Next.js App Router

import React from "react";
import { usePathname } from "next/navigation"; // or use react-router-dom's useLocation
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";
import { useQuery } from "@tanstack/react-query";
import { useTRPC } from "@/trpc/client";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["700"],
});

const Header = () => {
  const pathname = usePathname();
  const DOMAIN = "example.com"; // adjust as needed
  const trpc = useTRPC(); // Access the tRPC client
  const session = useQuery(trpc.auth.session.queryOptions());
  const signedIn = false; // replace with actual auth state
  const isCurrentPage = (path: string, customCheck?: () => boolean) =>
    pathname === path || customCheck?.();

  const NavLink = ({
    text,
    path,
    category,
    context,
    currentPagePredicate,
  }: {
    text: string;
    path: string;
    category?: "button";
    context?: "primary";
    currentPagePredicate?: () => boolean;
  }) => {
    const current = isCurrentPage(path, currentPagePredicate);

    const buttonStyles =
      text === "Dashboard"
        ? "lg:bg-[#FFC900] lg:text-black lg:hover:bg-white lg:hover:text-black"
        : context !== "primary"
          ? "lg:border-l-gray-600 lg:bg-black lg:text-white lg:hover:bg-white lg:hover:text-black lg:hover:bg-pink dark:lg:border-l-white/[.35] dark:lg:bg-black dark:lg:text-white"
          : "lg:bg-[#FFC900] lg:text-black lg:hover:bg-white lg:hover:text-black";

    const sharedButtonStyles =
      "border-black bg-black text-lg text-white no-underline transition-colors duration-200 hover:bg-pink hover:text-white lg:w-auto lg:border-l lg:px-6 " +
      (context === "primary" && text !== "Dashboard"
        ? "dark:lg:bg-pink dark:lg:text-white dark:lg:hover:bg-white"
        : "dark:lg:hover:bg-white dark:lg:hover:text-white");

    const linkStyles = current
      ? "border-black lg:bg-black lg:text-white dark:lg:bg-white dark:lg:text-white"
      : "border-transparent lg:bg-transparent lg:text-white dark:lg:text-white";

    return (
      <a
        href={path}
        className={
          category === "button"
            ? `flex w-full items-center justify-center h-full px-6 ${buttonStyles} ${sharedButtonStyles}`
            : `flex w-full items-center justify-center border ${linkStyles} bg-black p-4 text-lg text-white no-underline transition-all duration-200 hover:border-white lg:w-auto lg:rounded-full lg:py-2 lg:px-4 dark:text-white lg:dark:hover:border-white/[.35]`
        }
      >
        {text}
      </a>
    );
  };

  const LogoLink = () => (
    <span className={cn("text-5xl text-white font-semibold", poppins.className)}>
      funroad
    </span>
  );

  const ToggleButton = () => (
    <div className="flex items-center lg:hidden">
      <button
        className="relative flex h-8 w-8 flex-col items-center justify-center focus:outline-none"
        data-toggle="mobile-menu"
      >
        <div
          className="mb-1 h-0.5 w-8 origin-center bg-black transition-transform duration-200 dark:bg-white"
          data-menu-line="1"
        />
        <div
          className="mt-1 h-0.5 w-8 origin-center bg-black transition-transform duration-200 dark:bg-white"
          data-menu-line="2"
        />
      </button>
    </div>
  );

  const NavLinks = () => (
    <div className="flex flex-col justify-center items-center lg:flex-row lg:gap-1 lg:px-6">
      <NavLink text="Discover" path="/discover" />
      <NavLink
        text="Blog"
        path="/blog"
        currentPagePredicate={() => pathname.startsWith("/blog")}
      />
      <NavLink text="Pricing" path="/pricing" />
      <NavLink text="Features" path="/features" />
      <NavLink
        text="About"
        path="/about"
        currentPagePredicate={() => pathname === "/"}
      />
    </div>
  );

  const AuthLinks = () => (
    <div className="flex flex-col lg:flex-row lg:h-full">
      {session.data?.user ? (
        <NavLink
          text="Dashboard"
          path={`/home`}
          category="button"
          context="primary"
        />
      ) : (
        <>
          <NavLink text="Log in" path="/sign-in" category="button" />
          <NavLink
            text="Start selling"
            path="/sign-up"
            category="button"
            context="primary"
          />
        </>
      )}
    </div>
  );

  return (
    <>
      <div className="justify-between bg-black border-b border-black top-0 left-0 right-0 z-50 pr-4 pl-4 h-20 sticky flex lg:pl-8 lg:pr-0 dark:bg-black dark:border-b-white/[.35]">
        <div className="flex items-center">
          <LogoLink />

         
        </div>

        <div className="override hidden lg:flex lg:items-center text-white">
          {/* <NavLinks /> */}
          <AuthLinks />
        </div>

        <ToggleButton />
      </div>

      <div
        className="override hidden justify-between border-b border-black flex-col top-20 left-0 right-0 z-50 sticky bg-black dark:border-white/[.35]"
        id="mobile-menu"
      >
        <NavLinks />
        <AuthLinks />
      </div>
    </>
  );
};

export default Header;
