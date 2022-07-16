import { render } from "@testing-library/react";

import TextField, { TextFieldProps } from ".";

const renderTextField = (props?: Partial<TextFieldProps>) =>
  render(<TextField {...props} />);

describe("<TextField />", () => {
  it("renders an input", () => {
    const placeholder = "Text field";
    const { getByPlaceholderText } = renderTextField({ placeholder });
    expect(getByPlaceholderText(placeholder).nodeName).toBe("INPUT");
  });

  it("renders a helper text if provided", () => {
    const helperText = "Should have a number";
    const { getByText } = renderTextField({ helperText });
    expect(getByText(helperText)).toBeInTheDocument();
  });

  it("adds text-field__helper-text--error class to helper text if props.error === true", () => {
    const helperText = "Should have a number";
    const { getByText } = renderTextField({ helperText, error: true });
    expect(getByText(helperText)).toHaveClass("text-field__helper-text--error");
  });
});
