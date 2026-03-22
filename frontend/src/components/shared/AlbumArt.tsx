import { useState, useEffect } from "react";
import { Radio } from "lucide-react";
import { cva } from "class-variance-authority";
import { cn } from "@/components/ui/utils";
import type { HTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";

export const albumArtVariants = cva(
  "relative overflow-hidden rounded-lg shrink-0",
  {
    variants: {
      size: {
        sm: "w-10 h-10",
        md: "w-16 h-16",
        lg: "w-[120px] h-[120px]",
      },
      glow: {
        true: "shadow-[0_0_24px_rgba(224,84,255,0.4)]",
        false: "",
      },
    },
    defaultVariants: {
      size: "md",
      glow: false,
    },
  },
);

export interface AlbumArtProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof albumArtVariants> {
  src?: string;
  alt: string;
}

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
