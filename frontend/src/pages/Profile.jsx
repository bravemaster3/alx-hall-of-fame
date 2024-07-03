// import React, { useState, useEffect } from "react"
// import {
//   Container,
//   Card,
//   CardContent,
//   Typography,
//   Avatar,
//   Divider,
//   Button,
//   IconButton,
// } from "@mui/material"
// import axios from "axios"
// import { useNavigate } from "react-router-dom" // Updated import
// import { backendURL } from "../../constants"
// import { Edit, Facebook, GitHub, LinkedIn, Twitter } from "@mui/icons-material"
// // import Navbar from "../components/Navbar" // Adjust import according to your file structure

// const Profile = () => {
//   const [profile, setProfile] = useState(() => {
//     const storedUser = localStorage.getItem("user")
//     if (storedUser) {
//       return JSON.parse(storedUser)
//     } else {
//       return null
//     }
//   })
//   const navigate = useNavigate() // Updated hook

//   if (!profile || !profile.is_authenticated) {
//     return <Typography variant="h6">User not authenticated</Typography>
//   }

//   return (
//     <div>
//       {/* <Navbar /> Ensure Navbar is visible first */}
//       <Container style={{ marginTop: 20 }}>
//         <Card style={{ maxWidth: 600, margin: "auto", padding: 20 }}>
//           <CardContent>
//             <div
//               style={{
//                 display: "flex",
//                 alignItems: "center",
//                 marginBottom: 20,
//               }}
//             >
//               <Avatar
//                 src={profile.avatar}
//                 alt={profile.name}
//                 style={{ width: 100, height: 100, marginRight: 20 }}
//               />
//               <div>
//                 <Typography variant="h4">{profile.name}</Typography>
//                 <Typography variant="body1" color="textSecondary">
//                   {profile.bio || "No bio available"}
//                 </Typography>
//                 {/* <Typography variant="h6" color="textSecondary">
//                   {profile.fullName}
//                 </Typography> */}
//               </div>
//             </div>
//             <IconButton
//               className="mr-auto"
//               onClick={() => navigate("/profile/edit")}
//             >
//               <Edit />
//             </IconButton>
//             <Divider />

//             <div className="mt-5 flex flex-col gap-y-2">
//               {/* <Button
//                 variant="contained"
//                 color="primary"
//                 // style={{ marginTop: 20 }}
//                 className="max-w-[200px] mr-auto"
//                 onClick={() => navigate("/profile/edit")}
//               >
//                 Edit Profile
//               </Button> */}
//               <Typography variant="body1">
//                 <strong>Github username:</strong>{" "}
//                 {profile.username || "Not provided"}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Email:</strong> {profile.email || "Not provided"}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Location:</strong> {profile.location || "Not provided"}
//               </Typography>
//               <Typography variant="body1">
//                 <strong>Cohort:</strong> {profile.cohort || "Not provided"}
//               </Typography>
//             </div>
//             <Divider style={{ margin: "20px 0" }} />
//             <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
//               <a
//                 href={`https://github.com/${profile.username}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//               >
//                 <GitHub fontSize="large" />
//               </a>

//               {profile.facebook && (
//                 <a
//                   href={profile.facebook}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Facebook fontSize="large" />
//                 </a>
//               )}
//               {profile.twitter && (
//                 <a
//                   href={profile.twitter}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Twitter fontSize="large" />
//                 </a>
//               )}
//               {profile.linkedin && (
//                 <a
//                   href={profile.linkedin}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <LinkedIn fontSize="large" />
//                 </a>
//               )}
//             </div>
//           </CardContent>
//         </Card>
//       </Container>
//     </div>
//   )
// }

// export default Profile

import React, { useEffect, useState } from "react"
import {
  Container,
  Card,
  CardContent,
  Typography,
  Avatar,
  Divider,
  IconButton,
} from "@mui/material"
import { Edit, GitHub, Facebook, Twitter, LinkedIn } from "@mui/icons-material"
import { useNavigate } from "react-router-dom"
import styled from "@emotion/styled"
import { backendURL } from "../../constants"
import axios from "axios"

const StyledCard = styled(Card)`
  position: relative;
  max-width: 600px;
  margin: auto;
  padding: 20px;
`

const EditButton = styled(IconButton)`
  position: absolute;
  top: 10px;
  right: 10px;
`

const Profile = () => {
  const [profile, setProfile] = useState(() => {
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      return JSON.parse(storedUser)
    } else {
      return null
    }
  })
  const navigate = useNavigate()

  // // Fetch profile data on component mount and when navigating back
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

  // if (!profile || !profile.is_authenticated) {
  //   return <Typography variant="h6">User not authenticated</Typography>
  // }

  return (
    <div>
      <Container style={{ marginTop: 20 }}>
        <StyledCard>
          <EditButton onClick={() => navigate("/profile/edit")}>
            <Edit />
          </EditButton>
          <CardContent>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginBottom: 20,
              }}
            >
              <Avatar
                src={profile.avatar}
                alt={profile.full_name}
                style={{ width: 100, height: 100, marginRight: 20 }}
              />
              <div>
                <Typography variant="h4">{profile.full_name}</Typography>
                <Typography variant="body1" color="textSecondary">
                  {profile.bio || "No bio available"}
                </Typography>
              </div>
            </div>
            <Divider />
            <div className="mt-5">
              <Typography variant="body1">
                <strong>Github username:</strong>{" "}
                {profile.username || "Not provided"}
              </Typography>
              <Typography variant="body1">
                <strong>Email:</strong> {profile.email || "Not provided"}
              </Typography>
              <Typography variant="body1">
                <strong>Location:</strong> {profile.location || "Not provided"}
              </Typography>
              <Typography variant="body1">
                <strong>Cohort:</strong> {profile.cohort || "Not provided"}
              </Typography>
            </div>
            <Divider style={{ margin: "20px 0" }} />
            <div style={{ display: "flex", justifyContent: "center", gap: 10 }}>
              <a
                href={`https://github.com/${profile.username}`}
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub fontSize="large" />
              </a>
              {profile.facebook && (
                <a
                  href={profile.facebook}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Facebook fontSize="large" />
                </a>
              )}
              {profile.twitter && (
                <a
                  href={profile.twitter}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Twitter fontSize="large" />
                </a>
              )}
              {profile.linkedin && (
                <a
                  href={profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <LinkedIn fontSize="large" />
                </a>
              )}
            </div>
          </CardContent>
        </StyledCard>
      </Container>
    </div>
  )
}

export default Profile
