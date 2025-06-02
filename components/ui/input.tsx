import * as React from "react";
import { cn } from "@/lib/utils";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  icon?: React.ReactNode;
  position?: "left" | "right"; // Optional prop to specify icon position
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, icon, position, ...props }, ref) => {
    return (
      <div className="relative w-full">
        {icon && (
          <span
            className={cn(
              "absolute top-1/2 -translate-y-1/2 text-muted-foreground",
              position === "left" ? "left-3" : "right-3"
            )}
          >
            {icon}
          </span>
        )}
        <input
          type={type}
          className={cn(
            "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
            icon && "pl-10", // Add left padding if icon is present
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

Input.displayName = "Input";

export { Input };
