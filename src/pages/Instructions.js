import React from 'react'
import HomeButton from "../components/shared/homeButton/HomeButton"
import instructions1 from '../img/instructions1.png'
import instructions2 from '../img/instructions2.png'
import styles from '../styles/Instructions.module.scss'

export default function Instructions() {
  return (
    <>
      <HomeButton />
      <div className={styles.container}>
        <p className={styles.instructionText}>Instructions</p>
        <img src={instructions1} alt="instructions1" />
        <img src={instructions2} alt="instructions2" />
      </div>
    </>
  )
}
