import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Lobby.module.css";
import { FaArrowLeft } from "react-icons/fa";

const Lobby = () => {
  const navigate = useNavigate();
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [roomCode, setRoomCode] = useState("");

  const handleCreateRoom = () => navigate("/waiting");

  const handleJoinRoom = () => {
    if (showJoinInput) {
      if (roomCode.trim() !== "") {
        navigate("/waiting");
      } else {
        alert("Please enter a valid room code.");
      }
    } else {
      setShowJoinInput(true);
    }
  };

  const handleBack = () => {
    setShowJoinInput(false);
    setRoomCode("");
  };

  return (
    <div className={styles.LobbyPage}>
      <div className={styles.LobbyContainer}>
        <div className={styles.title}>Welcome, Player!</div>
        <div className={styles.actionButtons}>
          {!showJoinInput && (
            <div className={styles.actionButton} onClick={handleCreateRoom}>
              Create Room
            </div>
          )}

          {showJoinInput && (
            <>
              <input
                type="text"
                placeholder="Enter Room Code"
                value={roomCode}
                onChange={(e) => setRoomCode(e.target.value)}
                className={styles.roomCodeInput}
              />
            </>
          )}

          <div className={styles.actionButton} onClick={handleJoinRoom}>
            {showJoinInput ? "Join" : "Join Room"}
          </div>
        </div>
        {showJoinInput && (
          <div className={styles.backButton} onClick={handleBack}>
            <FaArrowLeft size={18} />
          </div>
        )}
      </div>
    </div>
  );
};

export default Lobby;
