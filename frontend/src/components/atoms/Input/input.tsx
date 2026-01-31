import * as React from "react";
import { type InputProps } from "./input.types";

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>((props, ref) => {
  return <input ref={ref} {...props} />;
});

Input.displayName = "Input";
