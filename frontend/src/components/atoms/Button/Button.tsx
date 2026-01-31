import * as React from "react";
import {
  Button as UIButton,
  type ButtonProps as UIButtonProps,
} from "../../ui/button";

export type ButtonProps = UIButtonProps;

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (props, ref) => {
    return <UIButton ref={ref} {...props} />;
  },
);

Button.displayName = "Button";
