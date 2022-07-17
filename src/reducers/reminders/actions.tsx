import { createAction } from "@reduxjs/toolkit";

import { Reminder } from ".";

export const createReminder = createAction<Omit<Reminder, "id">>(
  "reminders/createReminder"
);
export const editReminder = createAction<{
  currentDate: string;
  reminder: Reminder;
}>("reminders/editReminder");
export const deleteReminder = createAction<Reminder>(
  "reminders/deleteReminder"
);
