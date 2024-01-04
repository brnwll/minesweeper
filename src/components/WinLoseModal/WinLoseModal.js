import { NOT_STARTED, WON } from "../../helpers/Constants";
import "./WinLoseModal.css";

const WinLossModal = ({ gameState, setGameState }) => {
  const message = gameState === WON ? "🎉 You won! 🎉" : "💥 You lost! 💥";
  return (
    <div className="gameState" onClick={() => setGameState(NOT_STARTED)}>
      {message}
    </div>
  );
};

export default WinLossModal;
