import React from 'react';

export function ProductsBackground() {
  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden bg-gradient-to-b from-[#EBF4FF] via-white to-[#EBF4FF]">
      <div className="relative w-full max-w-[1360px] mx-auto h-full">
        {/* 1. Top-Right (Crab) */}
        <div className="absolute -top-10 -right-20 w-96 h-96 animate-float-slow">
          <img
            src="/images/line-art/crab.svg"
            alt="Crab Line Art"
            className="w-full h-full object-contain opacity-40"
          />
        </div>

        {/* 2. Center-Left (Squid) */}
        <div className="absolute top-1/3 -left-32 w-80 h-80 animate-float-delayed">
          <img
            src="/images/line-art/squid.svg"
            alt="Squid Line Art"
            className="w-full h-full object-contain opacity-40"
          />
        </div>

        {/* 3. Bottom-Right (Shellfish) */}
        <div className="absolute bottom-10 -right-20 w-72 h-72 animate-float-slow">
          <img
            src="/images/line-art/shellfish.svg"
            alt="Shellfish Line Art"
            className="w-full h-full object-contain opacity-40"
          />
        </div>

        {/* 4. Bottom-Left (Jellyfish) */}
        <div className="absolute bottom-40 -left-20 w-64 h-64 animate-float-delayed">
          <img
            src="/images/line-art/jellyfish.svg"
            alt="Jellyfish Line Art"
            className="w-full h-full object-contain opacity-40"
          />
        </div>
      </div>
    </div>
  );
}
