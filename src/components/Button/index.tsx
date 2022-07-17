import { FC, ButtonHTMLAttributes, PropsWithChildren } from "react";

import classNames from "classnames";

import "./index.scss";

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "icon";
  fullWidth?: boolean;
}

const Button: FC<PropsWithChildren<ButtonProps>> = ({
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
      "button--icon": variant === "icon",
    })}
    {...htmlButtonProps}
  >
    {children}
  </button>
);

export default Button;
