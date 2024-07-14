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
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import GithubAvatar from "./GithubAvatar"
import GithubBtn from "./GithubBtn"
import DarkModeToggle from "./DarkModeToggle"
import { backendURL, frontendURL, githubClientID } from "../../constants"
import { handleAuth } from "../../utils"
// import UserProfile from "./UserProfile"
// import UserProfileModal from "./UserProfileModal"

export default function Navbar({ onLoginClick }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : { is_authenticated: false }
  })
  // const [showUserProfileModal, setShowUserProfileModal] = useState(false)

  const [anchorEl, setAnchorEl] = useState(null)
  const navigate = useNavigate()

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
        // window.location.href = `${frontendURL}`
        if (userData.updated) {
          navigate("/profile")
        } else {
          const confirmed = window.confirm("Please complete your profile now!")
          if (confirmed) navigate("/profile/edit")
        }
      }, 10)
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

  const handleLogout = () => {
    localStorage.setItem("user", JSON.stringify({ is_authenticated: false }))
    setUser({ is_authenticated: false })
    navigate("/")
  }

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  return (
    <>
      <AppBar
        position="sticky"
        className="bg-white dark:bg-dark-white border-solid border-0 border-b-[1px] border-gainsboro dark:border-dark-gainsboro "
      >
        <Toolbar className="flex justify-between">
          <div className="flex items-center">
            <a href="/">
              <img
                src="/src/assets/logo.png"
                alt="ALX Hall of Fame Logo"
                title="ALX Hall of Fame"
                className="w-[45px] h-[50px]"
              />
            </a>
          </div>
          <div className="flex items-center space-x-4">
            <DarkModeToggle />
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
            </Button>
            <Button color="inherit" onClick={() => navigate("/map")}>
              MAP
            </Button>
            <Button color="inherit" onClick={() => navigate("/profile")}>
              Profile
            </Button>
            <Button color="inherit" onClick={() => navigate("/about")}>
              About
            </Button>
            {user.is_authenticated ? <GithubAvatar user={user} /> : null}
            <GithubBtn
              user={user}
              BtnFunction={user.is_authenticated ? handleLogout : handleAuth}
              setStartAuth={setStartAuth}
            />
          </div>
        </Toolbar>
      </AppBar>
    </>
  )
}