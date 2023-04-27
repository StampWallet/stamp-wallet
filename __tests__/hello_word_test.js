import React from "react";
import { render, screen } from "react-native-testing-library";
import "@testing-library/jest-native/extend-expect";

import TestScreen from "../src/screens/TestScreen";

describe("hello world", () => {
  it("should be false", () => {
    expect(false).toBeTruthy();
  });
  it("displays passed name", () => {
    const page = render(<TestScreen name="Test" />);
    expect(page.getByText("Hello, Test")).toBeVisible();
  });
});
