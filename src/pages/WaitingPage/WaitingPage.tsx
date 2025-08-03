import styles from './WaitingPage.module.css'

const WaitingPage = () => {
  return (
    <div className={styles.waitingPage}>
        <div className={styles.wpContainer}>
            <div className={styles.wpHeader}>
                <div className={styles.title}>Waiting for Players...</div>
                <div className={styles.subtitle}>Join the game with this room code:</div>
                <div className={styles.roomCodeContainer}>
                    <div className={styles.roomCode}>ABCD123</div>
                    <div className={styles.copyButton}>Copy</div>
                </div>
            </div>

            <div className={styles.divider}></div>

            <div className={styles.playerListContainer}>
                <div className={styles.playerListTitle}>Players</div>
                <div className={styles.playerList}>
                    <div className={styles.playerItem}>Player 1</div>
                    <div className={styles.playerItem}>Player 2</div>
                    <div className={styles.playerItem}>Player 3</div>
                    <div className={styles.playerItem}>Player 4</div>
                    <div className={styles.playerItem}>Player 5</div>
                    <div className={styles.playerItem}>Player 6</div>
                    <div className={styles.playerItem}>Player 7</div>
                    <div className={styles.playerItem}>Player 8</div>
                </div>
            </div>

            <div className={styles.actionButtons}>
                <div className={styles.actionButton}>start Game</div>
                <div className={styles.actionButton}>Leave Room</div>
            </div>
        </div>
    </div>
  )
}

export default WaitingPage