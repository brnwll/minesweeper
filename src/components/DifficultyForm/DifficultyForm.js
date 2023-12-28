import { useState } from "react";
import { EASY, MEDIUM, HARD } from "../../helpers/Constants";

const Settings = ({ onDifficultyChange }) => {
  const [selected, setSelected] = useState(EASY);

  const onChange = (e) => {
    const { value } = e.target;
    onDifficultyChange(value);
    setSelected(value);
  };

  return (
    <form>
      <input
        type="radio"
        name="difficulty"
        id={EASY}
        value={EASY}
        checked={selected === EASY}
        onChange={onChange}
      />
      <label htmlFor={EASY}>Easy</label>
      <input
        type="radio"
        name="difficulty"
        id={MEDIUM}
        value={MEDIUM}
        checked={selected === MEDIUM}
        onChange={onChange}
      />
      <label htmlFor={MEDIUM}>Medium</label>
      <input
        type="radio"
        name="difficulty"
        id={HARD}
        value={HARD}
        checked={selected === HARD}
        onChange={onChange}
      />
      <label htmlFor={HARD}>Hard</label>
    </form>
  );
};

export default Settings;
