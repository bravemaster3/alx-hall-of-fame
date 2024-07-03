// src/App.jsx
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { useEffect, useState } from "react"
import Navbar from "./navbar/Navbar"
import Footer from "./footer/Footer"
import Home from "./pages/Home"
import About from "./pages/About" // Assuming you have an About page
import Profile from "./pages/Profile"
import ProfileEdit from "./pages/ProfileEdit"

const App = () => {
  // const [githubUsername, setGithubUsername] = useState(() => {
  //   const storedUser = localStorage.getItem("user")
  //   // console.log("storedUser", JSON.parse(storedUser).username)
  //   return storedUser ? JSON.parse(storedUser).username : ""
  // })

  // useEffect(() => {
  //   // Function to update githubUsername based on localStorage
  //   const updateGithubUsername = () => {
  //     const storedUser = localStorage.getItem("user")
  //     if (storedUser) {
  //       const user = JSON.parse(storedUser)
  //       if (user.is_authenticated) {
  //         setGithubUsername(user.username || "")
  //       } else {
  //         setGithubUsername("")
  //       }
  //     }
  //   }

  //   // Call the function initially
  //   updateGithubUsername()

  //   // Set up a listener for storage changes
  //   window.addEventListener("storage", updateGithubUsername)

  //   // Cleanup the listener on component unmount
  //   return () => {
  //     window.removeEventListener("storage", updateGithubUsername)
  //   }
  // }, []) // Empty dependency array to run only once

  return (
    <Router>
      <div className="m-0 w-full min-h-screen bg-white dark:bg-dark-white flex flex-col justify-between">
        <Navbar />
        <Routes>
          <Route
            path="/"
            element={
              <Home
              // githubUsername={githubUsername}
              // setGithubUsername={setGithubUsername}
              />
            }
          />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/edit" element={<ProfileEdit />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  )
}

export default App
