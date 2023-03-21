import { useState, useEffect } from "react"
import Timer from "../components/shared/timer/Timer"
import AnswerInput from "../components/game/answerInput/AnswerInput"
import HeartBar from "../components/game/heartBar/HeartBar"
import generateQuestion from "../functions/generateQuestion"
import styles from "../styles/Game.module.scss"

export default function Game() {
  const maxQuestions = 5
  const maxHearts = 5

  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(10)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState(5)

  const [questionData, setQuestionData] = useState(generateQuestion(level))
  const [answers, setAnswers] = useState(new Array(level).fill("")) // "" - not answered, otherwise value of the input field
  const setAnswerAtIndex = (answer, index) => { 
    setAnswers((answers) => {
      answers[index] = answer
      return answers
    })  
  }

  const updateScore = () => {
    // increase score based on time left and level
    setScore((score) => Math.round(score + timeLeft * level * 10))
  }

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

  const timeForLevel = (level) => {
    return level * 10
  }

  const handleAnswerChange = (answer, answerIndex) => {
    setAnswerAtIndex(answer, answerIndex)
  }
  
  const submitAnswers = () => {
    // check if any answer is empty
    if (answers.includes("")) {
      alert("Please fill in all the answers")
      return
    }
    
    const correctAnswers = getAnswers()
    // console.log(answers, correctAnswers)
    
    let correctAnswer = true
    for (let i = 0; i < correctAnswers.length; i++) {
        
      if (!(correctAnswers[i] == answers[i])) {
        correctAnswer = false
        break
      }
    }

    if (correctAnswer) {
      updateScore()
      nextQuestion()
    } else {
      if (hearts == 1) {
        resetGame()
      } else {
        setHearts((hearts) => hearts - 1)
        nextQuestion()
      }
    }
  }

  const resetGame = () => {
    setLevel(1)
    setTimeLeft(10)
    setCurrentQuestion(1)
    setScore(0)
    setHearts(5)
    setQuestionData(generateQuestion(1))
    setAnswers(new Array(1).fill("")) 
  }

  const nextQuestion = () => {
    if (currentQuestion < maxQuestions) {
      setCurrentQuestion((currentQuestion) => currentQuestion + 1)
      setQuestionData(generateQuestion(level))
      setAnswers(new Array(level).fill(""))
      setTimeLeft(timeForLevel(level))
    } else {
      setTimeLeft(timeForLevel(level + 1))
      setCurrentQuestion(1)
      setQuestionData(generateQuestion(level + 1))
      setAnswers(new Array(level + 1).fill(""))
      setLevel((level) => level + 1)
    }
  }

  useEffect(() => {    
    // event listener to update the timer every 10ms
    const timerInterval = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft <= 0) {
          clearInterval(timerInterval)
          return 0
        }
        return timeLeft - 0.01
      })
    }, 10)
  }, [])

  // useEffect(() => {
  //   console.log("answers changed")
  // }, [answers])

  return (
    <>
      <div className={styles.container}>
        <div className={styles.gameHeader}>
          <div className={styles.levelTimerQuestion}>
            <div className={styles.level}>Level {level}</div>
            <div className={styles.timerContainer}>
              <Timer timeLeft={timeLeft} maxTime={timeForLevel(level)} />
            </div>
            <div className={styles.questionNum}>
              Question{" "}
              <p className={styles.currentQuestion}>{currentQuestion}</p>/
              {maxQuestions}
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
            {Object.entries(getVariables()).map(([variable, value]) => (
              <p>
                {variable} = {value}
              </p>
            ))}
          </div>

          <form className={styles.answers} onSubmit={(e) => {e.preventDefault(); submitAnswers()}}>
            <div className={styles.answersContainer}>
              {getStatements().map((statement, i) => (
                <div className={styles.answerContainer}>
                  <AnswerInput
                    statement={statement}
                    // correctAnswer={+(getAnswers()[i] == true)}
                    answer = {answers[i]}
                    handleAnswerChange={handleAnswerChange}
                    answerIndex={i}
                  />
                </div>
              ))}
            </div>
            <input className={styles.submitButton} type="submit" value="Submit Answers" />
          </form>
        </div>

        <div className={styles.heartBar}>
          <HeartBar hearts={hearts} maxHearts={maxHearts} />
        </div>
      </div>
    </>
  )
}
