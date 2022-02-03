import React from "react";
import { render } from "@testing-library/react";
import { Provider } from "react-redux";
import { store } from "../app/store";


export default function renderWithRedux(ui: React.ReactNode) {
  return {
    ...render(
      <Provider store={store}>
        {ui}
      </Provider>
    )
  }
}