import Image from "next/image";

export default function AboutUs() {
  return (
    <div className="py-16 px-16 min-h-dvh" id="about-us">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-12">
            <h2 className="font-serif text-gray-100 text-4xl leading-tight md:text-5xl lg:text-6xl">
              Jewelry carries a powerful story.
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="font-serif pb-3 text-lg font-medium tracking-widest">
                  GOLD
                </h3>
                <p className="text-sm text-gray-200">
                  Her provision acuteness had two why intention.
                </p>
              </div>
              <div>
                <h3 className="font-serif pb-3 text-lg font-medium tracking-widest">
                  SILVER
                </h3>
                <p className="text-sm text-gray-200">
                  Her provision acuteness had two why intention.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h3 className="font-serif text-lg font-medium">Our Story</h3>
              <p className="text-sm text-gray-200">
                Modern jewelry is made of gold, silver, or platinum, often with
                precious or semiprecious stones.
              </p>
            </div>
            <div className="relative h-64 w-full md:h-80 ">
              <Image
                src="/gold-ring.webp"
                alt="Gold ring with diamond"
                fill
                className="object-contain text-lg hanging-animation"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
