import Link from "next/link";
import { CheckCircle, Truck, Mail, ArrowRight } from "lucide-react";
import RootLayout from "@/components/layout";

export default function ThankYouPage() {
  return (
    <RootLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 items-center mx-auto text-center">
          <div className="mb-8">
            <CheckCircle className="mx-auto h-16 w-16 text-amber-200" />
          </div>
          <h1 className="text-4xl  text-gray-100 mb-4">
            Thank You for Your Purchase
          </h1>
          <p className="text-xl text-gray-300 mb-8">
            We're thrilled that you've chosen our jewelry. Your order has been
            received and is being processed.
          </p>

          <div className="space-y-4">
            <Link
              href="/"
              className="inline-flex items-center justify-center px-6 py-3 underline text-base font-medium rounded-md text-gray-400"
            >
              Home
            </Link>
          </div>
        </div>
      </div>
    </RootLayout>
  );
}
