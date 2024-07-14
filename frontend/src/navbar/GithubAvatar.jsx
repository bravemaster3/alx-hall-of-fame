import React from "react"
import { useNavigate } from "react-router-dom"

export default function GithubAvatar({ user }) {
  // const navigate = useNavigate()
  return (
    <div className="App">
      <div
        className="avatar cursor-pointer"
        // onClick={() => navigate("/profile")}
      >
        <img
          src={user.avatar}
          alt="User avatar"
          className="w-10 h-10 rounded-full"
          title={user.full_name}
        />
      </div>
    </div>
  )
}
