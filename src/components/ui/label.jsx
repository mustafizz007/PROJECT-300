// filepath: /Users/apurboshib/Desktop/Apurbo/PROJECT-300/PROJECT-300/src/components/ui/label.jsx
import React from "react";

export function Label({ children, className = "", ...props }) {
  return (
    <label
      className={`block font-medium text-gray-700 ${className}`}
      {...props}
    >
      {children}
    </label>
  );
}
