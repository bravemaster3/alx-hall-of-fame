import { useCallback, useEffect, useRef, useState } from "react"
import { IoLogoGithub } from "react-icons/io"
import { MdDarkMode } from "react-icons/md"
import axios from "axios"
import GithubAvatar from "./GithubAvatar"
import GithubBtn from "./GithubBtn"
import DarkModeToggle from "./DarkModeToggle"

export default function Navbar({ onLoginClick }) {
  // const [user, setUser] = useState(
  //   localStorage.getItem("user")
  //     ? localStorage.getItem("user")
  //     : { is_authenticated: false }
  // )
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : { is_authenticated: false }
  })

  const [startAuth, setStartAuth] = useState(false)
  const [code, setCode] = useState(null)
  // const [token, setToken] = useState(null)
  const usedCodes = useRef(new Set())

  const handleLogin = useCallback(async (authCode) => {
    if (usedCodes.current.has(authCode)) {
      console.log(`Auth code ${authCode} has already been used.`)
      return
    }

    try {
      const response = await axios.get(
        `http://localhost:8000/callback?code=${authCode}`
      )
      // setUser(response.data)
      const userData = response.data
      localStorage.setItem("user", JSON.stringify(userData))
      setUser(userData)
      console.log("USER INFO", userData)
      // localStorage.setItem("token", user.token)
      // setToken(user.token)
      usedCodes.current.add(authCode)

      // Redirect to the desired URL after successful login
      // setTimeout(() => {
      window.location.href = "http://localhost:5173"
      // }, 1000) // Small delay to ensure backend completes response sending
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
      // console.log(token)
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
    // <header className="mt-[-88px] mr-[-3px] self-stretch bg-white dark:bg-dark-white flex flex-row items-start justify-center py-2 px-5 gap-[608.9px] top-[-88] z-[99] sticky border-[1px] border-solid border-gainsboro dark:border-dark-gainsboro mq750:gap-[152px] mq450:gap-[76px] mq1125:gap-[304px]">
    <header className="m-0 w-full self-stretch bg-white dark:bg-dark-white flex flex-row items-start justify-center py-2 gap-[608.9px] z-[99] sticky top-0 border-solid border-0 border-b-[1px] border-gainsboro dark:border-dark-gainsboro mq750:gap-[152px] mq450:gap-[76px] mq1125:gap-[304px]">
      <div className="h-10 w-[198.2px] relative">
        <div className="absolute top-[8px] left-[62.2px] text-base leading-[24px] font-inter text-black dark:text-dark-black text-left inline-block w-[136px] whitespace-nowrap">
          <strong>ALX Hall of Fame</strong>
        </div>
        <div className="absolute top-[0px] left-[0px] rounded-[9999px] w-[115.7px] overflow-hidden flex flex-row items-start justify-start z-[1]">
          <div className="h-10 w-[55.4px] relative bg-steelblue dark:bg-dark-steelblue overflow-hidden shrink-0" />
        </div>
      </div>
      <div className="w-[306.7px] flex flex-row items-start justify-start gap-[31.7px] mq450:gap-[16px]">
        <div className="h-10 w-[79.1px] relative rounded-md">
          {/* <MdDarkMode className="absolute top-[5px] left-[calc(50%_-_7.55px)] w-[30px] h-[30px] overflow-hidden cursor-pointer" /> */}
          <DarkModeToggle />
        </div>
        {user.is_authenticated ? <GithubAvatar user={user} /> : null}
        <GithubBtn
          user={user}
          BtnFunction={user.is_authenticated ? handleLogout : handleAuth}
          setStartAuth={setStartAuth}
          // isAuthenticated={true}
        />
      </div>
    </header>
  )
}
