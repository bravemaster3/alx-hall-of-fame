import { useState } from "react"
import { IoLogoGithub } from "react-icons/io"

export default function GithubBtn({
  user,
  BtnFunction,
  setStartAuth,
  //   isAuthenticated,
}) {
  const isAuthenticated = user && user.is_authenticated
  const text = isAuthenticated ? "Logout" : "Github Login"
  const background = isAuthenticated ? "white" : "black"
  const textColor = isAuthenticated ? "black" : "white"
  const buttonWidth = isAuthenticated ? "142" : "100"
  return (
    <button
      className={`cursor-pointer [ border border-black dark:border-steelblue ] pt-[7px] px-[10.4px] pb-1 bg-${background} dark:bg-dark-steelblue flex-1 rounded-md flex flex-row items-start justify-start`}
      //   onClick={onLoginClick}
      onClick={function () {
        // setStartAuth(true)
        BtnFunction()
      }}
    >
      <IoLogoGithub
        className={`h-[29px] w-7 text-${textColor} relative overflow-hidden shrink-0`}
      />
      <div
        className={`w-[142px] flex flex-col items-start justify-start pt-1 px-0 pb-0 box-border ml-[-7.8px]`}
      >
        <div
          className={`self-stretch relative text-sm leading-[20px] font-inter text-${textColor} text-center whitespace-nowrap`}
        >
          {text}
        </div>
      </div>
    </button>
  )
}
