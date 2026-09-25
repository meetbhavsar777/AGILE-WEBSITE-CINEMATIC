"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

type CaseLogo = {
  name: string;
  src: string;
};

type CaseProps = {
  logos: CaseLogo[];
  heading?: string;
  /** Milliseconds between auto-advances. */
  interval?: number;
};

function Case({
  logos,
  heading = "Trusted by thousands of businesses worldwide",
  interval = 1000,
}: CaseProps) {
  const [api, setApi] = useState<CarouselApi>();
  // Auto-advance stops while the strip is hovered or focused (WCAG 2.2.2).
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (!api || paused) {
      return;
    }

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    // With `loop` enabled, scrollNext wraps from the last logo back to the
    // first without a visible rewind, so the strip scrolls forever.
    const timer = setInterval(() => api.scrollNext(), interval);

    return () => clearInterval(timer);
  }, [api, interval, paused]);

  return (
    <div className="w-full pt-12 pb-20 lg:pt-16 lg:pb-40">
      <div className="container mx-auto px-4">
        <div className="flex flex-col gap-10">
          <h2 className="text-xl md:text-3xl lg:text-5xl tracking-tighter lg:max-w-xl font-normal text-left">
            {heading}
          </h2>
          <Carousel
            setApi={setApi}
            opts={{ loop: true, align: "start" }}
            className="w-full"
            aria-label="Client logos"
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocusCapture={() => setPaused(true)}
            onBlurCapture={() => setPaused(false)}
          >
            <CarouselContent>
              {logos.map((logo) => (
                <CarouselItem
                  className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
                  key={logo.src}
                >
                  <div className="flex rounded-md aspect-[3/2] bg-muted items-center justify-center p-4">
                    <div className="relative h-full w-full">
                      <Image
                        src={logo.src}
                        alt={logo.name}
                        fill
                        sizes="(min-width: 1024px) 16vw, (min-width: 768px) 25vw, (min-width: 640px) 33vw, 50vw"
                        className="object-contain"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { Case, type CaseLogo };
