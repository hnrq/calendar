import { createReducer } from "@reduxjs/toolkit";

import * as actions from "./actions";

export interface Reminder {
  id: string;
  label: string;
  city: string;
  dateTime: number;
}

const initialState: Reminder[] = [];

const remindersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.createReminder, (state, action) => {
      const insertionIndex = state.findIndex(
        (reminder) => reminder.dateTime > action.payload.dateTime
      );
      const uuid = crypto.randomUUID();
      const reminder = { id: uuid, ...action.payload };

      if (insertionIndex === -1) state.push(reminder);
      else state.splice(insertionIndex, 0, reminder);
    })
    .addCase(actions.editReminder, (state, action) => {
      const reminderIndex = state.findIndex(
        (reminder) => reminder.id === action.payload.id
      );

      state.splice(reminderIndex, 1, action.payload);
    })
    .addCase(actions.deleteReminder, (state, action) => {
      const reminderIndex = state.findIndex(
        (reminder) => reminder.id === action.payload
      );

      state.splice(reminderIndex, 1);
    });
});

export default remindersReducer;
