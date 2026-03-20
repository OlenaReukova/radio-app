import { useState, useEffect } from "react";
import { Radio } from "lucide-react";
import { cn } from "../../ui/utils";
import { albumArtVariants } from "./albumArt.variants";
import type { AlbumArtProps } from "./AlbumArt.types";

export function AlbumArt({
  src,
  alt,
  size,
  glow,
  className,
  ...props
}: AlbumArtProps) {
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    setHasError(false);
  }, [src]);

  const showFallback = !src || hasError;

  return (
    <div
      role="img"
      aria-label={alt}
      className={cn(albumArtVariants({ size, glow }), className)}
      {...props}
    >
      {showFallback ? (
        <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-[#2B2038] to-[#1a1025]">
          <Radio className="w-1/2 h-1/2 text-purple-400/60" />
        </div>
      ) : (
        <img
          src={src}
          alt={alt}
          className="w-full h-full object-cover"
          onError={() => setHasError(true)}
        />
      )}
    </div>
  );
}
