// UsersMap.js
import React, { useEffect } from "react"
import L from "leaflet"
import axios from "axios"
import { backendURL, fetchAllCountries } from "../../constants"
import "leaflet/dist/leaflet.css"

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

const UsersMap = () => {
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
          L.marker([lat, lng])
            .addTo(map)
            .bindPopup(
              `<b>${user.full_name}</b><br>${user.github_username}<br>${user.country}`
            )
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

  return <div id="map" style={{ height: "100vh", width: "100%" }} />
}

export default UsersMap
