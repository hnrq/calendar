import { useEffect, useMemo, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams, useNavigate } from "react-router-dom";

import Button from "components/Button";
import ReminderForm from "containers/ReminderForm";
import { CalendarRoute } from "pages/Calendar";
import { createReminder, editReminder } from "reducers/reminders/actions";
import { RootState } from "store/getStore";

import "./index.scss";

const ReminderPage = () => {
  const [searchParams] = useSearchParams();
  const id = useMemo(() => searchParams.get("id"), [searchParams]);
  const date = useMemo(() => searchParams.get("date") ?? "", [searchParams]);
  const reminder = useSelector((state: RootState) =>
    state.reminders[date]?.find((reminder) => reminder.id === id)
  );
  const reminderExists = useMemo(() => reminder !== undefined, [reminder]);
  const [editMode, setEditMode] = useState(!reminderExists);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setEditMode(!reminderExists);
    return () => {
      setEditMode(false);
    };
  }, [reminderExists]);

  return (
    <div className="reminder-page container-sm" style={{ maxWidth: "300px" }}>
      {editMode && (
        <>
          {reminder !== undefined && (
            <div className="reminder-page__form-controls">
              <Button onClick={() => setEditMode(false)} variant="icon">
                <span className="material-icons">navigate_before</span>
              </Button>
            </div>
          )}
          <h2 className="reminder-page__form-title mb-2">
            {reminderExists ? "Edit" : "Create"} reminder
          </h2>

          <ReminderForm
            defaultValues={reminder}
            onSubmit={(formValues) => {
              if (reminder !== undefined) {
                dispatch(
                  editReminder({
                    currentDate: date,
                    reminder: { id: reminder.id, ...formValues },
                  })
                );
                setEditMode(false);
                navigate(
                  {
                    pathname: ReminderRoute,
                    search: new URLSearchParams({
                      date: formValues.date,
                      id: reminder.id,
                    }).toString(),
                  },
                  { state: { from: CalendarRoute } }
                );
              } else {
                dispatch(createReminder(formValues));
                navigate(CalendarRoute);
              }
            }}
          />
        </>
      )}
      {!editMode && (
        <>
          <Button
            onClick={() => setEditMode(true)}
            variant="icon"
            className="reminder-page__edit-button"
          >
            <span className="material-icons">edit</span>
          </Button>
          <h2 className="reminder-page__label mb-1">{reminder?.label}</h2>
          <span className="reminder-page__date">
            {reminder?.date}, {reminder?.time}
          </span>
          <span className="reminder-page__city">{reminder?.city}</span>
        </>
      )}
    </div>
  );
};

export const ReminderRoute = "/reminder";

export default ReminderPage;
