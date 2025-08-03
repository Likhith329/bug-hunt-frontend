import { useParams } from "react-router-dom";
import styles from "./WaitingPage.module.css";
import { useEffect, useState } from "react";
import api from "../../lib/api";
import socket from "../../lib/socket";

const WaitingPage = () => {
  const { roomId } = useParams()
  const [players, setPlayers] = useState([])

  useEffect(() => {
    getRoomDetails()
    socket.emit('join-room', {roomId, username: localStorage.getItem('username'), userId: localStorage.getItem('userId')})
    socket.on('player-joined', handlePlayerJoined);
    return () => {
      socket.off('player-joined', handlePlayerJoined);
    };
  }, [])

  const getRoomDetails = async() => {
    let res = await api.get(`room/${roomId}`)
    setPlayers(res.data.players.map((p: any) => {
      return {id: p.id, name: p.user.username}
    }))
  }

  const handleRoomCodeCopy = () => {
    if(roomId) {  
      navigator.clipboard.writeText(roomId)
    }
  }

  const handlePlayerJoined = (data: any) => {
    setPlayers((prevPlayers: any) => {
      console.log(prevPlayers)
      if (prevPlayers.some((p: any) => p.id === data.userId)) {
        return prevPlayers;
      }
      return [...prevPlayers, { id: data.userId, name: data.name }];
    });
    console.log('a new player joined', data)
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
            <div className={styles.copyButton} onClick={handleRoomCodeCopy}>Copy</div>
          </div>
        </div>

        <div className={styles.divider}></div>

        <div className={styles.playerListContainer}>
          <div className={styles.playerListTitle}>Players</div>
          <div className={styles.playerList}>
          {players.map((player: any, index) => (
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
