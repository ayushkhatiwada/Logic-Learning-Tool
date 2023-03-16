import React from "react"
import styles from "./AnswerInput.module.scss"

export default function AnswerInput({
  statement,
  answer,
  handleAnswerChange,
  answerIndex,
}) {
  // const checkAnswer = (answer) => {
  //   if (answer == "") {
  //     return null
  //   } else if (answer == correctAnswer) {
  //     return true
  //   } else {
  //     return false
  //   }
  // }

  return (
    <>
      <p className={styles.statement}>{statement}</p>
      <input
        className={styles.inputField}
        value={answer}
        onChange={(e) => {
          handleAnswerChange(e.target.value, answerIndex)
        }}
      ></input>
    </>
  )
}
