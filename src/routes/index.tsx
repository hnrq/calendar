import { useMemo } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";

import Modal from "components/Modal";
import Calendar, { CalendarRoute } from "pages/Calendar";
import DayPage, { DayRoute } from "pages/Day";
import ReminderPage, { ReminderRoute } from "pages/Reminder";

const RoutesComponent = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = useMemo(() => location.state, [location]) as {
    from?: Location;
  };

  return (
    <>
      <Routes location={state?.from || location}>
        <Route path={CalendarRoute} element={<Calendar />} />
        <Route path={ReminderRoute} element={<ReminderPage />} />
      </Routes>
      <Modal
        open={Boolean(state?.from)}
        onClose={() => navigate(CalendarRoute)}
      >
        <Routes>
          <Route path={ReminderRoute} element={<ReminderPage />} />
          <Route path={DayRoute} element={<DayPage />} />
        </Routes>
      </Modal>
    </>
  );
};

export default RoutesComponent;
