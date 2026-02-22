import React from "react";

const Button = ({ children, isFull = false }) => {
  return (
    <button
      className={`bg-primary hover:bg-white hover:text-primary  border-2 border-primary rounded-md px-3 py-1 text-white text-xs leading-0 flex gap-2 ${isFull ? "justify-center" : "justify-start"} items-center  h-max ${isFull ? "w-full" : "w-max"}`}
    >
      {children}
    </button>
  );
};

export default Button;
