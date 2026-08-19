'use client';

import Link from 'next/link';
import Image from 'next/image';

export function AarongPromoBanners() {
  const leftImage = '/assets/images/ArongSections/D-Left-Living-Box-Banner1_24-02-2026-SM.webp';
  const rightImage = '/assets/images/ArongSections/D-Right-Dining-box-banner1-22-07-2025-SM.webp';

  return (
    <section className="w-full bg-background py-1">
      <div className="w-full px-4 lg:px-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2 lg:gap-3">
          
          {/* Left Banner */}
          <Link 
            href="/shop?category=home-decor" 
            className="group relative block aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/11] xl:aspect-[16/10] overflow-hidden bg-muted"
          >
            <Image
              src={leftImage}
              alt="Bronze ballad"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
              priority
            />
          </Link>

          {/* Right Banner */}
          <Link 
            href="/shop?category=home-decor" 
            className="group relative block aspect-[4/3] sm:aspect-[16/10] md:aspect-[4/3] lg:aspect-[16/11] xl:aspect-[16/10] overflow-hidden bg-muted"
          >
            <Image
              src={rightImage}
              alt="Tales in taupe"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition-transform duration-[1000ms] ease-out group-hover:scale-105"
              priority
            />
          </Link>

        </div>
      </div>
    </section>
  );
}
