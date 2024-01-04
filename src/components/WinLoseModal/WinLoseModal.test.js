import { render, screen } from "@testing-library/react";
import WinLoseModal from "./WinLoseModal";
import { WON, LOST } from "../../helpers/Constants";

const setup = (gameState) => {
  render(<WinLoseModal gameState={gameState} />);
};

describe("WinLoseModal", () => {
  test("should render 🎉 You won! 🎉 when game is won", () => {
    setup(WON);
    expect(screen.getByText("🎉 You won! 🎉")).toBeVisible();
  });
  test("should render 💥 You lost! 💥 when game is lost", () => {
    setup(LOST);
    expect(screen.getByText("💥 You lost! 💥")).toBeVisible();
  });
});
