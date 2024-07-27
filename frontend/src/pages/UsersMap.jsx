import React, { useEffect, useState } from "react"
import L from "leaflet"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import "leaflet.markercluster/dist/MarkerCluster.css"
import "leaflet.markercluster/dist/MarkerCluster.Default.css"
import "leaflet/dist/leaflet.css"
import axios from "axios"
import { backendURL, fetchAllCountries } from "../../constants"
import Modal from "@mui/material/Modal"
import Box from "@mui/material/Box"
import UserProfile from "./UserProfile"
import "leaflet.markercluster"
import { Container } from "@mui/material"

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
})

L.Marker.prototype.options.icon = DefaultIcon

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

// const theme = useTheme()

// Fetch a single user profile by GitHub username
const fetchUserProfile = async (githubUsername) => {
  try {
    const response = await axios.get(
      `${backendURL}/api/users/github/${githubUsername}`
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

      const markers = L.markerClusterGroup()

      filteredUsers.forEach((user) => {
        const countryData = countries[user.country]
        if (countryData) {
          const [lat, lng] = countryData.latlng
          const marker = L.marker([lat, lng])

          marker.userProfile = user

          // Add a tooltip to the marker
          marker.bindTooltip(user.full_name || user.githubUsername, {
            direction: "top", // Tooltip will appear above the marker
          })

          marker.on("click", async () => {
            const userProfile = await fetchUserProfile(user.github_username)
            handleOpenUserProfileModal(userProfile)
          })

          markers.addLayer(marker)
        }
      })

      map.addLayer(markers)
      map.fitBounds(markers.getBounds())
    }

    const updateMapHeight = () => {
      const navbarHeight = document.getElementById("navbar").offsetHeight
      const mapElement = document.getElementById("map")
      mapElement.style.height = `calc(100vh - ${navbarHeight}px)`
    }

    initMap()
    updateMapHeight()
    window.addEventListener("resize", updateMapHeight)

    return () => {
      const mapContainer = L.DomUtil.get("map")
      if (mapContainer) {
        mapContainer._leaflet_id = null
      }
      window.removeEventListener("resize", updateMapHeight)
    }
  }, [])

  return (
    <>
      <div id="map" style={{ width: "100%" }} />
      <Modal
        open={isUserProfileModalOpen}
        onClose={handleCloseUserProfileModal}
      >
        {/* <Container
          maxWidth="xl"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: theme.spacing(4),
            borderRadius: theme.spacing(1),
            minHeight: `calc(100vh - 60px - ${
              theme.breakpoints.down("md") ? "54px" : "64px"
            })`, // Adjust height calculation
            boxSizing: "border-box",
            boxShadow: 24,
          }}
        >
          <Box
            sx={{
              border: `2px solid ${theme.palette.grey[500]}`,
            }}
            // sx={{
            //   position: "absolute",
            //   top: "50%",
            //   left: "50%",
            //   transform: "translate(-50%, -50%)",
            //   width: 600,
            //   bgcolor: "grey",
            //   boxShadow: 24,
            //   p: 2,
            //   maxWidth: "90%",
            // }}
          >
            {selectedUserProfile && (
              <UserProfile
                userProfile={selectedUserProfile}
                editable={false}
                onCloseClick={handleCloseUserProfileModal}
              />
            )}
          </Box>
        </Container> */}

        <Container
          maxWidth="xl"
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            padding: "16px", // Replacing theme.spacing(4)
            borderRadius: "8px", // Replacing theme.spacing(1)
            minHeight: `calc(100vh - 60px - 54px)`, // Simplified height calculation
            boxSizing: "border-box",
            boxShadow: "24px",
          }}
        >
          <Box
            sx={{
              border: `10px solid #9e9e9e`, // Replacing theme.palette.grey[500]
            }}
          >
            {selectedUserProfile && (
              <UserProfile
                userProfile={selectedUserProfile}
                editable={false}
                onCloseClick={handleCloseUserProfileModal}
              />
            )}
          </Box>
        </Container>
      </Modal>
    </>
  )
}

export default UsersMap
