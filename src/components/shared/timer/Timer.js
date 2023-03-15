import React from 'react'
import styles from './Timer.module.scss'

export default function timer({ timeLeft, maxTime }) {
  return (
    <div className={styles.timer}>
      <div className={styles.timeLeftBar} style={{ width: `${(timeLeft / maxTime) * 100}%` }} />
    </div>
  )
}
