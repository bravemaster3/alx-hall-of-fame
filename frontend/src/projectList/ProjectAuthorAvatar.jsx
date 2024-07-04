// import React, { useState, useEffect } from "react"
// import axios from "axios"

// const ProjectAuthorAvatar = ({ username, onClick }) => {
//   const [avatarUrl, setAvatarUrl] = useState("")

//   useEffect(() => {
//     const fetchAvatar = async () => {
//       try {
//         const response = await axios.get(
//           `https://api.github.com/users/${username}`
//         )
//         setAvatarUrl(response.data.avatar_url)
//       } catch (error) {
//         console.error("Error fetching GitHub avatar:", error)
//       }
//     }

//     fetchAvatar()
//   }, [username])

//   if (!avatarUrl) return null

//   return (
//     <img
//       src={avatarUrl}
//       alt={`${username}'s avatar`}
//       className="w-10 h-10 rounded-full cursor-pointer"
//       title={username}
//       onClick={onClick}
//     />
//   )
// }

// export default ProjectAuthorAvatar

import React, { useState, useEffect } from "react"
import axios from "axios"

// Simple in-memory cache for GitHub avatars
const avatarCache = {}

const ProjectAuthorAvatar = ({ username, onClick }) => {
  const [avatarUrl, setAvatarUrl] = useState("")

  useEffect(() => {
    const fetchAvatar = async () => {
      // Check cache first
      if (avatarCache[username]) {
        setAvatarUrl(avatarCache[username])
        return
      }

      try {
        const response = await axios.get(
          `https://api.github.com/users/${username}`
        )
        const fetchedAvatarUrl = response.data.avatar_url

        // Save to cache
        avatarCache[username] = fetchedAvatarUrl
        setAvatarUrl(fetchedAvatarUrl)
      } catch (error) {
        console.error("Error fetching GitHub avatar:", error)
      }
    }

    fetchAvatar()
  }, [username])

  if (!avatarUrl) return null

  return (
    <img
      src={avatarUrl}
      alt={`${username}'s avatar`}
      className="w-10 h-10 rounded-full cursor-pointer"
      title={username}
      onClick={onClick}
    />
  )
}

export default ProjectAuthorAvatar
