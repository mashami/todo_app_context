import React from "react";
import classNames from "classnames";

interface ButtonProps {
  variant: "primary" | "secondary";
  text: string;
  onClick: () => void;
}

const Button = ({ variant, text, onClick }: ButtonProps) => {
  const classNameCondition = classNames("py-3", {
    "bg-blue-500": variant === "primary",
    "bg-red-500": variant === "secondary",
  });

  return (
    <div>
      <button className={classNameCondition} onClick={onClick}>
        {text}
      </button>
    </div>
  );
};

export default Button;
