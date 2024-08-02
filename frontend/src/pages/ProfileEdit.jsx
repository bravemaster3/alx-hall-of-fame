import React, { useEffect, useState } from "react"
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { allCohorts, backendURL, fetchAllCountries } from "../../constants"

const ProfileEdit = () => {
  const [userProfile, setUserProfile] = useState(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      return JSON.parse(storedUser)
    } else {
      return null
    }
  })

  const [countries, setCountries] = useState([])
  const [formData, setFormData] = useState({
    username: userProfile?.username || "",
    full_name: userProfile?.full_name || "",
    email: userProfile?.email || "",
    location: userProfile?.location || "",
    cohort: userProfile?.cohort || "",
    bio: userProfile?.bio || "",
    facebook: userProfile?.facebook || "",
    twitter: userProfile?.twitter || "",
    linkedin: userProfile?.linkedin || "",
    // avatar: userProfile?.avatar || "",
  })

  const navigate = useNavigate()

  if (!userProfile || !userProfile?.is_authenticated) {
    return <Typography variant="h6">User not authenticated</Typography>
  }

  useEffect(() => {
    const fetchCountries = async () => {
      const countriesList = await fetchAllCountries()
      setCountries(Object.keys(countriesList))
    }

    fetchCountries()
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Submit the form data to the API
      const response = await axios.put(
        `${backendURL}/api/users/update/`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userProfile.token}`,
          },
        }
      )

      // Get the updated user profile from the response
      const updatedUserProfile = response.data

      // console.log("UPDATED USER", updatedUserProfile)

      // Update the state with the new user profile
      setUserProfile((prevProfile) => {
        // Get the current user profile from localStorage
        const storedUserProfile = JSON.parse(localStorage.getItem("user")) || {}

        // Merge the stored user profile with the updated profile
        const mergedProfile = {
          ...storedUserProfile, // existing profile data
          ...updatedUserProfile, // updated profile data from the API
        }

        // Update local storage with the merged profile
        localStorage.setItem("user", JSON.stringify(mergedProfile))
        // console.log("UPDATED USER: ", mergedProfile)

        return mergedProfile
      })

      // Redirect to the profile page
      navigate("/profile")
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  const textClassName =
    "text-gray-300 dark:text-dark-gray-300 border-solid border-gray-100 dark:border-dark-gray-300"

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        style={{ backgroundColor: "rgba(240, 240, 240, 0.7)" }}
        className="mt-1 p-5 "
      >
        <Typography variant="h4" align="center" gutterBottom>
          Update profile information
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className="flex flex-col gap-1"
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="full_name"
            label="Full Name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          <FormControl
            variant="outlined"
            margin="normal"
            required
            fullWidth
            className={textClassName}
          >
            <InputLabel htmlFor="country">Country</InputLabel>
            <Select
              labelId="country-label"
              id="country"
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              label="Country"
            >
              {countries.map((country) => (
                <MenuItem key={country} value={country}>
                  {country}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <FormControl variant="outlined" margin="normal" required fullWidth>
            <InputLabel htmlFor="cohort">Cohort</InputLabel>
            <Select
              labelId="cohort-label"
              id="cohort"
              name="cohort"
              value={formData.cohort}
              onChange={handleInputChange}
              label="Cohort"
            >
              {Object.entries(allCohorts).map(([key, value]) => (
                <MenuItem key={key} value={key}>
                  {value}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="bio"
            label="Bio"
            name="bio"
            multiline
            rows={3}
            value={formData.bio}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="facebook"
            label="Facebook URL"
            name="facebook"
            value={formData.facebook || ""}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="twitter"
            label="Twitter URL"
            name="twitter"
            value={formData.twitter || ""}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="linkedin"
            label="LinkedIn URL"
            name="linkedin"
            value={formData.linkedin || ""}
            onChange={handleInputChange}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: 20 }}
          >
            Save
          </Button>
        </Box>
      </Paper>
    </Container>
  )
}

export default ProfileEdit
