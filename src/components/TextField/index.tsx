import { forwardRef, InputHTMLAttributes } from "react";

import classNames from "classnames";

import "./index.scss";

export interface TextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  helperText?: string;
  error?: boolean;
}

const TextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ helperText, error, className, ...inputProps }, ref) => (
    <div className="text-field">
      <input
        className={classNames("text-field__input p-1", className)}
        ref={ref}
        {...inputProps}
      />
      <span
        className={classNames("text-field__helper-text ml-1", {
          "text-field__helper-text--error": error,
          "text-field__helper-text--hidden": !Boolean(helperText),
        })}
      >
        {helperText}
      </span>
    </div>
  )
);

export default TextField;
