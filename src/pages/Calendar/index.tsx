import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import Button from "components/Button";
import DayOfMonth from "components/DayOfMonth";
import { format, isSameMonth, isToday } from "date-fns";
import { DayRoute } from "pages/Day";
import { ReminderRoute } from "pages/Reminder";
import { RootState } from "store/getStore";
import { getDaysOfCalendarMonth } from "utils/date";

import "./index.scss";

const Calendar: FC = () => {
  const [date, setDate] = useState({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  });
  const reminders = useSelector((state: RootState) => state.reminders);
  const navigate = useNavigate();

  const daysOfMonth = useMemo(
    () => getDaysOfCalendarMonth(date.month, date.year),
    [date]
  );

  return (
    <div className="calendar p-2 container-lg">
      <div className="calendar__controls mb-1">
        <Button
          variant="icon"
          onClick={() =>
            setDate(({ month, year }) => {
              if (month === 0) return { month: 11, year: year - 1 };
              else return { month: month - 1, year };
            })
          }
        >
          <span className="material-icons">navigate_before</span>
        </Button>
        <Button
          variant="icon"
          onClick={() =>
            setDate(({ month, year }) => {
              if (month === 11) return { month: 0, year: year + 1 };
              else return { month: month + 1, year };
            })
          }
        >
          <span className="material-icons">navigate_next</span>
        </Button>
        <Button
          className="ml-3 calendar__today"
          onClick={() => {
            const today = new Date();
            setDate({
              month: today.getMonth(),
              year: today.getFullYear(),
            });
          }}
        >
          Today
        </Button>
        <Button
          className="ml-3 calendar__today"
          onClick={() => {
            navigate(
              {
                pathname: ReminderRoute,
              },
              { state: { from: CalendarRoute } }
            );
          }}
        >
          New Reminder
        </Button>
        <h1 className="calendar__controls-label">
          {format(new Date(date.year, date.month), "LLLL, yyyy")}
        </h1>
      </div>
      <div className="calendar__header">
        {Array.from({ length: 7 }).map((_, index) => (
          <span>{format(daysOfMonth[index], "EEE")}</span>
        ))}
      </div>
      <div className="calendar__days-of-month">
        {daysOfMonth.map((day) => (
          <DayOfMonth
            date={day}
            key={day.getTime()}
            reminders={reminders[format(day, "yyyy-MM-dd")] ?? []}
            className={classNames({
              "day-of-month--different-month": !isSameMonth(
                day,
                new Date(date.year, date.month)
              ),
              "day-of-month--today": isToday(day),
            })}
            onClick={() => {
              navigate(
                {
                  pathname: DayRoute,
                  search: new URLSearchParams({
                    date: format(day, "yyyy-MM-dd"),
                  }).toString(),
                },
                { state: { from: CalendarRoute } }
              );
            }}
          />
        ))}
      </div>
    </div>
  );
};

export const CalendarRoute = "/calendar";

export default Calendar;
