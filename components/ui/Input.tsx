import React from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  variant?: "default" | "outline" | "primary" | "secondary";
  inputSize?: "small" | "medium" | "large"; // Renamed to avoid conflict
}

const Input: React.FC<InputProps> = ({
  variant = "default",
  inputSize = "medium",
  className = "",
  ...props
}) => {
  const baseClasses =
    "w-full rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2";

  const variantClasses: Record<NonNullable<InputProps["variant"]>, string> = {
    default: "border border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    outline:
      "border-2 border-gray-300 focus:border-blue-500 focus:ring-blue-500",
    primary: "border border-blue-500 focus:border-blue-600 focus:ring-blue-500",
    secondary:
      "border border-gray-500 focus:border-gray-600 focus:ring-gray-500",
  };

  const sizeClasses: Record<NonNullable<InputProps["inputSize"]>, string> = {
    small: "px-3 py-1 text-sm",
    medium: "px-4 py-2 text-base",
    large: "px-4 py-3 text-lg",
  };

  const classes =
    `${baseClasses} ${variantClasses[variant]} ${sizeClasses[inputSize]} ${className}`.trim();

  return <input className={classes} {...props} />;
};

export default Input;
