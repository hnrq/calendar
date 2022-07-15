import { MemoryRouter } from "react-router-dom";

import reminders from "__mocks__/reminders";
import { render, fireEvent } from "@testing-library/react";

import DayOfMonth, { DayOfMonthProps } from ".";

const defaultProps = {
  date: new Date(),
  onClick: jest.fn(),
  reminders,
};

const renderDayOfMonth = (props?: Partial<DayOfMonthProps>) =>
  render(<DayOfMonth {...defaultProps} {...props} />, {
    wrapper: MemoryRouter,
  });

describe("<DayOfMonth />", () => {
  it("renders the day of month", () => {
    const dayOfMonth = 15;
    const date = new Date(2021, 10, dayOfMonth);

    const { getByText } = renderDayOfMonth({ date });

    expect(getByText(dayOfMonth)).toBeInTheDocument();
  });

  it("renders reminders", () => {
    const { getByText } = renderDayOfMonth();

    reminders.forEach((reminder) => {
      expect(getByText(reminder.label)).toBeInTheDocument();
    });
  });

  it("redirects to /reminder?id={reminderId} when clicking a reminder", () => {
    const reminder = reminders[0];
    const date = new Date(2021, 10, 21);

    const { getByText } = renderDayOfMonth({ date });

    fireEvent.click(getByText(reminder.label));
  });
});
