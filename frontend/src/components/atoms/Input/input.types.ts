import * as React from "react";
import { type InputVariants } from "./input.variants";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement>, InputVariants {}
