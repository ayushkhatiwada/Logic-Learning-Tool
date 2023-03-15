import { useState, useEffect } from 'react'
import AnswerInput from '../components/game/answerInput/AnswerInput'
import Timer from '../components/shared/timer/Timer'
import generateQuestion from '../functions/generateQuestion'
import styles from '../styles/Game.module.scss'

export default function Game() {
  const [level, setLevel] = useState(3)
  const [score, setScore] = useState(1036)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [maxQuestions, setMaxQuestions] = useState(5)
  const [questionData, setQuestionData] = useState(generateQuestion(level))

  // const getLevelData = async () => {
  //   const data = await generateQuestion(level)
  //   setQuestionData(data)
  //   console.log(data)
  // }

  const getVariables = () => {
    return questionData[0]
  }

  const getFullStatement = () => {
    return questionData[1][questionData[1].length - 1]
  }

  const getStatements = () => {
    return questionData[1]
  }

  const getAnswers = () => {
    return questionData[2]
  }

  useEffect(() => {
    // console.log(questionData[0])
    // console.log(questionData[1][questionData[1].length - 1])
    console.log(questionData)
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <div className={styles.levelTimerQuestion}>
            <div className={styles.level}>Level {level}</div>
            <div className={styles.timerContainer}><Timer /></div>
            <div className={styles.questionNum}>
              Question <p className={styles.currentQuestion}>{currentQuestion}</p>/{maxQuestions}
            </div>
          </div>
          <div className={styles.score}>
            <p className={styles.scoreText}>Score</p>
            <p className={styles.scoreValue}>{score}</p>
          </div>
        </div>

        <div className={styles.question}>
          <p className={styles.statement}>{getFullStatement()}</p>
          <div className={styles.variables}>
            {
              Object.entries(getVariables()).map(([variable, value]) => (
                <p>{variable} = {value}</p>
              ))
            }
          </div>

          <div className={styles.answers}>
            {
              getStatements().map((statement, i) => (
                <div className={styles.answerContainer}>
                  <AnswerInput statement={statement} correctAnswer={+(getAnswers()[i] == true)} />
                </div>
              ))
            }
          </div>
        </div>

        <div className={styles.heartBar}>

        </div>
      </div>
    </>
  )
}
