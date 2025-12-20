import type { InputHTMLAttributes } from "react";
import type { VariantProps } from "class-variance-authority";
import type { inputVariants } from "./input.variants";

type NativeInputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size">;

export interface InputProps
  extends NativeInputProps,
    VariantProps<typeof inputVariants> {
  hasError?: boolean;
}
