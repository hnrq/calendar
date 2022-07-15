import { FC, MouseEventHandler, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";

import Reminder from "components/Reminder";
import { motion } from "framer-motion";
import { Reminder as ReminderType } from "reducers/reminders";

import "./index.scss";

export interface DayOfMonthProps {
  date: Date;
  reminders: ReminderType[];
  onClick: MouseEventHandler<HTMLDivElement>;
}

const DayOfMonth: FC<DayOfMonthProps> = ({ date, reminders, onClick }) => {
  const navigate = useNavigate();

  return (
    <div className="day-of-month p-1" onClick={onClick}>
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
                const params = new URLSearchParams({});
                navigate(`/reminder${params.toString()}`);
              }}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};

export default DayOfMonth;
