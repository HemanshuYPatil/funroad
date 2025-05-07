import Link from "next/link";
import { Button } from "./ui/button";

// StripeVerify - Renders a button linking to the Stripe account verification page
export const StripeVerify = () => {
  return (
    <Link href={"/stripe-verify"}>
      <Button>Verify your account</Button>
    </Link>
  );
};
