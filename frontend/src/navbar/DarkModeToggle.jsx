import React, { useState, useEffect } from "react"
import { MdDarkMode, MdLightMode } from "react-icons/md"

const DarkModeToggle = () => {
  // const [isDarkMode, setIsDarkMode] = useState(false)

  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check initial theme preference
    if (
      localStorage.getItem("theme") === "dark" ||
      (!localStorage.getItem("theme") &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      return true
    }
    return false
  })

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }, [isDarkMode])

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode)
  }

  return (
    <>
      {isDarkMode ? (
        <MdLightMode
          onClick={toggleDarkMode}
          className="w-7 h-7 p-2 dark:text-white rounded cursor-pointer"
        />
      ) : (
        <MdDarkMode
          onClick={toggleDarkMode}
          className="w-7 h-7 p-2 dark:text-black rounded cursor-pointer"
        />
      )}
    </>
  )
}

export default DarkModeToggle
