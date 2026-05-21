import React from "react";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Apply the glassmorphic utility instead of the default surface style */
  isGlass?: boolean;
}

// 1. تعريف نوع مخصص لـ Card يدمج الـ forwardRef مع المكونات الفرعية
type CardComponent = React.ForwardRefExoticComponent<CardProps & React.RefAttributes<HTMLDivElement>> & {
  Header: typeof CardHeader;
  Content: typeof CardContent;
  Footer: typeof CardFooter;
};

// 2. إنشاء المكون الأساسي وإسناده للنوع المخصص باستخدام (as CardComponent)
const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ isGlass = false, className = "", children, ...props }, ref) => {
    const baseStyles = isGlass
      ? "glass"
      : "bg-brand-surface rounded-premium shadow-deep";

    return (
      <div
        ref={ref}
        className={`${baseStyles} transition-all duration-200 ${className}`}
        {...props}
      >
        {children}
      </div>
    );
  }
) as CardComponent;

Card.displayName = "Card";

// مكونات فرعية (Sub-components)
const CardHeader = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`px-6 py-4 border-b border-text-muted/10 ${className}`}
    {...props}
  >
    {children}
  </div>
);
CardHeader.displayName = "Card.Header";

const CardContent = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div className={`px-6 py-4 ${className}`} {...props}>
    {children}
  </div>
);
CardContent.displayName = "Card.Content";

const CardFooter = ({
  className = "",
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) => (
  <div
    className={`px-6 py-4 border-t border-text-muted/10 ${className}`}
    {...props}
  >
    {children}
  </div>
);
CardFooter.displayName = "Card.Footer";

// 3. ربط المكونات الفرعية بالمكون الأساسي (الآن TypeScript يراها وموافق عليها تماماً)
Card.Header = CardHeader;
Card.Content = CardContent;
Card.Footer = CardFooter;

export default Card;