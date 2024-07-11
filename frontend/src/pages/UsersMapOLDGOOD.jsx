// UsersMap.js
import React, { useEffect, useState } from "react"
import L from "leaflet"
import axios from "axios"
import { backendURL, fetchAllCountries } from "../../constants"
import "leaflet/dist/leaflet.css"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import UserProfile from "./UserProfile" // Adjust the import path for UserProfile component

// Fetch users with profiles
export const fetchUsersWithProfiles = async () => {
  try {
    const response = await axios.get(`${backendURL}/api/users_with_profiles`)
    return response.data
  } catch (error) {
    console.error("Error fetching users with profiles:", error)
    return []
  }
}

// Fetch a single user profile by GitHub username
const fetchUserProfile = async (githubUsername) => {
  try {
    const response = await axios.get(
      `${backendURL}/users/github/${githubUsername}`
    )
    return response.data
  } catch (error) {
    console.error("Error fetching user profile:", error)
    return null
  }
}

const UsersMap = () => {
  const [isUserProfileModalOpen, setIsUserProfileModalOpen] = useState(false)
  const [selectedUserProfile, setSelectedUserProfile] = useState(null)

  const handleOpenUserProfileModal = (userProfile) => {
    setSelectedUserProfile(userProfile)
    setIsUserProfileModalOpen(true)
  }

  const handleCloseUserProfileModal = () => {
    setSelectedUserProfile(null)
    setIsUserProfileModalOpen(false)
  }

  useEffect(() => {
    const initMap = async () => {
      const users = await fetchUsersWithProfiles()
      const countries = await fetchAllCountries()

      const filteredUsers = users.filter(
        (user) => user.country && countries[user.country]
      )

      const map = L.map("map").setView([0, 0], 2)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: "© OpenStreetMap contributors",
      }).addTo(map)

      filteredUsers.forEach((user) => {
        const countryData = countries[user.country]
        if (countryData) {
          const [lat, lng] = countryData.latlng
          const marker = L.marker([lat, lng]).addTo(map)

          marker.on("click", async () => {
            const userProfile = await fetchUserProfile(user.github_username)
            handleOpenUserProfileModal(userProfile)
          })

          // marker.bindPopup(
          //   `<b>${user.full_name}</b><br>${user.github_username}<br>${user.country}`
          // )
        }
      })
    }

    initMap()

    // Cleanup function to remove the map on component unmount
    return () => {
      const mapContainer = L.DomUtil.get("map")
      if (mapContainer) {
        mapContainer._leaflet_id = null
      }
    }
  }, [])

  return (
    <>
      <div id="map" style={{ height: "100vh", width: "100%" }} />
      <Modal
        open={isUserProfileModalOpen}
        onClose={handleCloseUserProfileModal}
      >
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
          {selectedUserProfile && (
            <UserProfile userProfile={selectedUserProfile} editable={false} />
          )}
        </Box>
      </Modal>
    </>
  )
}

export default UsersMap
