import { useParams } from "react-router-dom";
import styles from "./WaitingPage.module.css";
import axios from "axios";
import { useEffect, useState } from "react";

const WaitingPage = () => {
  const { roomId } = useParams()
  const [players, setPlayers] = useState([{id: 1, name: 'player3'}])

  useEffect(() => {
    getRoomDetails()
  }, [])

  const getRoomDetails = async() => {
    let res = await axios.get(`http://localhost:5000/room/${roomId}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
    })
    setPlayers(res.data.players.map((p: any) => {
      return {id: p.id, name: p.user.username}
    }))
  }

  return (
    <div className={styles.waitingPage}>
      <div className={styles.wpContainer}>
        <div className={styles.wpHeader}>
          <div className={styles.title}>Waiting for Players...</div>
          <div className={styles.subtitle}>
            Join the game with this room code:
          </div>
          <div className={styles.roomCodeContainer}>
            <div className={styles.roomCode}>{roomId}</div>
            <div className={styles.copyButton}>Copy</div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.playerListContainer}>
          <div className={styles.playerListTitle}>Players</div>
          <div className={styles.playerList}>
          {players.map((player, index) => (
            <div className={styles.playerItem} key={index}>{player.name}</div>
          ))}
          </div>
        </div>

        <div className={styles.actionButtons}>
          <div className={styles.actionButton}>start Game</div>
          <div className={styles.actionButton}>Leave Room</div>
        </div>
      </div>
    </div>
  );
};

export default WaitingPage;
