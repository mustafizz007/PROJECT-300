import React from "react";

export function Avatar({ className, children }) {
  return (
    <div className={`rounded-full overflow-hidden ${className}`}>
      {children}
    </div>
  );
}

export function AvatarImage({ src, alt }) {
  return <img src={src} alt={alt} className="h-full w-full object-cover" />;
}

export function AvatarFallback({ children }) {
  return (
    <div className="flex items-center justify-center h-full w-full bg-gray-700">
      {children}
    </div>
  );
}

export default function Header() {
  return (
    <header className="bg-gray-900 text-white p-4">
      <h1>Admin Dashboard</h1>
    </header>
  );
}
