import * as React from "react";
import { Input } from "../../atoms/Input";

export type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value: controlledValue, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(
      controlledValue ?? "",
    );

    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue]);

    return (
      <Input
        ref={ref}
        shape="pill"
        value={internalValue}
        onChange={(e) => {
          setInternalValue(e.target.value);
          onChange?.(e);
        }}
        {...props}
      />
    );
  },
);

SearchInput.displayName = "SearchInput";
