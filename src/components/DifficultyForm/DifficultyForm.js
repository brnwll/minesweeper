import { useState } from "react";
import { EASY, MEDIUM, HARD } from "../../helpers/Constants";
import "./DifficultyForm.css";

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
    <form id="difficultyForm">
      <div className="radio-wrapper selected">
        <label className={selected === EASY && "selected"} htmlFor={EASY}>
          Easy
        </label>
        <input
          type="radio"
          name="difficulty"
          id={EASY}
          value={EASY}
          checked={selected === EASY}
          onChange={onChange}
          onClick={onClick}
        />
      </div>

      <div className="radio-wrapper">
        <label className={selected === MEDIUM && "selected"} htmlFor={MEDIUM}>
          Medium
        </label>
        <input
          type="radio"
          name="difficulty"
          id={MEDIUM}
          value={MEDIUM}
          checked={selected === MEDIUM}
          onChange={onChange}
          onClick={onClick}
        />
      </div>

      <div className="radio-wrapper">
        <label className={selected === HARD && "selected"} htmlFor={HARD}>
          Hard
        </label>
        <input
          type="radio"
          name="difficulty"
          id={HARD}
          value={HARD}
          checked={selected === HARD}
          onChange={onChange}
          onClick={onClick}
        />
      </div>
    </form>
  );
};

export default Settings;
