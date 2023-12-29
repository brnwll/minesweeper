import { useState } from "react";
import { EASY, MEDIUM, HARD } from "../../helpers/Constants";

const Settings = ({ difficultyChange }) => {
  const [selected, setSelected] = useState(EASY);

  const onChange = (e) => {
    const { value } = e.target;
    difficultyChange(value);
    setSelected(value);
  };

  const onClick = (e) => {
    const { value } = e.target;
    if (value === selected) {
      e.preventDefault();
      onChange(e);
    }
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
        onClick={onClick}
      />
      <label htmlFor={EASY}>Easy</label>
      <input
        type="radio"
        name="difficulty"
        id={MEDIUM}
        value={MEDIUM}
        checked={selected === MEDIUM}
        onChange={onChange}
        onClick={onClick}
      />
      <label htmlFor={MEDIUM}>Medium</label>
      <input
        type="radio"
        name="difficulty"
        id={HARD}
        value={HARD}
        checked={selected === HARD}
        onChange={onChange}
        onClick={onClick}
      />
      <label htmlFor={HARD}>Hard</label>
    </form>
  );
};

export default Settings;
