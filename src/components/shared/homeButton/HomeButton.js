import homeIcon from "../../../img/homesymbol.png"
import { Link } from "react-router-dom"

export default function HomeButton() {
  return (
    <Link to="/" style={{ position: "absolute", top: 10, left: 10 }}>
      <img src={homeIcon} style={{ width: "30px" }} />
    </Link>
  )
}
