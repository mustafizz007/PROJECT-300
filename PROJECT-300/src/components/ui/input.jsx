import React from "react";

export function Input(props) {
  return (
    <input
      {...props}
      className={`border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-pink-300 ${
        props.className || ""
      }`}
    />
  );
}
