import { useNavigate, useParams } from "react-router-dom";
import styles from "./WaitingPage.module.css";
import { useEffect, useRef, useState } from "react";
import api from "../../lib/api";
import socket from "../../lib/socket";
import Loader from "../../Components/Loader/Loader";

const WaitingPage = () => {
  const { roomId } = useParams()
  const [gameId, setGameId] = useState('')
  const [players, setPlayers] = useState([])
  const [username,] = useState(localStorage.getItem('username'))
  const [userId,] = useState(localStorage.getItem('userId'))
  const [playerId, setPlayerId] = useState('')
  const playerIdRef = useRef('')
  const gameIdRef = useRef('')
  const [isHost, setIsHost] = useState(false)
  const navigate = useNavigate()
  const [isLoading, setLoader] = useState(false)

  useEffect(() => {
    playerIdRef.current = playerId
  }, [playerId])

  useEffect(() => {
    gameIdRef.current = gameId
  }, [gameId])

  useEffect(() => {
    getRoomDetails()
    socket.on('player-joined', handlePlayerJoined);
    socket.on('player-left', handlePlayerLeft)
    socket.on('host-changed', handleHostChange)
    socket.on('game-start', handleStartGame)
    socket.on('game-started', handleGameStarted)
    return () => {
      socket.off('player-joined', handlePlayerJoined);
      socket.off('player-left', handlePlayerLeft)
      socket.off('host-changed', handleHostChange)
      socket.off('game-start', handleStartGame)
      socket.off('game-started', handleGameStarted)
    };
  }, [])

  const getRoomDetails = async() => {
    try {
      let res = await api.get(`room/${roomId}`)
      setGameId(res.data.gameId)
      setPlayers(res.data.players.map((p: any) => {
        if(p.userId == userId) {
          setPlayerId(p.id)
          socket.emit('join-room', {roomId, username, playerId: p.id})
          if(p.isHost) setIsHost(true);
          return {id: p.id, name: 'You', isHost: p.isHost}
        }
        return {id: p.id, name: p.user.username, isHost: p.isHost}
      }))
    } catch (error: any) {
      if (error.response && error.response.status === 403) {
        navigate('/lobby');
      }
    }
  }

  const handleRoomCodeCopy = () => {
    if(roomId) {  
      navigator.clipboard.writeText(roomId)
    }
  }

  const handlePlayerJoined = (data: any) => {
    setPlayers((prevPlayers: any) => {
      if (prevPlayers.some((p: any) => p.id === data.playerId)) {
        return prevPlayers;
      }
      return [...prevPlayers, { id: data.playerId, name: data.name }];
    });
  }

  const handlePlayerLeft = (data: any) => {
    setPlayers((prevPlayers: any) => {
      return prevPlayers.filter((p: any) => p.id !== data.playerId);
    });
  };

  const handleHostChange = (data: any) => {
    setPlayers((prevPlayers: any) => {
      return prevPlayers.map((p: any) => p.id == data.newHostId ? {...p, isHost: true} : {...p, isHost: false})
    })
    setIsHost(data.newHostId == playerIdRef.current);
  }
  
  const handleLeaveRoom = async() => {
    try {
      await api.post(`/room/${roomId}/leave`)
      socket.emit('leave-room', {roomId, username, playerId})
      navigate('/lobby')
    } catch (error) {
      console.log(error)
    }
  }

  const startGame = async () => {
    setLoader(true);
    socket.emit('game-start', { roomId })
    try {
      await api.post('/game/start', { roomId });``
      localStorage.setItem('playerId', playerId)
      socket.emit('game-started', { roomId })
      navigate(`/game/${gameId}`)
    } catch (error) {
      console.error("Error starting game:", error);
    } finally {
      setLoader(false);
    }
  };

  const handleStartGame = () => {
    setLoader(true)
    console.log('game started')
  }

  const handleGameStarted = () => {
    setLoader(false)
    localStorage.setItem('playerId', playerIdRef.current)
    navigate(`/game/${gameIdRef.current}`)
  }

  return (
    <>
    {isLoading? <Loader/>: 
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
              <div className={styles.playerItem} key={index}>{player.isHost && '👑 '}{player.name}</div>
            ))}
            </div>
          </div>
  
          <div className={styles.actionButtons}>
            {isHost ? <div className={styles.actionButton} onClick={startGame}>start Game</div> : ''}
            <div className={styles.actionButton} onClick={handleLeaveRoom}>Leave Room</div>
          </div>
        </div>
      </div>
    }
    </>
  );
};

export default WaitingPage;
