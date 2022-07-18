import { FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useSearchParams } from "react-router-dom";

import Button from "components/Button";
import Reminder from "components/Reminder";
import { format } from "date-fns";
import { CalendarRoute } from "pages/Calendar";
import { ReminderRoute } from "pages/Reminder";
import { Reminder as ReminderType } from "reducers/reminders";
import { RootState } from "store/getStore";

import "./index.scss";

const Day: FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const date = useMemo(
    () => searchParams.get("date") ?? format(new Date(), "yyyy-MM-dd"),
    [searchParams]
  );
  const reminders = useSelector<RootState>(
    ({ reminders }) => reminders[date] ?? []
  ) as ReminderType[];

  return (
    <div className="day" style={{ width: "300px" }}>
      <div className="day__controls">
        <Button variant="icon">
          <span className="material-icons">add</span>
        </Button>
      </div>
      <h2 className="mb-2">
        {format(new Date(`${date}T00:00:00`), "LLL dd, yyyy")}
      </h2>
      <div className="day__reminders">
        {reminders.map((reminder) => (
          <Reminder
            onClick={() => {
              navigate(
                {
                  pathname: ReminderRoute,
                  search: new URLSearchParams({
                    date,
                    id: reminder.id,
                  }).toString(),
                },
                {
                  state: {
                    from: CalendarRoute,
                  },
                }
              );
            }}
            reminder={reminder}
          />
        ))}
        {reminders.length === 0 && (
          <span className="day__reminders-empty">No reminders in this day</span>
        )}
      </div>
    </div>
  );
};

export const DayRoute = "/day";

export default Day;
