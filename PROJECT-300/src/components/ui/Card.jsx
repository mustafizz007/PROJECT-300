// src/components/ui/Card.jsx

import React from "react";

export function Card({ children, className = "" }) {
  return (
    <div
      className={`rounded-lg border border-gray-700 bg-gray-800 p-4 shadow-sm ${className}`}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className = "" }) {
  return (
    <div className={`mb-2 border-b border-gray-600 pb-2 ${className}`}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className = "" }) {
  return (
    <h2 className={`text-lg font-semibold text-white ${className}`}>
      {children}
    </h2>
  );
}

export function CardContent({ children, className = "" }) {
  return <div className={`text-sm text-gray-300 ${className}`}>{children}</div>;
}
