import React from "react";

const Button = ({ children }) => {
  return (
    <button className="bg-primary hover:bg-white hover:text-primary  border-2 border-primary rounded-md px-3 py-1 text-white text-xs leading-0 flex gap-2 justify-start items-center w-max h-max">
      {children}
    </button>
  );
};

export default Button;
