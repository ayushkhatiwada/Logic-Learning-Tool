import { useState, useEffect } from "react"
import { Link } from 'react-router-dom'
import gohome from '../img/homesymbol.png' //gohomo.png <- which do you think is bette??
import styles from "../styles/History.module.scss"

export default function History() {
  const [history, setHistory] = useState([])

  useEffect(() => {
    setHistory(JSON.parse(localStorage.getItem("scoreHistory")))
  }, [])

  return (
    <>
    <Link to="/" style={{position: "absolute", top : 10, left: 10 }}>
      <img src={gohome} style={{width: "30px"}}/>
    </Link>
    <div className={styles.container}>
      <p className={styles.titleText}>Score History</p>
      <div className={styles.table}>
        <div className={styles.tableHeader}>
          <div className={styles.tableCell}>Time</div>
          <div className={styles.tableCell}>Score</div>
          <div className={styles.tableCell}>Result</div>
        </div>
        {
          history.map((item, _) => (
            <div className={styles.tableRow}>
              <div className={styles.tableCell}>{new Date(item.timestamp).toLocaleString()}</div>
              <div className={styles.tableCell}>{item.score}</div>
              <div className={styles.tableCell}
                style={{ color: item.gameWon ? "green" : "red" }}
              >
                {item.gameWon ? "Won" : "Lost"}
              </div>
            </div>
          ))
        }
      </div>
    </div>
    </>
  )
}
