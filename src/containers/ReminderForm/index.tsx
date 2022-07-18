import { FC } from "react";
import { useForm } from "react-hook-form";

import { City, useCitySearch, useWeather, Weather } from "api/weatherApi";
import Button from "components/Button";
import Combobox from "components/Combobox";
import TextField from "components/TextField";
import { Reminder } from "reducers/reminders";
import { useDebounce } from "use-debounce";

import "./index.scss";

export interface ReminderFormProps {
  onSubmit: (reminder: FormValues) => void;
  defaultValues?: Partial<Omit<Reminder, "id">>;
}

interface FormValues {
  label: string;
  city: City;
  weather?: Weather;
  date: string;
  time: string;
}

const ReminderForm: FC<ReminderFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, formState, handleSubmit, control, watch } =
    useForm<FormValues>({
      mode: "onBlur",
      defaultValues,
    });
  const query = watch("city");

  const [debouncedQuery] = useDebounce(query as unknown as string, 500);
  const { data, loading } = useCitySearch(debouncedQuery, {
    data: defaultValues && defaultValues.city ? [defaultValues.city] : [],
  });
  const { get } = useWeather();

  return (
    <form
      className="reminder-form"
      onSubmit={handleSubmit(async (values) => {
        const weather = await get(values.city);
        onSubmit({ ...values, weather });
      })}
    >
      <TextField
        helperText={formState.errors?.label?.message}
        error={formState.errors?.label !== undefined}
        placeholder="Label"
        {...register("label", {
          required: "Label is required",
          validate: (value: string) =>
            value.length < 30 || "Label should have 30 characters or less",
        })}
      />
      <Combobox
        hideCaret
        hideEmptyPopup
        data={data}
        name="city"
        dataKey="id"
        textField="name"
        busy={loading}
        style={{ width: "300px" }}
        helperText={formState.errors?.city?.message}
        error={formState.errors?.city !== undefined}
        filter={() => true}
        placeholder="Search for a city"
        rules={{
          required: "City is required",
          validate: (value: string | City) =>
            typeof value !== "string" ||
            "You should select a city from the dropdown",
        }}
        control={control}
      />
      <TextField
        helperText={formState.errors?.date?.message}
        error={formState.errors?.date !== undefined}
        type="date"
        placeholder="Date"
        {...register("date", {
          required: "Date is required",
        })}
      />
      <TextField
        helperText={formState.errors?.time?.message}
        error={formState.errors?.time !== undefined}
        placeholder="Time"
        type="time"
        {...register("time", {
          required: "Time is required",
        })}
      />
      <Button className="py-2" type="submit">
        Save Reminder
      </Button>
    </form>
  );
};

export default ReminderForm;
