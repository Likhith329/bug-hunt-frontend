import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Lobby.module.css";
import { FaArrowLeft } from "react-icons/fa";

const Lobby = () => {
  const navigate = useNavigate();
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false)

  const handleCreateRoom = () => {
    setLoading(true)
    setTimeout(() => {
        navigate("/waiting")
    }, 3000);
  };

  const handleJoinRoom = () => {
    if (showJoinInput) {
      if (roomCode.trim() !== "") {
        setLoading(true)
        setTimeout(() => {
            navigate("/waiting")
        }, 3000);
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
    <>
    {loading ? 
          <div className={styles.letterCarousel}>
          <span>B</span>
          <span>u</span>
          <span>g</span>
          <span> </span>
          <span>H</span>
          <span>u</span>
          <span>n</span>
          <span>t</span>
        </div>:
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
        }
    </>
  );
};

export default Lobby;
