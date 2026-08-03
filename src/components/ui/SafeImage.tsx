"use client";

import { useState, useEffect } from "react";
import Image, { type ImageProps } from "next/image";

interface SafeImageProps extends Omit<ImageProps, "onError"> {
  fallbackSrc?: string;
}

export function SafeImage({ src, alt, fallbackSrc = "/images/logos/origin-logo.svg", ...props }: SafeImageProps) {
  const [imgSrc, setImgSrc] = useState<string>(typeof src === "string" ? src : "/images/logos/origin-logo.svg");

  useEffect(() => {
    if (typeof src === "string") {
      setImgSrc(src);
    } else {
      setImgSrc(fallbackSrc);
    }
  }, [src, fallbackSrc]);

  return (
    <Image
      {...props}
      src={imgSrc || fallbackSrc}
      alt={alt || "Product placeholder"}
      onError={() => {
        setImgSrc(fallbackSrc);
      }}
    />
  );
}
