// import React, { useState } from "react"
// import {
//   Container,
//   TextField,
//   Button,
//   Typography,
//   Box,
//   Paper,
// } from "@mui/material"
// import { useNavigate } from "react-router-dom"
// import axios from "axios"
// import { backendURL } from "../../constants"

// const ProfileEdit = () => {
//   const [userProfile, setUserProfile] = useState(() => {
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       return JSON.parse(storedUser)
//     } else {
//       return null
//     }
//   })

//   const [formData, setFormData] = useState({
//     username: userProfile?.username || "",
//     full_name: userProfile?.name || "",
//     email: userProfile?.email || "",
//     location: userProfile?.location || "",
//     cohort: userProfile?.cohort || "",
//   })

//   const navigate = useNavigate() // Updated hook

//   if (!userProfile || !userProfile.is_authenticated) {
//     return <Typography variant="h6">User not authenticated</Typography>
//   }

//   const handleInputChange = (e) => {
//     const { name, value } = e.target
//     setFormData({ ...formData, [name]: value })
//   }

//   const handleSubmit = async (e) => {
//     e.preventDefault()
//     console.log(formData)
//     try {
//       await axios.put(`${backendURL}/users/update/`, formData, {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${userProfile.token}`,
//         },
//       })
//       navigate("/profile")
//     } catch (error) {
//       console.error("Error updating profile:", error)
//     }
//   }

//   return (
//     <Container component="main" maxWidth="sm">
//       <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           Edit Profile
//         </Typography>
//         <Box component="form" onSubmit={handleSubmit} noValidate>
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="fullName"
//             label="Full Name"
//             name="full_name"
//             value={formData.full_name}
//             onChange={handleInputChange}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="email"
//             label="Email"
//             name="email"
//             value={formData.email}
//             onChange={handleInputChange}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="location"
//             label="Location"
//             name="location"
//             value={formData.location}
//             onChange={handleInputChange}
//           />
//           <TextField
//             variant="outlined"
//             margin="normal"
//             required
//             fullWidth
//             id="cohort"
//             label="Cohort"
//             name="cohort"
//             value={formData.cohort}
//             onChange={handleInputChange}
//           />
//           <Button
//             type="submit"
//             fullWidth
//             variant="contained"
//             color="primary"
//             style={{ marginTop: 20 }}
//           >
//             Save
//           </Button>
//         </Box>
//       </Paper>
//     </Container>
//   )
// }

// export default ProfileEdit

import React, { useState } from "react"
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Paper,
} from "@mui/material"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { backendURL } from "../../constants"

const ProfileEdit = () => {
  const [userProfile, setUserProfile] = useState(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      return JSON.parse(storedUser)
    } else {
      return null
    }
  })

  const [formData, setFormData] = useState({
    username: userProfile?.username || "",
    full_name: userProfile?.full_name || "",
    email: userProfile?.email || "",
    location: userProfile?.location || "",
    cohort: userProfile?.cohort || "",
    bio: userProfile?.bio || "",
    facebook: userProfile?.facebook || null,
    twitter: userProfile?.twitter || null,
    linkedin: userProfile?.linkedin || null,
  })

  const navigate = useNavigate()

  if (!userProfile || !userProfile.is_authenticated) {
    return <Typography variant="h6">User not authenticated</Typography>
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData({ ...formData, [name]: value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    console.log(formData)
    try {
      await axios.put(`${backendURL}/users/update/`, formData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userProfile.token}`,
        },
      })
      navigate("/profile")
    } catch (error) {
      console.error("Error updating profile:", error)
    }
  }

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} style={{ padding: 20, marginTop: 20 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Update profile information
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
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
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="location"
            label="Location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="cohort"
            label="Cohort"
            name="cohort"
            value={formData.cohort}
            onChange={handleInputChange}
          />
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
