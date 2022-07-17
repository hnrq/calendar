import { FC, MouseEventHandler } from "react";

import { Reminder as ReminderType } from "reducers/reminders";

import "./index.scss";

export interface ReminderProps {
  reminder: ReminderType;
  onClick: MouseEventHandler<HTMLDivElement>;
}

const Reminder: FC<ReminderProps> = ({ reminder, onClick }) => (
  <div className="reminder" onClick={onClick}>
    <span className="reminder__label">{reminder.label}</span>
    <span className="reminder__time">{reminder.time}</span>
  </div>
);

export default Reminder;
