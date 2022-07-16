import mockReminders from "__mocks__/reminders";
import _ from "lodash";

import remindersReducer from ".";
import * as actions from "./actions";

describe("remindersReducer", () => {
  it("handles reminders/createReminder action", () => {
    expect(
      _.omit(
        remindersReducer(
          [],
          actions.createReminder(_.omit(mockReminders[0], "id"))
        )[0],
        "id"
      )
    ).toEqual(_.omit(mockReminders[0], "id"));
  });

  it("handles reminders/editReminder action", () => {
    expect(
      remindersReducer(
        [mockReminders[0], mockReminders[3]],
        actions.editReminder({
          ...mockReminders[2],
          id: mockReminders[0].id,
        })
      )
    ).toEqual([
      {
        ...mockReminders[2],
        id: mockReminders[0].id,
      },
      mockReminders[3],
    ]);
  });

  it("handles reminders/deleteReminder action", () => {
    expect(
      remindersReducer(
        [mockReminders[3]],
        actions.deleteReminder(mockReminders[3].id)
      )
    ).toEqual([]);
  });
});
