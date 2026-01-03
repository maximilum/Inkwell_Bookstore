import React from "react";

const Button = ({ children }) => {
  return (
    <button className="bg-primary rounded-md px-3 py-1 text-white text-xs leading-0 flex gap-2 justify-start items-center w-max">
      {children}
    </button>
  );
};

export default Button;
