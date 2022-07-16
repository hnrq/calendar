import { FC, ButtonHTMLAttributes } from "react";

import classNames from "classnames";

import "./index.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary";
  fullWidth?: boolean;
  children: string;
}

const Button: FC<ButtonProps> = ({
  variant = "primary",
  fullWidth,
  children,
  className,
  ...htmlButtonProps
}) => (
  <button
    className={classNames("button", className, {
      "button--full-width": fullWidth,
      "button--primary": variant === "primary",
      "button--secondary": variant === "secondary",
    })}
    {...htmlButtonProps}
  >
    {children}
  </button>
);

export default Button;
