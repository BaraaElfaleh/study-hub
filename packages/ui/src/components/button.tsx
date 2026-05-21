import React from "react";
import { cn } from "../utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "outline" | "ghost";
  size?: "sm" | "md" | "lg" | "icon";
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center font-medium rounded-xl transition active:scale-95",
        "focus:outline-none", 

        // التعديل: إضافة حجم خاص بالأيقونات
        size === "sm" && "px-3 py-1.5 text-sm",
        size === "md" && "px-4 py-2 text-sm",
        size === "lg" && "px-6 py-3 text-base",
        size === "icon" && "w-12 h-12 rounded-full",// حجم ثابت ودائري للأيقونات

        variant === "primary" && "bg-primary text-white hover:opacity-90 shadow-sm",
        variant === "outline" && "border border-border bg-transparent hover:bg-surface",
        variant === "ghost" && "hover:bg-surface text-text-main",

        className
      )}
      {...props}
    />
  );
}