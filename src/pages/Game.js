import { useState, useEffect } from "react"
import HomeButton from "../components/shared/homeButton/HomeButton"
import Timer from "../components/shared/timer/Timer"
import AnswerInput from "../components/game/answerInput/AnswerInput"
import HeartBar from "../components/game/heartBar/HeartBar"
import generateQuestion from "../functions/generateQuestion"
import backgroundStrokes from "../img/background-strokes.svg"
import styles from "../styles/Game.module.scss"

export default function Game() {
  const maxLevels = 5
  const maxQuestions = 5
  const maxHearts = 5
  let timerInterval
  
  const [timerPaused, setTimerPaused] = useState(false)
  const [level, setLevel] = useState(1)
  const [timeLeft, setTimeLeft] = useState(10)
  const [currentQuestion, setCurrentQuestion] = useState(1)
  const [score, setScore] = useState(0)
  const [hearts, setHearts] = useState(5)

  const [wrongAnswerScreen, setWrongAnswerScreen] = useState(false)

  const [questionData, setQuestionData] = useState(generateQuestion(level))
  const [answers, setAnswers] = useState(new Array(level).fill("")) // "" - not answered, otherwise value of the input field
  const setAnswerAtIndex = (answer, index) => { 
    setAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers]
      newAnswers[index] = answer
      return newAnswers
    })  
  }

  const updateScore = () => {
    // increase score based on time left and level
    if (timeLeft > 0) {
      setScore((score) => Math.round(score + timeLeft * level * 10))
    }
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
    // return nextQuestion()

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
      setHearts((hearts) => hearts - 1)
      setTimerPaused(true)
      setWrongAnswerScreen(true)
      
      // if (hearts == 0) {
      //   // game over
      //   console.log("updateScoreHistory(score, false)")
      //   updateScoreHistory(score, false)
      //   alert("Game over!\nFinal score: " + score + "\nPress OK to restart the game.")
      //   resetGame()
      // }
    }
  }

  const resetGame = () => {
    setWrongAnswerScreen(false)
    setLevel(1)
    setTimeLeft(10)
    setTimerPaused(false)
    setCurrentQuestion(1)
    setScore(0)
    setHearts(5)
    setQuestionData(generateQuestion(1))
    setAnswers(new Array(1).fill(""))
  }

  const nextQuestion = () => {
    setWrongAnswerScreen(false)
    setTimerPaused(false)
    if (currentQuestion < maxQuestions) {
      // next question in the same level
      setCurrentQuestion((currentQuestion) => currentQuestion + 1)
      setQuestionData(generateQuestion(level))
      setAnswers(new Array(level).fill(""))
      setTimeLeft(timeForLevel(level))
    } else {
      if ((level) == maxLevels) {
        // game won
        updateScoreHistory(score, true)
        alert("You have completed the game!\nFinal score: " + score + "\n")
        resetGame()
      } else {
        // next level
        setTimeLeft(timeForLevel(level + 1))
        setCurrentQuestion(1)
        setQuestionData(generateQuestion(level + 1))
        setAnswers(new Array(level + 1).fill(""))
        setLevel((level) => level + 1)
      }
    }
  }

  const startTimer = () => {
    timerInterval = setInterval(() => {
      setTimeLeft((timeLeft) => {
        if (timeLeft <= 0) {
          return 0
        }
        return timeLeft - 0.01
      })
    }, 10)
  }

  const stopTimer = () => {
    clearInterval(timerInterval)
  }

  const updateScoreHistory = (score, gameWon) => {
    console.log(score, gameWon)
    const scoreHistory = JSON.parse(localStorage.getItem("scoreHistory")) || []
    scoreHistory.push({ timestamp: new Date().getTime(), score, gameWon })
    localStorage.setItem("scoreHistory", JSON.stringify(scoreHistory))
  }

  useEffect(() => {    
    if (!timerPaused) {
      startTimer()
    } else {
      stopTimer()
    }

    return () => clearInterval(timerInterval)
  }, [timerPaused])

  useEffect(() => {
    if (hearts == 0) {
      // game over
      setTimeout(() => {
        updateScoreHistory(score, false)
        alert("Game over!\nFinal score: " + score + "\nPress OK to restart the game.")
        resetGame()
      }, 100)
    }
  }, [hearts])

  return (
    <>
      <HomeButton />
      <div className={styles.container} style={{ backgroundImage: `url(${backgroundStrokes})` }}>
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

          {/* <button onClick={() => setTimerPaused((timerPaused) => !timerPaused)}>false</button> */}
          <form
            className={styles.answers}
            onSubmit={(e) => {
              e.preventDefault()
              wrongAnswerScreen ? nextQuestion() : submitAnswers()
            }}
          >
            <div className={styles.answersContainer}>
              {getStatements().map((statement, i) => (
                <div className={styles.answerContainer}>
                  <AnswerInput
                    statement={statement}
                    answer = {answers[i]}
                    correctAnswer={+(getAnswers()[i] == true)}
                    handleAnswerChange={handleAnswerChange}
                    answerIndex={i}
                    wrongAnswerScreen={wrongAnswerScreen}
                  />
                </div>
              ))}
            </div>
            <input
              className={styles.submitButton}
              type="submit"
              value={wrongAnswerScreen ? "Next Question" : "Submit Answers"}
            />
          </form>
        </div>

        <div className={styles.heartBar}>
          <HeartBar hearts={hearts} maxHearts={maxHearts} />
        </div>
      </div>
    </>
  )
}
