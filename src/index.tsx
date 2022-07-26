import React from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import { compose } from "redux";

import Main from "./Main";
import reducers from "./reducers";
import reportWebVitals from "./reportWebVitals";
import getStore from "./store/getStore";

// import main sass file
import "./sass/app.scss";

declare global {
  interface Window {
    devToolsExtension?: typeof compose;
  }
}

createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <ReduxProvider store={getStore(reducers)}>
      <Main />
    </ReduxProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
