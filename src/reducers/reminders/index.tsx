import { createReducer } from "@reduxjs/toolkit";

import * as actions from "./actions";

export interface Reminder {
  id: string;
  label: string;
  city: string;
  date: string;
  time: string;
}

const initialState: Record<string, Reminder[]> = {};

const remindersReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.createReminder, (state, action) => {
      if (state[action.payload.date] === undefined)
        state[action.payload.date] = [];
      const insertionIndex = state[action.payload.date].findIndex(
        (reminder) => reminder.time > action.payload.time
      );
      const uuid = crypto.randomUUID();
      const reminder = { id: uuid, ...action.payload };

      if (insertionIndex === -1) state[action.payload.date].push(reminder);
      else state[action.payload.date].splice(insertionIndex, 0, reminder);
    })
    .addCase(actions.editReminder, (state, action) => {
      const { currentDate, reminder } = action.payload;
      const reminderIndex = state[currentDate].findIndex(
        ({ id }) => id === reminder.id
      );

      if (currentDate === reminder.date)
        state[reminder.date].splice(reminderIndex, 1, reminder);
      else {
        if (state[reminder.date] === undefined) state[reminder.date] = [];
        const insertionIndex = state[reminder.date].findIndex(
          ({ time }) => time > reminder.time
        );

        state[currentDate].splice(reminderIndex, 1);
        state[reminder.date].splice(insertionIndex, 0, reminder);
      }
    })
    .addCase(actions.deleteReminder, (state, action) => {
      const reminderIndex = state[action.payload.date].findIndex(
        (reminder) => reminder.id === action.payload.id
      );

      state[action.payload.date].splice(reminderIndex, 1);
    });
});

export default remindersReducer;
