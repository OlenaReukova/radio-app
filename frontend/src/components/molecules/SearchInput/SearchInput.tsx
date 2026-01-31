import * as React from "react";
import { Input } from "../../atoms/Input";
import { cn } from "../../ui/utils";
import { Search, X } from "lucide-react";

export type SearchInputProps = React.InputHTMLAttributes<HTMLInputElement>;

export const SearchInput = React.forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, value: controlledValue, onChange, ...props }, ref) => {
    const [internalValue, setInternalValue] = React.useState<string>(
      typeof controlledValue === "string" ? controlledValue : "",
    );

    React.useEffect(() => {
      if (typeof controlledValue === "string") {
        setInternalValue(controlledValue);
      }
    }, [controlledValue]);

    const showClear = internalValue.length > 0;

    return (
      <div className="relative w-full group">
        {/* Left search icon */}
        <Search
          size={20}
          className="absolute left-3 top-1/2 -translate-y-1/2
          text-purple-300/50 transition-colors
          group-focus-within:text-purple-300"
        />

        {/* Input */}
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

        {/* Clear button */}
        {showClear && (
          <button
            type="button"
            onClick={() => {
              setInternalValue("");
            }}
            className="absolute right-3 top-1/2 -translate-y-1/2
            text-purple-300/50 hover:text-purple-300
            transition-colors"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
