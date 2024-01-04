import React from "react";
import Header from "./Header";
import { render, screen } from "@testing-library/react";
import { PLAYING } from "../../helpers/Constants";

const setup = (gameState = PLAYING) => {
  render(
    <Header
      gameState={gameState}
      bombsRemaining={10}
      difficultyChange={() => {}}
    />
  );
};

describe("Header", () => {
  test("should render the icon", () => {
    setup();
    const img = screen.getByAltText("Minesweeper");
    expect(img).toBeVisible();
    expect(img).toHaveAttribute("src", "header-logo.png");
  });
  test("should render the title", () => {
    setup();
    expect(screen.getByText("Minesweeper")).toBeVisible();
  });
  test("should render the DifficultyForm", () => {
    setup();
    expect(screen.getByText("Easy")).toBeVisible();
    expect(screen.getByText("Medium")).toBeVisible();
    expect(screen.getByText("Hard")).toBeVisible();
  });
  test("should render the Timer", () => {
    setup();
    expect(screen.getByText("0:00")).toBeVisible();
  });
});
