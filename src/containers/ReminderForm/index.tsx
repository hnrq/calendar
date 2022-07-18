import { FC, useEffect, useState } from "react";
import { useForm } from "react-hook-form";

import { autocompleteRegion, City } from "api/weatherApi";
import Button from "components/Button";
import Combobox from "components/Combobox";
import TextField from "components/TextField";
import { Reminder } from "reducers/reminders";
import { useDebounce } from "use-debounce";

import "./index.scss";

export interface ReminderFormProps {
  onSubmit: (reminder: FormValues) => void;
  defaultValues?: Omit<Reminder, "id">;
}

interface FormValues {
  label: string;
  city: City;
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
  const [result, setResult] = useState<City[]>(
    defaultValues ? [defaultValues.city] : []
  );

  useEffect(() => {
    let active = true;
    load();
    return () => {
      active = false;
    };

    async function load() {
      if (typeof debouncedQuery === "string") {
        const result = await autocompleteRegion(debouncedQuery);
        if (!active) return;
        setResult(result);
      }
    }
  }, [debouncedQuery]);
  return (
    <form className="reminder-form" onSubmit={handleSubmit(onSubmit)}>
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
        data={result}
        name="city"
        dataKey="locationKey"
        textField="name"
        helperText={formState.errors?.city?.message}
        error={formState.errors?.city !== undefined}
        placeholder="City"
        rules={{ required: "City is required" }}
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
