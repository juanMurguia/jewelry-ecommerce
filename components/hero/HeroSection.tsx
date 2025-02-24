import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <div className="min-h-screen text-white w-full bg-[url('/bg-hero.webp')] bg-cover bg-center bg-no-repeat">
      <div className="relative w-full flex flex-col min-h-[100vh] items-center justify-end sm:justify-end px-4 py-30 sm:py-20 gap-8">
        <div className="flex flex-col sm:flex-col w-full justify-center items-center gap-8 ">
          <h1 className="text-4xl sm:text-6xl font-serif text-center">
            Meet the glamour.
          </h1>
          <div className="flex flex-col sm:flex-row gap-4">
            <Link href="/products">
              <Button
                variant="primary"
                className="flex w-full sm:w-auto text-center  justify-center gap-2 border-1 border-[#DBA958] text-gray-950  !bg-[#DBA958] hover:!bg-white cursor-pointer no-underline "
              >
                Discover Collections
                <ArrowRight></ArrowRight>
              </Button>
            </Link>
            <Link href="#about-us">
              <Button
                variant="outline"
                className="border-white w-full sm:w-auto text-center bg-transparent text-white hover:bg-white hover:text-black cursor-pointer"
              >
                Learn our history
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
