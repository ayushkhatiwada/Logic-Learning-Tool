import { useState, useEffect } from 'react'
import Timer from '../components/shared/timer/Timer'
import AnswerInput from '../components/game/answerInput/AnswerInput'
import HeartBar from '../components/game/heartBar/HeartBar'
import generateQuestion from '../functions/generateQuestion'
import styles from '../styles/Game.module.scss'

export default function Game() {
  const maxQuestions = 5
  const maxHearts = 5
  
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(10)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState(5)
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

  const resetGame = () => {
    setLevel(1)
    setTimeLeft(10)
    setCurrentQuestion(1)
    setScore(0)
    setHearts(5)
    setQuestionData(generateQuestion(level))
  }

  useEffect(() => {
    // event listener to update the timer every 10ms
    const timerInterval = setInterval(() => {
      setTimeLeft((timeLeft) => {
        console.log("Interval running")
        if (timeLeft <= 0) {
          clearInterval(timerInterval)
          console.log("Time is up")
          return 0;
        }
        return timeLeft - 0.01;
      })
    }, 10)
  }, [])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <div className={styles.levelTimerQuestion}>
            <div className={styles.level}>Level {level}</div>
            <div className={styles.timerContainer}><Timer timeLeft={timeLeft} maxTime={level * 10} /></div>
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
          <HeartBar hearts={hearts} maxHearts={maxHearts} />
        </div>
      </div>
    </>
  )
}
