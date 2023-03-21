import React from "react"
import styles from "./AnswerInput.module.scss"

export default function AnswerInput({
  statement,
  answer,
  handleAnswerChange,
  answerIndex,
}) {

  return (
    <>
      <p className={styles.statement}>{statement}</p>
      <input
        className={styles.inputField}
        placeholder="?"
        pattern="[01]"
        maxLength={1}
        value={answer}
        onChange={(e) => {
          handleAnswerChange(e.target.value, answerIndex)
        }}
      ></input>
    </>
  )
}
