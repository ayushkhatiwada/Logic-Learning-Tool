import React from 'react'
import styles from './AnswerInput.module.scss'

export default function AnswerInput({ statement, correctAnswer }) {
  return (
    <>
      <p className={styles.statement}>{statement}</p>
      <input className={styles.inputField} value={correctAnswer}></input>
    </>
  )
}
