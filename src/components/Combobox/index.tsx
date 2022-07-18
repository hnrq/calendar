import { FC } from "react";
import { FieldValues, useController } from "react-hook-form";
import ComboboxWidget, {
  ComboboxProps as ComboboxWidgetProps,
} from "react-widgets/Combobox";

import classNames from "classnames";

import "./index.scss";

export type ComboboxProps = {
  helperText?: string;
  error?: boolean;
  name: string;
} & FieldValues &
  ComboboxWidgetProps;

const Combobox: FC<ComboboxProps> = ({
  helperText,
  error,
  className,
  name,
  rules,
  shouldUnregister,
  defaultValue,
  control,
  ...comboboxProps
}) => {
  const { field } = useController({
    name,
    rules,
    shouldUnregister,
    defaultValue,
    control,
  });

  return (
    <div className="combobox">
      <ComboboxWidget
        {...comboboxProps}
        value={field.value}
        onBlur={field.onBlur}
        onChange={(value) => field.onChange({ target: { value } })}
        inputProps={{
          className: classNames("combobox__input", className),
          field,
        }}
      />
      <span
        className={classNames("combobox__helper-text ml-1", {
          "combobox__helper-text--error": error,
          "combobox__helper-text--hidden": !Boolean(helperText),
        })}
      >
        {helperText}
      </span>
    </div>
  );
};

export default Combobox;
