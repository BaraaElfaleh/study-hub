import React from "react";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
  /** Visual style of the button */
  variant?: "primary" | "accent" | "glass";
  /** Show a loading spinner and disable the button */
  isLoading?: boolean;
  /** Expand the button to the full width of its container */
  fullWidth?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = "primary",
      isLoading = false,
      fullWidth = false,
      className = "",
      children,
      disabled,
      ...props
    },
    ref
  ) => {
    const baseClasses =
      "relative inline-flex items-center justify-center font-medium rounded-premium transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand-primary disabled:opacity-50 disabled:cursor-not-allowed select-none px-6 py-2.5";

    const variantClasses: Record<string, string> = {
      primary:
        "bg-brand-primary text-white shadow-md hover:brightness-110 active:scale-[0.98]",
      accent:
        "bg-brand-accent text-gray-900 shadow-md hover:brightness-110 active:scale-[0.98]",
      glass:
        "glass text-text-main hover:bg-white/10 active:scale-[0.98]",
    };

    const widthClass = fullWidth ? "w-full" : "";
    const isDisabled = disabled || isLoading;

    return (
      <button
        ref={ref}
        disabled={isDisabled}
        className={`${baseClasses} ${variantClasses[variant]} ${widthClass} ${className}`}
        {...props}
      >
        {/* Keep children in flow so button size remains stable */}
        <span className={isLoading ? "invisible" : ""}>{children}</span>
        {isLoading && (
          <span className="absolute inset-0 flex items-center justify-center">
            <Spinner />
          </span>
        )}
      </button>
    );
  }
);

Button.displayName = "Button";

/** Small animated loading indicator */
const Spinner = () => (
  <svg
    className="animate-spin h-5 w-5 text-current"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    aria-hidden="true"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    />
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    />
  </svg>
);

export default Button;