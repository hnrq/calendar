import { FC, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import Button from "components/Button";
import DayOfMonth from "components/DayOfMonth";
import { format, isSameMonth, isWeekend } from "date-fns";
import { DayRoute } from "pages/Day";
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
      <h1>Calendar</h1>
      <div className="calendar__year-controls">
        <Button
          variant="secondary"
          onClick={() => setDate((date) => ({ ...date, year: date.year - 1 }))}
        >
          <span className="material-icons">navigate_before</span>
        </Button>
        <span>{date.year}</span>
        <Button
          variant="secondary"
          onClick={() => setDate((date) => ({ ...date, year: date.year + 1 }))}
        >
          <span className="material-icons">navigate_next</span>
        </Button>
      </div>

      <div className="calendar__month-controls">
        <Button
          variant="secondary"
          onClick={() =>
            setDate(({ month, year }) => {
              if (month === 0) return { month: 11, year: year - 1 };
              else return { month: month - 1, year };
            })
          }
        >
          <span className="material-icons">navigate_before</span>
        </Button>
        <span>{format(new Date(date.year, date.month), "LLLL")}</span>
        <Button
          variant="secondary"
          onClick={() =>
            setDate(({ month, year }) => {
              if (month === 11) return { month: 0, year: year + 1 };
              else return { month: month + 1, year };
            })
          }
        >
          <span className="material-icons">navigate_next</span>
        </Button>
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
              "day-of-month--weekend": isWeekend(day),
              "day-of-month--different-month": !isSameMonth(
                day,
                new Date(date.year, date.month)
              ),
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
