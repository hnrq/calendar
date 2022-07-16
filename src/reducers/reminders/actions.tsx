import { createAction } from "@reduxjs/toolkit";

import { Reminder } from ".";

export const createReminder = createAction<Omit<Reminder, "id">>(
  "reminders/createReminder"
);
export const editReminder = createAction<Reminder>("reminders/editReminder");
export const deleteReminder = createAction<string>("reminders/deleteReminder");
