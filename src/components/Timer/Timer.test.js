import Timer from "./Timer";
import { screen, render } from "@testing-library/react";
import { NOT_STARTED, PLAYING } from "../../helpers/Constants";

const setup = (gameState) => {
  render(<Timer gameState={gameState} />);
};

describe("Timer", () => {
  setup(NOT_STARTED);
  test("should render 0:00 when game is not started", () => {
    expect(screen.getByText("0:00")).toBeVisible();
  });
});
