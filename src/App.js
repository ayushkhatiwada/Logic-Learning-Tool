import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Game from "./pages/Game"
import Settings from "./pages/Settings"
import Instructions from "./pages/Instructions"
import Credits from "./pages/Credits"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        {/* <Route path="/settings" element={<Settings />} /> */}
        <Route path="/instructions" element={<Instructions />} />
        {/* <Route path="/credits" element={<Credits />} /> */}
        <Route path="*" element={<h1>404 Page not found</h1>} />
      </Routes>
    </BrowserRouter>
  )
}
