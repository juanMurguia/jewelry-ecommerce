import Link from "next/link";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function HeroSection() {
  return (
    <div className="min-h-screen bg-black text-white w-full ">
      <div className="relative w-full flex flex-col min-h-[80vh] items-center justify-center px-4">
        <div className="relative">
          <div className="text-center">
            <Image
              src="/hero-section.webp"
              alt="Meet the glamour"
              width={500}
              height={800}
              className="object-contain w-full h-full ratio-4/5"
            />
          </div>
        </div>
        <div className="bottom-12 left-0 flex w-full justify-center space-x-4 gap-4">
          <Button
            variant="outline"
            className="border-white bg-white text-gray-950 hover:bg-white cursor-pointer"
          >
            CHOOSING JEWELRY
          </Button>
          <Button
            variant="outline"
            className="border-white bg-transparent text-white hover:bg-white hover:text-black cursor-pointer"
          >
            LEARN THE HISTORY
          </Button>
        </div>
      </div>
    </div>
  );
}
