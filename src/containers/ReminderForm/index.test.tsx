import mockReminders from "__mocks__/reminders";
import { render, fireEvent, waitFor } from "@testing-library/react";
import * as weatherApi from "api/weatherApi";
import _ from "lodash";

import ReminderForm, { ReminderFormProps } from ".";

const renderReminderForm = (props?: Partial<ReminderFormProps>) =>
  render(<ReminderForm onSubmit={jest.fn()} {...props} />);

describe("<ReminderForm />", () => {
  beforeEach(() => {
    jest.spyOn(weatherApi, "useCitySearch").mockReturnValue({
      data: [mockReminders[0].city],
    } as unknown as ReturnType<typeof weatherApi.useCitySearch>);
  });

  it("renders a label input field", async () => {
    const { findByPlaceholderText } = renderReminderForm();
    expect(await findByPlaceholderText("Label")).toBeInTheDocument();
  });

  it("renders a city input field", async () => {
    const { findByPlaceholderText } = renderReminderForm();
    expect(
      await findByPlaceholderText("Search for a city")
    ).toBeInTheDocument();
  });

  it("renders a date input field", async () => {
    const { findByPlaceholderText } = renderReminderForm();
    expect(await findByPlaceholderText("Date")).toBeInTheDocument();
  });

  it("renders a time input field", async () => {
    const { findByPlaceholderText } = renderReminderForm();
    expect(await findByPlaceholderText("Time")).toBeInTheDocument();
  });

  it("renders a Save Reminder button", async () => {
    const { findByText } = renderReminderForm();
    expect(await findByText("Save Reminder")).toBeInTheDocument();
  });

  it("calls onSubmit if the form has been successfully submitted", async () => {
    const onSubmit = jest.fn();
    const { getByPlaceholderText, getByText, findByText } = renderReminderForm({
      onSubmit,
    });

    fireEvent.input(getByPlaceholderText("Label"), {
      target: { value: mockReminders[0].label },
    });
    fireEvent.focus(getByPlaceholderText("Search for a city"));
    fireEvent.input(getByPlaceholderText("Search for a city"), {
      target: { value: mockReminders[0].city },
    });
    fireEvent.click(await findByText(mockReminders[0].city.name));
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

  it("sets initial values for the fields if provided", async () => {
    const { findByPlaceholderText } = renderReminderForm({
      defaultValues: _.omit(mockReminders[0], "id"),
    });

    expect(
      ((await findByPlaceholderText("Label")) as HTMLInputElement).value
    ).toBe(mockReminders[0].label);
    expect(
      ((await findByPlaceholderText("Search for a city")) as HTMLInputElement)
        .value
    ).toBe(mockReminders[0].city.name);
    expect(
      ((await findByPlaceholderText("Date")) as HTMLInputElement).value
    ).toBe(mockReminders[0].date);
    expect(
      ((await findByPlaceholderText("Time")) as HTMLInputElement).value
    ).toBe(mockReminders[0].time);
  });

  describe("validations", () => {
    it("requires Label to have 30 characters or less", async () => {
      const { getByPlaceholderText, findByText } = renderReminderForm();
      fireEvent.input(getByPlaceholderText("Label"), {
        target: { value: Array.from({ length: 31 }).fill("a").join("") },
      });
      fireEvent.blur(getByPlaceholderText("Label"));

      expect(
        await findByText("Label should have 30 characters or less")
      ).toBeInTheDocument();
    });

    it("requires Label field to be filled", async () => {
      const { getByPlaceholderText, findByText } = renderReminderForm();
      fireEvent.focus(getByPlaceholderText("Label"));
      fireEvent.blur(getByPlaceholderText("Label"));

      expect(await findByText("Label is required")).toBeInTheDocument();
    });

    it("requires City field to be filled", async () => {
      const { getByPlaceholderText, findByText } = renderReminderForm();
      fireEvent.focus(getByPlaceholderText("Search for a city"));
      fireEvent.blur(getByPlaceholderText("Search for a city"));

      expect(await findByText("City is required")).toBeInTheDocument();
    });

    it("requires Date field to be filled", async () => {
      const { getByPlaceholderText, findByText } = renderReminderForm();
      fireEvent.focus(getByPlaceholderText("Date"));
      fireEvent.blur(getByPlaceholderText("Date"));

      expect(await findByText("Date is required")).toBeInTheDocument();
    });

    it("requires Time field to be filled", async () => {
      const { getByPlaceholderText, findByText } = renderReminderForm();
      fireEvent.focus(getByPlaceholderText("Time"));
      fireEvent.blur(getByPlaceholderText("Time"));

      expect(await findByText("Time is required")).toBeInTheDocument();
    });
  });
});
