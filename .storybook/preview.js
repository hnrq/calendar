import "../src/sass/app.scss";

const modalRoot = document.createElement("div");
modalRoot.setAttribute("id", "modal-root");
document.body.append(modalRoot);

export const parameters = {
  actions: { argTypesRegex: "^on[A-Z].*" },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
};
