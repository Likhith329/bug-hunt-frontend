import { useNavigate } from "react-router-dom";
import { useState } from "react";
import styles from "./Lobby.module.css";
import { FaArrowLeft } from "react-icons/fa";
import axios from "axios";

const Lobby = () => {
  const navigate = useNavigate();
  const [showJoinInput, setShowJoinInput] = useState(false);
  const [roomCode, setRoomCode] = useState("");
  const [loading, setLoading] = useState(false)

  const handleCreateRoom = async () => {
    try {
      setLoading(true);
      let res = await axios.post('http://localhost:5000/room/', {}, {
        headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
      })
      navigate(`/waiting/${res.data.roomId}`)
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleJoinRoom = async() => {
    if (showJoinInput) {
      if (roomCode.trim() !== "") {
        try {
          setLoading(true);
          await axios.post(`http://localhost:5000/room/${roomCode}/join`, {}, {
            headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
          })
          navigate(`/waiting/${roomCode}`)
        } catch (error) {
          console.log(error)
        }        
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
