import clsx from "clsx";
import React from "react";

type Props = {
  children: React.ReactNode;
  isActive?: boolean;
  className?: string;
};

const UnderlineButton = ({
  children,
  isActive = false,
  className = "",
}: Props) => {
  return (
    <button
      className={clsx(
        "text-sm relative dark:text-white text-black hover:text-gray-400 cursor-pointer transition-all ease-in-out before:transition-[width] before:ease-in-out before:duration-700 before:absolute before:bg-gray-400 before:origin-center before:h-px before:w-0 hover:before:w-[50%] before:bottom-0 before:left-[50%] after:transition-[width] after:ease-in-out after:duration-700 after:absolute after:bg-gray-400 after:origin-center after:h-px after:w-0 hover:after:w-[50%] after:bottom-0 after:right-[50%]",
        isActive && "border-b-2 border-gray-400",
        className,
      )}
    >
      {children}
    </button>
  );
};

export default UnderlineButton;
