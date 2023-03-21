import React from "react"
import styles from "./AnswerInput.module.scss"

export default function AnswerInput({
  statement,
  answer,
  correctAnswer,
  handleAnswerChange,
  answerIndex,
  wrongAnswerScreen
}) {

  const hasCorrectAnswer = () => {
    // console.log(wrongAnswerScreen, answer, correctAnswer, answer == correctAnswer)
    return answer == correctAnswer
  }

  return (
    <>
      <p className={styles.statement}>{statement}</p>
      <input
        className={
          (!hasCorrectAnswer() && wrongAnswerScreen)
            ? styles.wrongInputField
            : styles.waitingInputField
        }
        placeholder="?"
        pattern="[01]"
        maxLength={1}
        title="Please enter either 0 or 1"
        value={answer}
        onChange={(e) => {
          handleAnswerChange(e.target.value, answerIndex)
        }}
        disabled={wrongAnswerScreen}
      ></input>
    </>
  )
}
