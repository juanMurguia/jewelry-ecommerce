import Link from "next/link";
import { CheckCircle, Truck, Mail, ArrowRight } from "lucide-react";
import RootLayout from "@/components/layout";

export default function ThankYouPage() {
  return (
    <RootLayout>
      <div className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-8 items-center mx-auto text-center">
          <h1 className="text-4xl text-red-500 mb-4">Payment Failed</h1>
          <p className="text-xl text-gray-300 mb-8">
            Unfortunately, your payment was not successful. Please try again or
            contact support if the issue persists.
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
