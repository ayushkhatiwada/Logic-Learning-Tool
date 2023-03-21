import React from 'react'
import instructions1 from '../img/instructions1.png'
import instructions2 from '../img/instructions2.png'
import styles from '../styles/Instructions.module.scss'
import gohome from '../img/homesymbol.png' //gohomo.png <- which do you think is bette??
import { Link } from 'react-router-dom'

export default function Instructions() {
  return (
    <div className={styles.container}>
      <p className={styles.instructionText}>Instructions</p>
        <Link to="/" style={{position: "absolute", top : 50, left: 256 }}>
          <img src={gohome} style={{width: "30px"}}/>
        </Link>

      <img src={instructions1} alt="instructions1" />
      <img src={instructions2} alt="instructions2" />
    </div>
  )
}
