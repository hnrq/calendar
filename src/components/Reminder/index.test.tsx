import reminders from "__mocks__/reminders";
import { render, fireEvent } from "@testing-library/react";
import { format } from "date-fns";

import Reminder, { ReminderProps } from ".";

const defaultProps = {
  reminder: reminders[0],
  onClick: jest.fn(),
};

const renderReminder = (
  props?: Partial<{
    reminder: Partial<ReminderProps["reminder"]>;
    onClick: ReminderProps["onClick"];
  }>
) =>
  render(
    <Reminder
      reminder={{ ...defaultProps.reminder, ...props?.reminder }}
      onClick={props?.onClick ?? defaultProps.onClick}
    />
  );

describe("<Reminder />", () => {
  it("renders a label", () => {
    const label = "Wash clothes";
    const { getByText } = renderReminder({ reminder: { label } });

    expect(getByText(label)).toBeInTheDocument();
  });

  it("renders a time", () => {
    const dateTime = new Date().getTime();
    const { getByText } = renderReminder({ reminder: { dateTime } });

    expect(getByText(format(dateTime, "HH:mm"))).toBeInTheDocument();
  });

  it("calls onClick function when clicked ", () => {
    const onClick = jest.fn();
    const label = "label";
    const { getByText } = renderReminder({ onClick, reminder: { label } });

    fireEvent.click(getByText(label));

    expect(onClick).toHaveBeenCalled();
  });
});
