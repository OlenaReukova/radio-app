import * as React from "react";
import { Input } from "../../atoms/Input";
import { cn } from "../../ui/utils";

export type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value: controlledValue, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState(
      controlledValue ?? "",
    );

    React.useEffect(() => {
      if (controlledValue !== undefined) {
        setInternalValue(controlledValue);
      }
    }, [controlledValue]);

    return (
      <div className="relative w-full">
        <Input
          ref={ref}
          shape="pill"
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            onChange?.(e);
          }}
          className={cn("pl-10 pr-10", className)}
          {...props}
        />
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
