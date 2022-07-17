import { FC } from "react";
import { useForm } from "react-hook-form";

import Button from "components/Button";
import TextField from "components/TextField";
import format from "date-fns/format";
import _ from "lodash";
import { Reminder } from "reducers/reminders";

import "./index.scss";

export interface ReminderFormProps {
  onSubmit: (reminder: FormValues) => void;
  defaultValues?: Omit<Reminder, "id">;
}

interface FormValues {
  label: string;
  city: string;
  date: string;
  time: string;
}

const ReminderForm: FC<ReminderFormProps> = ({ onSubmit, defaultValues }) => {
  const { register, formState, handleSubmit } = useForm<FormValues>({
    mode: "onBlur",
    defaultValues,
  });

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
      <TextField
        helperText={formState.errors?.city?.message}
        error={formState.errors?.city !== undefined}
        placeholder="City"
        {...register("city", {
          required: "City is required",
        })}
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
