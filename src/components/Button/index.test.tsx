import { render } from "@testing-library/react";

import Button, { ButtonProps } from ".";

const renderButton = (props: ButtonProps) => render(<Button {...props} />);

describe("<Button />", () => {
  it("renders content", () => {
    const content = "Label";
    const { getByText } = renderButton({ children: content });

    expect(getByText(content)).toBeInTheDocument();
  });

  it("renders with full width if props.fullWidth === true", () => {
    const content = "Label";
    const { getByText } = renderButton({ children: content, fullWidth: true });

    expect(getByText(content)).toHaveClass("button--full-width");
  });

  it("renders with .primary class by default", () => {
    const content = "Label";
    const { getByText } = renderButton({ children: content });

    expect(getByText(content)).toHaveClass("button--primary");
  });

  it("renders with .secondary class if variant === secondary", () => {
    const content = "Label";
    const { getByText } = renderButton({
      children: content,
      variant: "secondary",
    });

    expect(getByText(content)).toHaveClass("button--secondary");
  });
});
