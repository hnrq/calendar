import mockReminders from "__mocks__/reminders";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { format } from "date-fns";
import _ from "lodash";

import ReminderForm, { ReminderFormProps } from ".";

const renderReminderForm = (props?: Partial<ReminderFormProps>) =>
  render(<ReminderForm onSubmit={jest.fn()} {...props} />);

describe("<ReminderForm />", () => {
  it("renders a label input field", () => {
    const { getByPlaceholderText } = renderReminderForm();
    expect(getByPlaceholderText("Label")).toBeInTheDocument();
  });

  it("renders a city input field", () => {
    const { getByPlaceholderText } = renderReminderForm();
    expect(getByPlaceholderText("City")).toBeInTheDocument();
  });

  it("renders a date input field", () => {
    const { getByPlaceholderText } = renderReminderForm();
    expect(getByPlaceholderText("Date")).toBeInTheDocument();
  });

  it("renders a time input field", () => {
    const { getByPlaceholderText } = renderReminderForm();
    expect(getByPlaceholderText("Time")).toBeInTheDocument();
  });

  it("renders a Save Reminder button", () => {
    const { getByText } = renderReminderForm();
    expect(getByText("Save Reminder")).toBeInTheDocument();
  });

  it("calls onSubmit if the form has been successfully submitted", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText } = renderReminderForm({
      onSubmit,
    });

    fireEvent.input(getByPlaceholderText("Label"), {
      target: { value: mockReminders[0].label },
    });
    fireEvent.input(getByPlaceholderText("City"), {
      target: { value: mockReminders[0].city },
    });
    fireEvent.input(getByPlaceholderText("Date"), {
      target: { value: mockReminders[0].date },
    });
    fireEvent.input(getByPlaceholderText("Time"), {
      target: { value: mockReminders[0].time },
    });

    fireEvent.click(getByText("Save Reminder"));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });
  });

  it("sets initial values for the fields if provided", () => {
    const { getByPlaceholderText } = renderReminderForm({
      defaultValues: _.omit(mockReminders[0], "id"),
    });

    expect((getByPlaceholderText("Label") as HTMLInputElement).value).toBe(
      mockReminders[0].label
    );
    expect((getByPlaceholderText("City") as HTMLInputElement).value).toBe(
      mockReminders[0].city
    );
    expect((getByPlaceholderText("Date") as HTMLInputElement).value).toBe(
      mockReminders[0].date
    );
    expect((getByPlaceholderText("Time") as HTMLInputElement).value).toBe(
      mockReminders[0].time
    );
  });

  describe("validations", () => {
    it("requires Label to have 30 characters or less", async () => {
      const { getByPlaceholderText, getByText } = renderReminderForm();
      fireEvent.input(getByPlaceholderText("Label"), {
        target: { value: Array.from({ length: 31 }).fill("a").join("") },
      });
      fireEvent.blur(getByPlaceholderText("Label"));

      await waitFor(() => {
        expect(
          getByText("Label should have 30 characters or less")
        ).toBeInTheDocument();
      });
    });

    it("requires Label field to be filled", async () => {
      const { getByPlaceholderText, getByText } = renderReminderForm();
      fireEvent.focus(getByPlaceholderText("Label"));
      fireEvent.blur(getByPlaceholderText("Label"));

      await waitFor(() => {
        expect(getByText("Label is required")).toBeInTheDocument();
      });
    });

    it("requires City field to be filled", async () => {
      const { getByPlaceholderText, getByText } = renderReminderForm();
      fireEvent.focus(getByPlaceholderText("City"));
      fireEvent.blur(getByPlaceholderText("City"));

      await waitFor(() => {
        expect(getByText("City is required")).toBeInTheDocument();
      });
    });

    it("requires Date field to be filled", async () => {
      const { getByPlaceholderText, getByText } = renderReminderForm();
      fireEvent.focus(getByPlaceholderText("Date"));
      fireEvent.blur(getByPlaceholderText("Date"));

      await waitFor(() => {
        expect(getByText("Date is required")).toBeInTheDocument();
      });
    });

    it("requires Time field to be filled", async () => {
      const { getByPlaceholderText, getByText } = renderReminderForm();
      fireEvent.focus(getByPlaceholderText("Time"));
      fireEvent.blur(getByPlaceholderText("Time"));

      await waitFor(() => {
        expect(getByText("Time is required")).toBeInTheDocument();
      });
    });
  });
});
