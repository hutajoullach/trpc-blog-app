import React from "react";

type CustomButtonProps = {
  type: "button" | "submit" | "reset" | undefined;
  title: string;
  handleClick: () => void;
  styles?: string;
};

const CustomButton = ({
  type,
  title,
  handleClick,
  styles,
}: CustomButtonProps) => {
  return (
    <button
      type={type}
      className={`font-epilogue rounded-md px-4 text-[16px] leading-[26px] text-white ${styles}`}
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default CustomButton;
