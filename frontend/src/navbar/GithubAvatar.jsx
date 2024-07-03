import React from "react"

export default function GithubAvatar({ user }) {
  return (
    <div className="App">
      <div className="avatar">
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
