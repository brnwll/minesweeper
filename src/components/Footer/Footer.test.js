import React from "react";
import Footer from "./Footer";
import { render, screen } from "@testing-library/react";

describe("Footer", () => {
  test('should render "Created by" text', () => {
    render(<Footer />);
    expect(screen.getByText("Created by")).toBeVisible();
  });

  test("should contain a link to the GitHub repo", () => {
    render(<Footer />);
    expect(screen.getByText("brnwll")).toHaveAttribute(
      "href",
      "https://github.com/brnwll/minesweeper"
    );
  });
});
