import { useCallback, useEffect, useRef, useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Button,
} from "@mui/material"
import { IoLogoGithub } from "react-icons/io"
import { MdDarkMode } from "react-icons/md"
import axios from "axios"
import GithubAvatar from "./GithubAvatar"
import GithubBtn from "./GithubBtn"
import DarkModeToggle from "./DarkModeToggle"
import { backendURL, frontendURL } from "../../constants"

export default function Navbar({ onLoginClick }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : { is_authenticated: false }
  })

  const [startAuth, setStartAuth] = useState(false)
  const [code, setCode] = useState(null)
  const usedCodes = useRef(new Set())

  const handleLogin = useCallback(async (authCode) => {
    if (usedCodes.current.has(authCode)) {
      console.log(`Auth code ${authCode} has already been used.`)
      return
    }

    try {
      const response = await axios.get(
        `${backendURL}/callback?code=${authCode}`
      )
      const userData = response.data
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      console.log("USER INFO", userData)
      usedCodes.current.add(authCode)

      setTimeout(() => {
        window.location.href = `${frontendURL}`
      }, 100)
    } catch (error) {
      console.error("Error logging in:", error)
    }
  }, [])

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const authCode = urlParams.get("code")
    if (authCode && !usedCodes.current.has(authCode)) {
      setCode(authCode)
      console.log(authCode)
      handleLogin(authCode)
    }
  }, [startAuth])

  const handleAuth = () => {
    window.location.href = `https://github.com/login/oauth/authorize?client_id=3892f236d44713033395`
  }

  const handleLogout = () => {
    localStorage.setItem("user", JSON.stringify({ is_authenticated: false }))
    setUser({ is_authenticated: false })
  }

  return (
    <AppBar position="static" className="bg-white dark:bg-dark-white">
      <Toolbar className="flex justify-between">
        <div className="flex items-center">
          <Typography variant="h6" className="text-black dark:text-dark-black">
            ALX Hall of Fame
          </Typography>
        </div>
        <div className="flex items-center space-x-4">
          <DarkModeToggle />
          {user.is_authenticated ? <GithubAvatar user={user} /> : null}
          <GithubBtn
            user={user}
            BtnFunction={user.is_authenticated ? handleLogout : handleAuth}
            setStartAuth={setStartAuth}
          />
        </div>
      </Toolbar>
    </AppBar>
  )
}
