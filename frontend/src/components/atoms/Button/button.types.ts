//3. TypeScript/public API
import type { ButtonHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import { buttonVariants } from "./button.variants";

export interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  loading?: boolean;
}
