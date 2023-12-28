import { useState } from "react";
import { EASY, MEDIUM, HARD } from "../helpers/Constants";

const options = {
  [EASY]: {
    rows: 8, // 8
    cols: 8, // 8
    bombs: 3, // 10
  },
  [MEDIUM]: {
    rows: 16,
    cols: 16,
    bombs: 40,
  },
  [HARD]: {
    rows: 16,
    cols: 31,
    bombs: 99,
  },
};

const useDifficulty = () => {
  const [difficulty, setDifficulty] = useState(options[EASY]);
  const update = (difficulty) => setDifficulty(options[difficulty]);
  return [difficulty, update];
};

export default useDifficulty;
