// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useState } from "react"
import Navbar from "./navbar/Navbar"
import Footer from "./footer/Footer"
import Home from "./pages/Home"
import About from "./pages/About" // Assuming you have an About page

const App = () => {
  const [githubUsername, setGithubUsername] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser).username : ""
  })

  return (
    <Router>
      <div className="m-0 w-full min-h-screen bg-white dark:bg-dark-white flex flex-col justify-between">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
                githubUsername={githubUsername}
                setGithubUsername={setGithubUsername}
              />
            }
          />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
