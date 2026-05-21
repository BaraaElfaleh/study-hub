import React, { useId } from "react";

interface InputProps extends React.ComponentPropsWithoutRef<"input"> {
  /** Text label displayed above the input */
  label?: string;
  /** Error message displayed below the input, triggers invalid styles */
  error?: string;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, className = "", id, ...props }, ref) => {
    const uniqueId = useId();
    const inputId = id || uniqueId;
    const errorId = `${inputId}-error`;

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="mb-1.5 block text-sm font-medium text-text-main"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          aria-invalid={error ? "true" : undefined}
          aria-describedby={error ? errorId : undefined}
          className={`
            w-full rounded-premium border px-4 py-2.5 
            bg-brand-surface text-text-main placeholder:text-text-muted/60
            transition-all duration-200
            focus-visible:outline-none focus-visible:ring-2
            disabled:cursor-not-allowed disabled:opacity-50
            ${
              error
                ? "border-red-500 focus-visible:border-red-500 focus-visible:ring-red-500/20"
                : "border-text-muted/20 focus-visible:border-brand-primary focus-visible:ring-brand-primary/20"
            }
            ${className}
          `}
          {...props}
        />
        {error && (
          <p id={errorId} className="mt-1.5 text-sm text-red-500" role="alert">
            {error}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";
export default Input;