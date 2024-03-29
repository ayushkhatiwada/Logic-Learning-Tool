import React from 'react'
import { Link } from 'react-router-dom'
import backgroundImg from '../img/home-background.png'
import gameLogoImg from '../img/game-logo.png'
import styles from "../styles/Home.module.scss"

export default function Home() {
  return (
    <div 
      className={styles.background}
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className={styles.container}>
        <img className={styles.gameLogo} src={gameLogoImg}></img>
        <div className={styles.buttons}>
          <Link to="/game"><div className={styles.button}>Start Game</div></Link>
          <Link to="/history"><div className={styles.button}>Score History</div></Link>
          <Link to="/instructions"><div className={styles.button}>Instructions</div></Link>
        </div>
      </div>
    </div>
  )
}
