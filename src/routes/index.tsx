import { BrowserRouter, Routes, Route } from "react-router-dom";

import App from "../pages/App";
import Calendar from "../pages/Calendar";

function routes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/calendar" element={<Calendar />} />
      </Routes>
    </BrowserRouter>
  );
}

export default routes;
