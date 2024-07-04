import React, { useCallback, useEffect, useRef, useState } from "react"
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Divider,
} from "@mui/material"
import MenuIcon from "@mui/icons-material/Menu"
import DarkModeToggle from "./DarkModeToggle"
import GithubAvatar from "./GithubAvatar"
import GithubBtn from "./GithubBtn"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { backendURL, frontendURL, githubClientID } from "../../constants"
import { handleAuth } from "../../utils"

export default function Navbar({ onLoginClick }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : { is_authenticated: false }
  })
  const [anchorEl, setAnchorEl] = useState(null)
  const [drawerOpen, setDrawerOpen] = useState(false) // State for Drawer
  const navigate = useNavigate()
  const [startAuth, setStartAuth] = useState(false)
  const [code, setCode] = useState(null)
  const usedCodes = useRef(new Set())

  const handleLogin = useCallback(
    async (authCode) => {
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
          if (userData.updated) {
            navigate("/profile")
          } else {
            const confirmed = window.confirm(
              "Please complete your profile now!"
            )
            if (confirmed) navigate("/profile/edit")
          }
        }, 10)
      } catch (error) {
        console.error("Error logging in:", error)
      }
    },
    [navigate]
  )

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search)
    const authCode = urlParams.get("code")
    if (authCode && !usedCodes.current.has(authCode)) {
      setCode(authCode)
      console.log(authCode)
      handleLogin(authCode)
    }
  }, [startAuth, handleLogin])

  const handleLogout = () => {
    localStorage.setItem("user", JSON.stringify({ is_authenticated: false }))
    setUser({ is_authenticated: false })
    navigate("/")
  }

  const handleDrawerOpen = () => {
    setDrawerOpen(true)
  }

  const handleDrawerClose = () => {
    setDrawerOpen(false)
  }

  const drawerItems = [
    { text: "Home", onClick: () => navigate("/") },
    { text: "Profile", onClick: () => navigate("/profile") },
    { text: "About", onClick: () => navigate("/about") },
  ]

  return (
    <>
      <AppBar
        position="sticky"
        className="bg-white dark:bg-dark-white mb-10 border-solid border-0 border-b-[1px] border-gainsboro dark:border-dark-gainsboro"
      >
        <Toolbar className="flex justify-between items-center">
          <div className="flex items-center">
            <Typography
              variant="h6"
              className="text-black dark:text-dark-black"
            >
              ALX Hall of Fame
            </Typography>
            <IconButton
              edge="start"
              className="ml-2 md:hidden"
              color="inherit"
              aria-label="menu"
              onClick={handleDrawerOpen}
            >
              <MenuIcon />
            </IconButton>
          </div>
          <div className="hidden md:flex items-center space-x-4">
            <DarkModeToggle />
            <Button color="inherit" onClick={() => navigate("/")}>
              Home
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

      {/* Drawer for mobile */}
      <Drawer anchor="left" open={drawerOpen} onClose={handleDrawerClose}>
        <div
          role="presentation"
          onClick={handleDrawerClose}
          onKeyDown={handleDrawerClose}
        >
          <List>
            {drawerItems.map((item, index) => (
              <ListItem button key={index} onClick={item.onClick}>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            {user.is_authenticated ? (
              <ListItem button onClick={handleLogout}>
                <ListItemText primary="Logout" />
              </ListItem>
            ) : (
              <ListItem button onClick={handleAuth}>
                <ListItemText primary="Login with GitHub" />
              </ListItem>
            )}
          </List>
        </div>
      </Drawer>
    </>
  )
}
