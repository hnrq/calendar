import {
  configureStore,
  Middleware,
  ReducersMapObject,
} from "@reduxjs/toolkit";
import remindersReducer from "reducers/reminders";
import thunk from "redux-thunk";

export interface RootState {
  reminders: ReturnType<typeof remindersReducer>;
}

const localStorageMiddleware: Middleware<{}, RootState> =
  (store) => (next) => (action) => {
    const result = next(action);
    localStorage.setItem(
      "reminders",
      JSON.stringify(store.getState().reminders)
    );
    return result;
  };

const enhancers = [];

if (process.env.NODE_ENV === "development") {
  const devToolsExtension = window.devToolsExtension;

  if (typeof devToolsExtension === "function") {
    enhancers.push(devToolsExtension());
  }
}

export default function getStore(reducer: ReducersMapObject) {
  const store = configureStore({
    reducer,

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(thunk).prepend(localStorageMiddleware),
  });
  return store;
}
