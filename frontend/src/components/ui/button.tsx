import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";

const buttonVariants = cva("rounded-full px-4 py-2 font-medium transition", {
  variants: {
    variant: {
      primary: "bg-accent text-white hover:opacity-90",
      outline: "border border-accent text-accent",
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> &
  VariantProps<typeof buttonVariants>;

export function Button({ variant, className, ...props }: ButtonProps) {
  return (
    <button className={buttonVariants({ variant, className })} {...props} />
  );
}
