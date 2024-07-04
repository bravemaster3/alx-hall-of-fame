import React, { useEffect, useState } from "react"
import { Box, Container } from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { backendURL } from "../../constants"
import UserProfile from "./UserProfile" // Adjust the path as needed

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const storedUser = localStorage.getItem("user")
    return storedUser ? JSON.parse(storedUser) : null
  })
  const navigate = useNavigate()

  // Fetch profile data on component mount
  useEffect(() => {
    fetchProfileData()
  }, [])

  // Fetch profile data
  const fetchProfileData = async () => {
    if (profile?.username) {
      try {
        const response = await axios.get(
          `${backendURL}/users/github/${profile.username}/`
        )
        setProfile(response.data)
      } catch (error) {
        console.error("Error fetching profile data:", error)
      }
    }
  }

  // Handler for the edit button
  const handleEditClick = () => {
    navigate("/profile/edit")
  }

  useEffect(() => {
    const user = localStorage.getItem("user")
    const userObject = user ? JSON.parse(user) : null

    if (userObject && !userObject.is_authenticated) {
      navigate("/login")
    }
  }, [navigate])

  return (
    <Box
      sx={{
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: 600,
        bgcolor: "grey",
        boxShadow: 24,
        p: 2,
      }}
    >
      {/* <Container className="mt-[20px] bg-white dark:bg-dark-white"> */}
      <UserProfile userProfile={profile} onEditClick={handleEditClick} />
      {/* </Container> */}
    </Box>
  )
}

export default Profile
