import mockReminders from "__mocks__/reminders";
import _ from "lodash";

import remindersReducer from ".";
import * as actions from "./actions";

describe("remindersReducer", () => {
  it("handles reminders/createReminder action", () => {
    expect(
      _.omit(
        remindersReducer(
          {},
          actions.createReminder(_.omit(mockReminders[0], "id"))
        )[mockReminders[0].date][0],
        "id"
      )
    ).toEqual(_.omit(mockReminders[0], "id"));
  });

  describe("reminders/editReminder", () => {
    it("handles editing reminder and keeping same date", () => {
      expect(
        remindersReducer(
          { [mockReminders[0].date]: [mockReminders[0], mockReminders[3]] },
          actions.editReminder({
            currentDate: mockReminders[0].date,
            reminder: {
              ...mockReminders[2],
              id: mockReminders[0].id,
            },
          })
        )
      ).toEqual({
        [mockReminders[0].date]: [
          {
            ...mockReminders[2],
            id: mockReminders[0].id,
          },
          mockReminders[3],
        ],
      });
    });

    it("handles moving reminder to new date", () => {
      const newDate = "10-12-2022";
      expect(
        remindersReducer(
          { [mockReminders[0].date]: [mockReminders[0], mockReminders[3]] },
          actions.editReminder({
            currentDate: mockReminders[0].date,
            reminder: {
              ...mockReminders[2],
              id: mockReminders[0].id,
              date: newDate,
            },
          })
        )
      ).toEqual({
        [mockReminders[0].date]: [mockReminders[3]],
        [newDate]: [
          {
            ...mockReminders[2],
            id: mockReminders[0].id,
            date: newDate,
          },
        ],
      });
    });
  });

  it("handles reminders/deleteReminder action", () => {
    expect(
      remindersReducer(
        { [mockReminders[3].date]: [mockReminders[3]] },
        actions.deleteReminder(mockReminders[3])
      )
    ).toEqual({
      [mockReminders[3].date]: [],
    });
  });
});
