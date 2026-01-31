import * as React from "react";
import { Input } from "../../atoms/Input";

export interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  (props, ref) => {
    return <Input ref={ref} shape="pill" {...props} />;
  },
);

SearchInput.displayName = "SearchInput";
