// LoginPage.jsx
import React, { useState } from "react"
import { useNavigate } from "react-router-dom"
import GithubBtn from "../navbar/GithubBtn" // Adjust the import path as necessary
import { handleAuth } from "../../utils"

const Login = () => {
  const [profile, setProfile] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })

  const navigate = useNavigate()

  return (
    // !profile.is_authenticated && (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-300px)] text-gray-300 dark:text-dark-gray-300">
      <h2>Github Authentication</h2>
      <GithubBtn
        user={profile}
        BtnFunction={handleAuth}
        setStartAuth={() => {}}
      />
    </div>
    // )
  )
}

export default Login
