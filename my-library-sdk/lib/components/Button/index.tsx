import React from "react";
import "./index.css";
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
}

export function JaydeepButton({text, ...props}: ButtonProps) {
  const {className, ...restProps} = props;
  return (
    <button className={`${className} my-button`} {...restProps}>
      {text}
    </button>
  );
}
