import { FC, MouseEventHandler, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import classNames from "classnames";
import Reminder from "components/Reminder";
import { format } from "date-fns";
import { motion } from "framer-motion";
import { CalendarRoute } from "pages/Calendar";
import { ReminderRoute } from "pages/Reminder";
import { Reminder as ReminderType } from "reducers/reminders";

import "./index.scss";

export interface DayOfMonthProps {
  date: Date;
  reminders: ReminderType[];
  onClick: MouseEventHandler<HTMLDivElement>;
  className?: string | string[];
}

const DayOfMonth: FC<DayOfMonthProps> = ({
  date,
  reminders,
  onClick,
  className,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={classNames("day-of-month p-1", className)}
      onClick={onClick}
    >
      <span className="day-of-month__label mb-1">{date.getDate()}</span>
      <motion.div
        initial="closed"
        animate="open"
        className="day-of-month__reminders"
        variants={{
          open: {
            transition: { staggerChildren: 0.2, delayChildren: 0.05 },
          },
        }}
      >
        {reminders.map((reminder) => (
          <motion.div
            key={reminder.id}
            variants={{
              open: { opacity: 1 },
              closed: { opacity: 0 },
            }}
          >
            <Reminder
              reminder={reminder}
              onClick={(e: MouseEvent<HTMLDivElement>) => {
                e.stopPropagation();
                navigate(
                  {
                    pathname: ReminderRoute,
                    search: new URLSearchParams({
                      date: format(date, "yyyy-MM-dd"),
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
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DayOfMonth;
