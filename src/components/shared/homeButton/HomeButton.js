import homeIcon from "../../../img/homesymbol.png"
import { Link } from "react-router-dom"
import styles from "./HomeButton.module.scss"

export default function HomeButton() {
  return (
    <div className={styles.homeButton}>
      <Link to="/">
        <img src={homeIcon} />
      </Link>
    </div>
  )
}
